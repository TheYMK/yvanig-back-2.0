import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFlightDto } from './dtos/create-flight.dto';
import { GetFlightsDto } from './dtos/get-flights.dto';
import { Flight } from './flight.entity';

@Injectable()
export class FlightsService {
  constructor(@InjectRepository(Flight) private repo: Repository<Flight>) {}

  async create(flight: CreateFlightDto) {
    try {
      const newFlight = this.repo.create(flight);
      const createdFlight = await this.repo.save(newFlight);

      return createdFlight;
    } catch (err) {
      throw new BadRequestException('Failed to create a new flight');
    }
  }

  async update(attrs: Partial<Flight>, id: number) {
    const foundFlight = await this.findOne(id);

    if (!foundFlight) {
      throw new NotFoundException('Flight not found');
    }

    Object.assign(foundFlight, attrs);

    try {
      const updatedFlight = await this.repo.save(foundFlight);
      return updatedFlight;
    } catch (err) {
      throw new BadRequestException('Failed to update the flight');
    }
  }

  async findOne(id: number) {
    const flight = await this.repo.findOne(id, {
      relations: ['seats'],
    });

    if (!flight) {
      throw new NotFoundException('Flight not found');
    }

    return flight;
  }

  async findAll(options: Partial<GetFlightsDto>) {
    const page = parseInt(options.page) || 0;
    const limit = parseInt(options.limit) || 10;
    try {
      const flights = await this.repo.find({
        skip: page * limit,
        take: limit,
        order: { created_at: 'DESC' },
      });
      const totalCount = await (await this.repo.find()).length;

      return {
        flights,
        total_count: totalCount,
      };
    } catch (err) {
      throw new BadRequestException('Failed to get the flights');
    }
  }

  async delete(id: number) {
    const flight = await this.findOne(id);

    if (!flight) {
      throw new NotFoundException('flight not found');
    }

    try {
      const removedFlight = await this.repo.remove(flight);
      return removedFlight;
    } catch (err) {
      throw new BadRequestException('Failed to delete the flight');
    }
  }
}
