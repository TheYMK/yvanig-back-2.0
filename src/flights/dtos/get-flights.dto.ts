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
    default: '',
    required: false,
  })
  @IsOptional()
  @IsString()
  filterByOrigin: string;

  @ApiProperty({
    default: '',
    required: false,
  })
  @IsOptional()
  @IsString()
  filterByDestination: string;

  @ApiProperty({
    default: '',
    required: false,
  })
  @IsOptional()
  @IsString()
  filterByDepartureDate: string;

  @ApiProperty({
    default: 10,
    required: false,
  })
  @IsString()
  @IsOptional()
  limit: string;
}
