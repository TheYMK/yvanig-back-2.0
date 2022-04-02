import { Module } from '@nestjs/common';
import { SeatsService } from './seats.service';
import { SeatsController } from './seats.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Seat } from './seat.entity';
import { FlightsModule } from 'src/flights/flights.module';

@Module({
  imports: [TypeOrmModule.forFeature([Seat]), FlightsModule],
  providers: [SeatsService],
  controllers: [SeatsController],
})
export class SeatsModule {}
