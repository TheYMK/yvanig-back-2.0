import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { DocumentTypes, Genders } from '../../passengers/passenger.entity';
import { BookingTypes } from '../booking.entity';

export class UpdateBookingDto {
  // Everything needed to create a booking
  @ApiProperty({
    type: String,
    description: 'flight | hotel | restaurant',
    enum: BookingTypes,
  })
  @IsString()
  @IsNotEmpty()
  @IsEnum(BookingTypes)
  @IsOptional()
  booking_type: BookingTypes;

  @ApiProperty({
    type: Number,
    description: 'the id of the flight',
  })
  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  flightId: number;

  @ApiProperty({
    type: Number,
    description: 'the id of the seat',
  })
  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  seatId: number;
}
