import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class SendMessageDto {
  @ApiProperty({
    type: String,
    description: 'the name of the sender',
    default: 'John Doe',
  })
  @IsString()
  @Length(1, 200)
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    type: String,
    description: 'the email of the sender',
    default: 'johndoe@xxxx.xx',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    type: String,
    description: 'the subject of the message',
    default: 'Lorem ipsum',
  })
  @IsString()
  @Length(1, 200)
  @IsNotEmpty()
  subject: string;

  @ApiProperty({
    type: String,
    description: 'the content of the message',
    default: 'Lorem ipsum',
  })
  @IsString()
  @Length(50, 400)
  @IsNotEmpty()
  message: string;
}
