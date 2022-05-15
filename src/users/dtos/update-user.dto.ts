import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({
    type: String,
    description: 'the first name of the user',
    default: 'John',
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  first_name: string;

  @ApiProperty({
    type: String,
    description: 'the last name of the user',
    default: 'Doe',
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  last_name: string;

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
}
