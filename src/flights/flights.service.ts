import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFlightDto } from './dtos/create-flight.dto';
import { GetFlightsDto } from './dtos/get-flights.dto';
import { UpdateFlightDto } from './dtos/update-flight.dto';
import { Flight } from './flight.entity';

@Injectable()
export class FlightsService {
  constructor(@InjectRepository(Flight) private repo: Repository<Flight>) {}

  async create(flight: CreateFlightDto) {
    try {
      const newFlight = this.repo.create(flight);
      return this.repo.save(newFlight);
    } catch (err) {
      console.log(err);
      throw new BadRequestException('Failed to create a new flight');
    }
  }

  async update(attrs: Partial<Flight>, id: number) {
    const foundFlight = await this.findOne(id);

    if (!foundFlight) {
      throw new NotFoundException('flight not found');
    }

    Object.assign(foundFlight, attrs);

    try {
      return this.repo.save(foundFlight);
    } catch (err) {
      console.log(err);
      throw new BadRequestException('Failed to update the flight');
    }
  }

  async findOne(id: number) {
    const flight = await this.repo.findOne(id);

    if (!flight) {
      throw new NotFoundException('flight not found');
    }

    return flight;
  }

  async findAll(options: Partial<GetFlightsDto>) {
    const page = parseInt(options.page) || 0;
    const limit = parseInt(options.limit) || 10;

    const flights = await this.repo.find({ skip: page * limit, take: limit });
    const totalCount = await (await this.repo.find()).length;

    if (!flights || !totalCount) {
      throw new NotFoundException('flights not found');
    }

    return {
      flights,
      total_count: totalCount,
    };
  }

  async delete(id: number) {
    const flight = await this.findOne(id);

    if (!flight) {
      throw new NotFoundException('flight not found');
    }

    try {
      return this.repo.remove(flight);
    } catch (err) {
      console.log(err);
      throw new BadRequestException('Failed to delete the flight');
    }
  }
}
