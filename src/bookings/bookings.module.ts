import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FlightsModule } from 'src/flights/flights.module';
import { PassengersModule } from 'src/passengers/passengers.module';
import { SeatsModule } from 'src/seats/seats.module';
import { Booking } from './booking.entity';
import { BookingsController } from './bookings.controller';
import { BookingsService } from './bookings.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Booking]),
    PassengersModule,
    FlightsModule,
    SeatsModule,
  ],
  controllers: [BookingsController],
  providers: [BookingsService],
  exports: [BookingsService],
})
export class BookingsModule {}
