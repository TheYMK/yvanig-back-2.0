import { ApiProperty } from '@nestjs/swagger';
import { IsJWT, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    type: String,
    description: 'the first name of the user',
    default: 'John',
  })
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @ApiProperty({
    type: String,
    description: 'the last name of the user',
    default: 'Doe',
  })
  @IsString()
  @IsNotEmpty()
  last_name: string;

  @ApiProperty({
    type: String,
    description: 'the password of the user',
    default: '123456',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({
    type: String,
    description: 'the valid jwt token which includes the email of the user',
    default:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InlpbWthYm9zc0BnbWFpbC5jb20iLCJpYXQiOjE2NDgzMTIwMTQsImV4cCI6MTY0ODMxNTYxNH0.slrCrnE_1WKyrM5-IBu3gxnbymX5X_CzQwviNolBWeI',
  })
  @IsNotEmpty()
  @IsJWT()
  token: string;
}
