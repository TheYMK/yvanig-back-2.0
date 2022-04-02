import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
      throw new BadRequestException('Flight not found');
    }

    try {
      const newSeat = this.repo.create(seat);

      newSeat.flight = flight;

      return this.repo.save(newSeat);
    } catch (err) {
      console.log(err);
      throw new BadRequestException('Failed to create a new seat');
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
    const seats = await this.repo.find({
      relations: ['flight'],
    });

    console.log(seats);

    if (!seats) {
      throw new NotFoundException('Seats not found');
    }

    return seats;
  }

  async update(id: number, attrs: Partial<Seat>) {
    const foundSeat = await this.findOne(id);

    if (!foundSeat) {
      throw new NotFoundException('Seat not found');
    }

    Object.assign(foundSeat, attrs);

    try {
      return this.repo.save(foundSeat);
    } catch (err) {
      console.log(err);
      throw new BadRequestException('Failed to update the seat');
    }
  }

  async delete(id: number) {
    const seat = await this.findOne(id);

    if (!seat) {
      throw new NotFoundException('Seat not found');
    }

    try {
      return this.repo.remove(seat);
    } catch (err) {
      console.log(err);
      throw new BadRequestException('Failed to delete the seat');
    }
  }
}
