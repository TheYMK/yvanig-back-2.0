import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class EmailVerificationDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
