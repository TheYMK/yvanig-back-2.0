import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDecimal,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
} from 'class-validator';

export class CreateFlightDto {
  @ApiProperty({
    type: String,
    description: 'the name of the airline',
    default: 'AB Aviation',
  })
  @IsString()
  @Length(0, 200)
  @IsNotEmpty()
  airline: string;

  @ApiProperty({
    type: String,
    description: 'the flight identification number',
    default: 'AB123',
  })
  @IsString()
  @Length(0, 200)
  @IsNotEmpty()
  flight_number: string;

  @ApiProperty({
    type: Number,
    description: 'the maximum number of seats available',
    default: 20,
  })
  @IsNumber()
  @IsNotEmpty()
  capacity: number;

  @ApiProperty({
    type: String,
    description: 'the country of origin of the flight',
    default: 'Comoros',
  })
  @IsString()
  @Length(0, 200)
  @IsNotEmpty()
  origin: string;

  @ApiProperty({
    type: String,
    description: 'the country of destination of the flight',
    default: 'Tanzania',
  })
  @IsString()
  @Length(0, 200)
  @IsNotEmpty()
  destination: string;

  @ApiProperty({
    type: String,
    description: 'the name of the airport of origin',
    default: 'Prince Said Ibrahim International Airport',
  })
  @IsString()
  @Length(0, 200)
  @IsNotEmpty()
  origin_airport_name: string;

  @ApiProperty({
    type: String,
    description: 'the name of the airport of destination',
    default: 'Julius Nyerere International Airport',
  })
  @IsString()
  @Length(0, 200)
  @IsNotEmpty()
  destination_airport_name: string;

  @ApiProperty({
    type: String,
    description: 'the time of departure',
    default: '06:00 AM',
  })
  @IsString()
  @IsNotEmpty()
  departure_time: string;

  @ApiProperty({
    type: String,
    description: 'the time of arrival',
    default: '10:00 PM',
  })
  @IsString()
  @IsNotEmpty()
  arrival_time: string;

  @ApiProperty({
    type: String,
    description: 'the date of departure',
    default: '2020-01-01T00:00:00.000Z',
  })
  @IsString()
  @IsNotEmpty()
  departure_date: string;

  @ApiProperty({
    type: String,
    description: 'the date of arrival',
    default: '2020-01-01T00:00:00.000Z',
  })
  @IsString()
  @IsNotEmpty()
  arrival_date: string;

  @ApiProperty({
    type: Boolean,
    description: 'whether the flight is refundable',
    default: false,
  })
  @IsBoolean()
  @IsNotEmpty()
  refundable: boolean;

  @ApiProperty({
    type: String,
    description: 'the url of the company logo',
    default:
      'https://www.abaviation.com/wp-content/uploads/2019/12/AB-Aviation-Logo.png',
  })
  @IsString()
  @IsNotEmpty()
  company_logo: string;

  @ApiProperty({
    type: String,
    description: 'the description of the flight',
    default: 'A flight from Comoros to Tanzania',
  })
  @IsString()
  @Length(0, 1000)
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    type: Number,
    description: 'the base price of the flight',
    default: '1000.00',
  })
  @IsDecimal()
  @IsNotEmpty()
  seat_base_price: number;

  @ApiProperty({
    type: Number,
    description: 'the price of the flight for business class',
    default: '2000.00',
  })
  @IsDecimal()
  @IsNotEmpty()
  seat_price_business_class: number;

  @ApiProperty({
    type: Number,
    description: 'the price of the flight for first class',
    default: '3000.00',
  })
  @IsDecimal()
  @IsNotEmpty()
  seat_price_first_class: number;
}
