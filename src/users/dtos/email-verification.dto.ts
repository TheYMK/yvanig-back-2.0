import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class EmailVerificationDto {
  @ApiProperty({
    type: String,
    description: 'the email of the user',
    default: 'johndoe@email.com',
  })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    type: Boolean,
    description: 'the action type',
    default: true,
  })
  @IsBoolean()
  isRegistration: boolean;
}
