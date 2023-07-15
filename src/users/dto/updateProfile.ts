import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UpdateProfileDTO {
  @ApiProperty({ example: 'email@email.es' })
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @ApiProperty({ example: 'pepito' })
  @IsNotEmpty()
  @IsString()
  readonly name: string;
}
