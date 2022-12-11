import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
} from 'class-validator';

export enum ClassTypes {
  FIRST = 'first',
  BUSINESS = 'business',
  ECONOMY = 'economy',
}

export class CreateSeatDto {
  @ApiProperty({
    type: String,
    description: 'the seat number',
    default: '1A',
  })
  @IsString()
  @Length(1, 20)
  @IsNotEmpty()
  seat_number: string;

  @ApiProperty({
    type: Boolean,
    description: 'the availability of the seat',
    default: true,
  })
  @IsBoolean()
  @IsNotEmpty()
  is_available: boolean;

  @ApiProperty({
    type: String,
    description: 'the class type of the seat',
    enum: ClassTypes,
    default: 'economy',
  })
  @IsString()
  @IsNotEmpty()
  @IsEnum(ClassTypes)
  class_type: ClassTypes;

  @ApiProperty({
    type: Number,
    description: 'the flight id',
  })
  @IsNotEmpty()
  @IsNumber()
  flightId: number;
}
