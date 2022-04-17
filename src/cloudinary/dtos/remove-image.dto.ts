import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RemoveImageDto {
  @ApiProperty({
    type: String,
    description: 'The public id of the image to remove',
    default: '',
  })
  @IsString()
  @IsNotEmpty()
  public_id: string;
}
