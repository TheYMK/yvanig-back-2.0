import { Expose, Transform } from 'class-transformer';
import { ClassTypes } from '../seat.entity';

export class SeatDto {
  @Expose()
  id: number;

  @Expose()
  seat_number: string;

  @Expose()
  is_available: boolean;

  @Expose()
  class_type: ClassTypes;

  @Transform(({ obj }) => obj.flight.id)
  @Expose()
  flightId: number;
}
