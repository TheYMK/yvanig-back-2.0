import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFlightDto } from './dtos/create-flight.dto';
import { GetFlightsDto } from './dtos/get-flights.dto';
import { Flight, FlightStatuses } from './flight.entity';

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

  async getStats() {
    let stats = {
      total: 0,
      total_scheduled: 0,
      total_delayed: 0,
      total_in_air: 0,
      total_expected: 0,
      total_diverted: 0,
      total_recovery: 0,
      total_landed: 0,
      total_arrived: 0,
      total_cancelled: 0,
      total_no_takeoff_info: 0,
      total_past_flight: 0,
    };

    let flights: Flight[];

    try {
      flights = await this.repo.find();
      stats = {
        ...stats,
        total: flights.length,
      };

      flights.forEach((flight) => {
        [FlightStatuses.SCHEDULED].includes(flight.status) &&
          (stats.total_scheduled = stats.total_scheduled + 1);

        [FlightStatuses.DELAYED].includes(flight.status) &&
          (stats.total_delayed = stats.total_delayed + 1);

        [FlightStatuses.IN_AIR].includes(flight.status) &&
          (stats.total_in_air = stats.total_in_air + 1);

        [FlightStatuses.EXPECTED].includes(flight.status) &&
          (stats.total_expected = stats.total_expected + 1);

        [FlightStatuses.DIVERTED].includes(flight.status) &&
          (stats.total_diverted = stats.total_diverted + 1);

        [FlightStatuses.RECOVERY].includes(flight.status) &&
          (stats.total_recovery = stats.total_recovery + 1);

        [FlightStatuses.LANDED].includes(flight.status) &&
          (stats.total_landed = stats.total_landed + 1);

        [FlightStatuses.ARRIVED].includes(flight.status) &&
          (stats.total_arrived = stats.total_arrived + 1);

        [FlightStatuses.CANCELLED].includes(flight.status) &&
          (stats.total_cancelled = stats.total_cancelled + 1);

        [FlightStatuses.NO_TAKEOFF_INFO].includes(flight.status) &&
          (stats.total_no_takeoff_info = stats.total_no_takeoff_info + 1);

        [FlightStatuses.PAST_FLIGHT].includes(flight.status) &&
          (stats.total_past_flight = stats.total_past_flight + 1);
      });

      return stats;
    } catch (err) {
      throw new BadRequestException('Failed to get flights stats');
    }
  }
}
