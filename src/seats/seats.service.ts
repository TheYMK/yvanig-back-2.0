import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { BookingEvent } from 'src/bookings/interfaces/BookingCreatedEvent';
import { FlightsService } from 'src/flights/flights.service';
import { Repository } from 'typeorm';
import { CreateSeatDto } from './dtos/create-seat.dto';
import { Seat } from './seat.entity';

@Injectable()
export class SeatsService {
  constructor(
    @InjectRepository(Seat) private repo: Repository<Seat>,
    private flightsService: FlightsService,
  ) {}

  async create(seat: CreateSeatDto) {
    // Check if the flight exists
    const flight = await this.flightsService.findOne(seat.flightId);

    if (!flight) {
      throw new NotFoundException('Flight not found');
    }

    try {
      const newSeat = this.repo.create(seat);
      newSeat.flight = flight;
      const createdSeat = await this.repo.save(newSeat);

      return createdSeat;
    } catch (err) {
      throw new BadRequestException('Failed to create the seat');
    }
  }

  async findOne(id: number) {
    const seat = await this.repo.findOne(id, {
      relations: ['flight'],
    });

    if (!seat) {
      throw new NotFoundException('Seat not found');
    }

    return seat;
  }

  async findAll() {
    try {
      const seats = await this.repo.find({
        relations: ['flight'],
      });
      return seats;
    } catch (err) {
      throw new BadRequestException('Failed to get the seats');
    }
  }

  async update(id: number, attrs: Partial<Seat>) {
    const foundSeat = await this.findOne(id);

    if (!foundSeat) {
      throw new NotFoundException('Seat not found');
    }
    Object.assign(foundSeat, attrs);

    try {
      const updatedSeat = await this.repo.save(foundSeat);

      return updatedSeat;
    } catch (err) {
      throw new BadRequestException('Failed to update the seat');
    }
  }

  async delete(id: number) {
    const seat = await this.findOne(id);

    if (!seat) {
      throw new NotFoundException('Seat not found');
    }

    try {
      const removedSeat = await this.repo.remove(seat);

      return removedSeat;
    } catch (err) {
      throw new BadRequestException('Failed to delete the seat');
    }
  }

  // handle events related to bookings
  @OnEvent('booking.*', { async: true })
  async handleBookingEvents(payload: BookingEvent) {
    console.log('[handleBookingEvent]', payload);

    return this.update(payload.id, { is_available: payload.is_available });
  }
}
