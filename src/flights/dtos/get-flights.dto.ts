import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class GetFlightsDto {
  @ApiProperty({
    default: 0,
    required: false,
  })
  @IsString()
  @IsOptional()
  page: string;

  @ApiProperty({
    default: 10,
    required: false,
  })
  @IsString()
  @IsOptional()
  limit: string;
}
