import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class EmailVerificationDto {
  @ApiProperty({
    type: String,
    description: 'the email of the user',
    default: 'johndoe@email.com',
  })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @IsOptional()
  email: string;

  @ApiProperty({
    type: Boolean,
    description: 'the action type',
    default: true,
  })
  @IsBoolean()
  @IsOptional()
  isRegistration: boolean;
}
