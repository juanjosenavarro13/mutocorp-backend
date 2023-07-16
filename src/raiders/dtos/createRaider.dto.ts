import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateRaiderDto {
  @ApiProperty({ example: 'pepito' })
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty({ example: '123456', required: false, default: 0 })
  @IsString()
  @IsOptional()
  readonly hikoins: string;

  @ApiProperty({ example: '64b2b0bdaee38c32378b7ca5' })
  @IsNotEmpty()
  @IsString()
  readonly user: string;
}
