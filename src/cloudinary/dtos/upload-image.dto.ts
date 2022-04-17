import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UploadImageDto {
  @ApiProperty({
    type: String,
    description: 'The image to upload',
    default: '',
  })
  @IsString()
  @IsNotEmpty()
  image: string;
}
