import { Expose, Transform } from 'class-transformer';
import { BookingTypes } from '../booking.entity';

export class BookingBisDto {
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

  @Transform(({ obj }) => {
    obj.bookings.forEach((booking) => {
      return booking.flight.id;
    });
  })
  @Expose()
  flightId: number;

  @Transform(({ obj }) => {
    obj.bookings.forEach((booking) => {
      return booking.seat.id;
    });
  })
  @Expose()
  seatId: number;

  @Transform(({ obj }) => {
    obj.bookings.forEach((booking) => {
      return booking.passenger.id;
    });
  })
  @Expose()
  passengerId: number;
}
