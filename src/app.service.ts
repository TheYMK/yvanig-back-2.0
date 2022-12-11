import { Injectable } from '@nestjs/common';
import { BookingsService } from './bookings/bookings.service';
import { FlightsService } from './flights/flights.service';
import { UsersService } from './users/users.service';

@Injectable()
export class AppService {
  constructor(
    private flightsService: FlightsService,
    private usersService: UsersService,
    private bookingsService: BookingsService,
  ) {}

  getWelcomeMessage(): { message: string } {
    return {
      message: 'Welcome to the YVANIG Tour API V1',
    };
  }

  async getStats() {
    const flightsStats = await this.flightsService.getStats();
    const usersStats = await this.usersService.getStats();
    const bookingsStats = await this.bookingsService.getStats();

    return { flightsStats, usersStats, bookingsStats };
  }
}
