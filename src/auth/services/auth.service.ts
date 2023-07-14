import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UtilsService } from '../../shared/services';
import { jwtConstants } from '../constants';
import { LoginDTO, RegisterDTO } from '../dto';
import { JwtPayload, Tokens } from '../types';
import { UsersService } from './../../users/services';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly utilsService: UtilsService,
  ) {}

  async register(dto: RegisterDTO): Promise<Tokens> {
    if (
      !this.usersService.comparePassword(
        dto.password,
        dto.password_confirmation,
      )
    ) {
      throw new HttpException('Passwords do not match', HttpStatus.BAD_REQUEST);
    }

    const userExists = await this.usersService.findByEmail(dto.email);

    if (userExists) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    const hash = await this.utilsService.generateHash(dto.password);

    const user: any = await this.usersService
      .create({
        ...dto,
        password: hash,
      })
      .catch((err) => {
        throw new HttpException(err, HttpStatus.BAD_REQUEST);
      });

    const tokens = await this.getTokens(user._id, user.email, user.role);
    await this.updateRtHash(user._id, tokens.refresh_token);

    return tokens;
  }

  async login(dto: LoginDTO): Promise<Tokens> {
    const user: any = await this.usersService.findByEmail(dto.email);

    if (!user)
      throw new HttpException('Access Denied', HttpStatus.UNAUTHORIZED);

    const passwordMatches = await this.utilsService.compareHash(
      dto.password,
      user.password,
    );

    if (!passwordMatches)
      throw new HttpException('Access Denied', HttpStatus.UNAUTHORIZED);

    const tokens = await this.getTokens(user.id, user.email, user.role);
    await this.updateRtHash(user.id, tokens.refresh_token);

    return tokens;
  }

  async logout(userId: string): Promise<boolean> {
    await this.usersService.update(userId, { refreshToken: null }).catch(() => {
      throw new UnauthorizedException();
    });

    return true;
  }

  async refreshTokens(userId: string, rt: string): Promise<Tokens> {
    const user: any = await this.usersService.findById(userId);
    if (!user?.refreshToken)
      throw new HttpException('Access Denied', HttpStatus.UNAUTHORIZED);

    const rtMatches = await this.utilsService.compareHash(
      rt,
      user.refreshToken,
    );
    if (!rtMatches)
      throw new HttpException('Access Denied', HttpStatus.UNAUTHORIZED);

    const tokens = await this.getTokens(user.id, user.email, user.role);
    await this.updateRtHash(user.id, tokens.refresh_token);

    return tokens;
  }

  private async updateRtHash(userId: string, rt: string): Promise<void> {
    const hash = await this.utilsService.generateHash(rt);
    await this.usersService.update(userId, { refreshToken: hash });
  }

  private async getTokens(
    userId: number,
    email: string,
    role: string,
  ): Promise<Tokens> {
    const jwtPayload: JwtPayload = {
      sub: userId,
      email,
      role,
    };

    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: jwtConstants.secret,
        expiresIn: '15m',
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: jwtConstants.secret,
        expiresIn: '7d',
      }),
    ]);

    return {
      access_token: at,
      refresh_token: rt,
    };
  }
}
