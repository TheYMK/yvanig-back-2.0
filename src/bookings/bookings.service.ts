import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { Flight } from 'src/flights/flight.entity';
import { FlightsService } from 'src/flights/flights.service';
import { Passenger } from 'src/passengers/passenger.entity';
import { PassengersService } from 'src/passengers/passengers.service';
import { ClassTypes, Seat } from 'src/seats/seat.entity';
import { User, UserRole } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { Booking, BookingStatuses } from './booking.entity';
import { CreateBookingDto } from './dtos/create-booking.dto';
import { GetBookingsDto } from './dtos/get-bookings.dto';
import { UpdateBookingDto } from './dtos/update-booking.dto';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking) private repo: Repository<Booking>,
    private passengersService: PassengersService,
    private flightsService: FlightsService,
    private eventEmitter: EventEmitter2,
  ) {}

  async create(booking: CreateBookingDto, user: User) {
    // Find the flight
    const foundFlight = await this.flightsService.findOne(booking.flightId);
    // Find the seat thats is available
    const foundSeat = foundFlight.seats.find(
      (seat) => seat.id === booking.seatId && seat.is_available === true,
    );

    if (!foundSeat) {
      throw new NotFoundException('Seat not found or not available');
    }

    // Find a passenger if it exists. If not create one
    let passenger: Passenger;
    const foundPassengers = await this.passengersService.findByUser(user);
    if (foundPassengers.length === 0) {
      passenger = await this.passengersService.create(
        {
          document_type: booking.document_type,
          document_number: booking.document_number,
          date_of_birth: booking.date_of_birth,
          gender: booking.gender,
        },
        user,
      );
    } else {
      passenger = foundPassengers[0];
    }

    // Generate a price
    let price = this.generatePrice(foundSeat, foundFlight);

    try {
      // Create the booking
      const newBooking = this.repo.create({
        booking_type: booking.booking_type,
        price,
      });

      newBooking.flight = foundFlight;
      newBooking.seat = foundSeat;
      newBooking.passenger = passenger;

      const createdBooking = await this.repo.save(newBooking);

      // Emit an event to update the seat availability
      this.eventEmitter.emit('booking.created', {
        id: foundSeat.id,
        is_available: false,
      });
      return createdBooking;
    } catch (err) {
      this.eventEmitter.emit('booking.failed', {
        id: foundSeat.id,
        is_available: true,
      });
      throw new BadRequestException('Failed to create a new booking');
    }
  }

  async findAll(options: Partial<GetBookingsDto>) {
    const page = parseInt(options.page) || 0;
    const limit = parseInt(options.limit) || 10;
    try {
      const bookings = await this.repo.find({
        skip: page * limit,
        take: limit,
        order: { created_at: 'DESC' },
        relations: ['flight', 'seat', 'passenger'],
      });
      const totalCount = (await this.repo.find()).length;

      return { bookings, total_count: totalCount };
    } catch (err) {
      throw new BadRequestException('Failed to get the bookings');
    }
  }

  // Find a booking by id
  async findOne(id: number, user: User) {
    const booking = await this.repo.findOne(id, {
      relations: ['flight', 'seat', 'passenger'],
    });

    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    // find passenger
    const passenger = await this.passengersService.findOne(
      booking.passenger.id,
    );

    if (passenger.user.id !== user.id && user.role !== UserRole.ADMIN) {
      throw new UnauthorizedException(
        'You are not allowed to view this booking',
      );
    }

    return booking;
  }

  async update(id: number, attrs: Partial<UpdateBookingDto>, user: User) {
    const foundBooking = await this.findOne(id, user);
    // old seat
    const oldSeat = foundBooking.seat;

    if (attrs.flightId) {
      if (!attrs.seatId) {
        throw new BadRequestException('A new seat id is required');
      }
      const foundFlight = await this.flightsService.findOne(attrs.flightId);
      const foundSeat = foundFlight.seats.find(
        (seat) => seat.id === attrs.seatId && seat.is_available === true,
      );
      if (!foundSeat) {
        throw new NotFoundException('Seat not found or not available');
      }
      // Generate a price
      let price = this.generatePrice(foundSeat, foundFlight);

      foundBooking.price = price;
      foundBooking.flight = foundFlight;
      foundBooking.seat = foundSeat;
    }

    if (attrs.seatId && !attrs.flightId) {
      // Find the flight
      const foundFlight = await this.flightsService.findOne(
        foundBooking.flight.id,
      );

      const foundSeat = foundFlight.seats.find(
        (seat) => seat.id === attrs.seatId && seat.is_available === true,
      );
      if (!foundSeat) {
        throw new NotFoundException('Seat not found or not available');
      }

      // Generate a price
      let price = this.generatePrice(foundSeat, foundFlight);

      foundBooking.price = price;
      foundBooking.seat = foundSeat;
    }

    Object.assign(foundBooking, attrs);

    try {
      const updatedBooking = await this.repo.save(foundBooking);
      this.eventEmitter.emit('booking.updated', {
        id: foundBooking.seat.id,
        is_available: false,
      });

      if (attrs.seatId) {
        setTimeout(() => {
          this.eventEmitter.emit('booking.updated', {
            id: oldSeat.id,
            is_available: true,
          });
        }, 10000);
      }

      return updatedBooking;
    } catch (err) {
      this.eventEmitter.emit('booking.failed', {
        id: foundBooking.seat.id,
        is_available: true,
      });
      this.eventEmitter.emit('booking.updated', {
        id: oldSeat.id,
        is_available: false,
      });
      throw new BadRequestException('Failed to update the booking');
    }
  }

  async updateBookingStatus(id: number, status: BookingStatuses, user: User) {
    const foundBooking = await this.findOne(id, user);

    foundBooking.status = status;

    try {
      const updatedBooking = await this.repo.save(foundBooking);

      if (status === BookingStatuses.CONFIRMED) {
        this.eventEmitter.emit('booking.confirmed', {
          id: foundBooking.seat.id,
          is_available: false,
        });
      }

      if (status === BookingStatuses.CANCELLED) {
        console.log('[cancelled]', status);

        this.eventEmitter.emit('booking.cancelled', {
          id: foundBooking.seat.id,
          is_available: true,
        });
      }

      return updatedBooking;
    } catch (err) {
      throw new BadRequestException('Failed to update booking status');
    }
  }

  async delete(id: number, user: User) {
    const foundBooking = await this.findOne(id, user);

    try {
      const removedBooking = await this.repo.remove(foundBooking);

      this.eventEmitter.emit('booking.deleted', {
        id: foundBooking.seat.id,
        is_available: true,
      });

      return removedBooking;
    } catch (err) {
      this.eventEmitter.emit('booking.failed', {
        id: foundBooking.seat.id,
        is_available: false,
      });
      throw new BadRequestException('Failed to delete the booking');
    }
  }

  generatePrice(seat: Seat, flight: Flight) {
    if (seat.class_type === ClassTypes.FIRST) {
      return flight.seat_price_first_class;
    } else if (seat.class_type === ClassTypes.BUSINESS) {
      return flight.seat_price_business_class;
    } else {
      return flight.seat_base_price;
    }
  }

  async getStats() {
    let stats = {
      total: 0,
      total_confirmed: 0,
      total_cancelled: 0,
      total_pending: 0,
    };

    try {
      const bookings = await this.repo.find();

      stats.total = bookings.length;
      bookings.forEach((booking) => {
        booking.status === BookingStatuses.CONFIRMED &&
          (stats.total_confirmed += 1);

        booking.status === BookingStatuses.CANCELLED &&
          (stats.total_cancelled += 1);

        booking.status === BookingStatuses.PENDING &&
          (stats.total_pending += 1);
      });

      return stats;
    } catch (err) {
      throw new BadRequestException('Failed to get bookings stats');
    }
  }
}
