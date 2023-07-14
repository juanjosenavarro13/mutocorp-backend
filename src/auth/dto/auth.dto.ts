import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDTO {
  @ApiProperty({ example: 'email@email.es' })
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @ApiProperty({ example: '123456' })
  @IsNotEmpty()
  @IsString()
  readonly password: string;
}

export class RegisterDTO {
  @ApiProperty({ example: 'John Doe' })
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty({ example: 'john@doe.es' })
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @ApiProperty({ example: '123456' })
  @IsNotEmpty()
  @IsString()
  readonly password: string;

  @ApiProperty({ example: '123456' })
  @IsNotEmpty()
  @IsString()
  readonly password_confirmation: string;
}
