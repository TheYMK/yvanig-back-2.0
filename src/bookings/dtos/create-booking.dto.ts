import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
} from 'class-validator';
import { DocumentTypes, Genders } from '../../passengers/passenger.entity';
import { BookingTypes, PaymentMethods } from '../booking.entity';

export class CreateBookingDto {
  // Everything needed to create a passenger
  @ApiProperty({
    type: String,
    description: 'the type of documented used to identify the passenger',
    enum: DocumentTypes,
    default: DocumentTypes.PASSPORT,
  })
  @IsString()
  @IsNotEmpty()
  @IsEnum(DocumentTypes)
  document_type: DocumentTypes;

  @ApiProperty({
    type: String,
    description: 'the number of the document',
    default: '123456789',
  })
  @IsString()
  @IsNotEmpty()
  @Length(1, 200)
  document_number: string;

  @ApiProperty({
    type: String,
    description: 'the phone number of the user',
    default: '+33650578840',
  })
  @IsString()
  @IsNotEmpty()
  @Length(1, 200)
  phone_number: string;

  @ApiProperty({
    type: String,
    description: 'the date of birth of the passenger',
    default: '1990-01-01',
  })
  @IsString()
  @IsNotEmpty()
  date_of_birth: string;

  @ApiProperty({
    type: String,
    description: 'the gender of the passenger',
    enum: Genders,
  })
  @IsString()
  @IsNotEmpty()
  @IsEnum(Genders)
  gender: Genders;

  // Everything needed to create a booking
  @ApiProperty({
    type: String,
    description: 'flight | hotel | restaurant',
    enum: BookingTypes,
  })
  @IsString()
  @IsNotEmpty()
  @IsEnum(BookingTypes)
  booking_type: BookingTypes;

  @ApiProperty({
    type: String,
    description: 'bank_card | moneygram | western_union | paypal',
    enum: PaymentMethods,
  })
  @IsString()
  @IsNotEmpty()
  @IsEnum(PaymentMethods)
  payment_method: PaymentMethods;

  @ApiProperty({
    type: Number,
    description: 'the id of the flight',
  })
  @IsNumber()
  @IsNotEmpty()
  flightId: number;

  @ApiProperty({
    type: Number,
    description: 'the id of the seat',
  })
  @IsNumber()
  @IsNotEmpty()
  seatId: number;
}
