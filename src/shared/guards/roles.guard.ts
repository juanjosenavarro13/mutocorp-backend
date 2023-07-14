import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Role } from '../../users/types';

@Injectable()
export class RolesGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const { role } = context.switchToHttp().getRequest().user;

    if (role !== Role.ADMIN) {
      throw new HttpException('Access Denied', HttpStatus.UNAUTHORIZED);
    }

    return true;
  }
}
