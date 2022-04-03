import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export enum ClassTypes {
  FIRST = 'first',
  BUSINESS = 'business',
  ECONOMY = 'economy',
}

export class UpdateSeatDto {
  @ApiProperty({
    type: String,
    description: 'the seat number',
    default: '1A',
  })
  @IsString()
  @Length(1, 20)
  @IsNotEmpty()
  @IsOptional()
  seat_number: string;

  @ApiProperty({
    type: Boolean,
    description: 'the availability of the seat',
    default: true,
  })
  @IsBoolean()
  @IsNotEmpty()
  @IsOptional()
  is_available: boolean;

  @ApiProperty({
    type: String,
    description: 'the class type of the seat',
    enum: ['first', 'business', 'economy'],
    default: 'economy',
  })
  @IsString()
  @IsNotEmpty()
  @IsEnum(['first', 'business', 'economy'])
  @IsOptional()
  class_type: ClassTypes;
}
