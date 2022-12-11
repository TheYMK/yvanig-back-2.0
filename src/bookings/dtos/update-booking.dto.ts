import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import {
  BookingStatuses,
  BookingTypes,
  PaymentMethods,
} from '../booking.entity';

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
    description: 'bank_card | moneygram | western_union | paypal',
    enum: PaymentMethods,
  })
  @IsString()
  @IsNotEmpty()
  @IsEnum(PaymentMethods)
  @IsOptional()
  payment_method: PaymentMethods;

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
