import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { BookingStatuses, BookingTypes } from '../booking.entity';

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
    type: String,
    description: 'completed | pending | cancelled',
    enum: BookingStatuses,
  })
  @IsString()
  @IsNotEmpty()
  @IsEnum(BookingStatuses)
  @IsOptional()
  status: BookingStatuses;

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
