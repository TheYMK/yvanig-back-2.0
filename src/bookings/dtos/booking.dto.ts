import { Expose, Transform } from 'class-transformer';
import { BookingTypes } from '../booking.entity';

export class BookingDto {
  @Expose()
  id: number;

  @Expose()
  booking_type: BookingTypes;

  @Expose()
  price: number;

  @Expose()
  created_at: Date;

  @Expose()
  updated_at: Date;

  @Transform(({ obj }) => obj.flight.id)
  @Expose()
  flightId: number;

  @Transform(({ obj }) => obj.seat.id)
  @Expose()
  seatId: number;

  @Transform(({ obj }) => obj.passenger.id)
  @Expose()
  passengerId: number;
}
