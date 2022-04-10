import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AdminGuard } from 'src/guards/admin.guard';
import { AuthGuard } from 'src/guards/auth.guard';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { User } from 'src/users/user.entity';
import { BookingsService } from './bookings.service';
import { BookingDto } from './dtos/booking.dto';
import { CreateBookingDto } from './dtos/create-booking.dto';
import { GetBookingsDto } from './dtos/get-bookings.dto';
import { UpdateBookingDto } from './dtos/update-booking.dto';

// LAST TIME REVIEWED: 2022-04-10
@ApiTags('bookings')
@Controller({
  path: 'api/bookings',
  version: '1',
})
export class BookingsController {
  constructor(private bookingsService: BookingsService) {}

  // Creates a new booking
  @Post()
  @Serialize(BookingDto)
  @UseGuards(AuthGuard)
  @ApiCreatedResponse({
    description: 'The booking was created successfully',
  })
  @ApiBadRequestResponse({
    description:
      'Failed to create a new booking | Failed to get the passenger | Failed to create a new passenger | Failed to update the seat',
  })
  @ApiNotFoundResponse({
    description:
      'Flight not found | Seat not found or not available | Seat not found',
  })
  @ApiInternalServerErrorResponse({
    description: 'Something went wrong while creating a new booking',
  })
  async createBooking(
    @Body() body: CreateBookingDto,
    @CurrentUser() user: User,
  ) {
    return this.bookingsService
      .create(body, user)
      .then(async (res) => {
        return res;
      })
      .catch(async (err) => {
        switch (err.response?.statusCode) {
          case 404:
            if (err.response?.message === 'Flight not found') {
              throw new NotFoundException('Flight not found');
            } else if (
              err.response?.message === 'Seat not found or not available' ||
              err.response?.message === 'Seat not found'
            ) {
              throw new NotFoundException('Seat not found or not available');
            }
          case 400:
            if (err.response?.message === 'Failed to get the passengers') {
              throw new BadRequestException('Failed to get the passenger');
            } else if (
              err.response?.message === 'Failed to create a new passenger'
            ) {
              throw new BadRequestException('Failed to create a new passenger');
            } else if (
              err.response?.message === 'Failed to create a new booking'
            ) {
              throw new BadRequestException('Failed to create a new booking');
            } else if (err.response?.message === 'Failed to update the seat') {
              throw new BadRequestException('Failed to update the seat');
            }
          default:
            throw new InternalServerErrorException(
              'Something went wrong while creating a new booking',
            );
        }
      });
  }

  // LAST TIME REVIEWED: 2022-04-10
  // Returns all bookings
  @Get()
  @UseGuards(AdminGuard)
  @ApiOkResponse({
    description: 'The bookings were found successfully',
  })
  @ApiBadRequestResponse({
    description: 'Failed to get the bookings',
  })
  @ApiInternalServerErrorResponse({
    description: 'Something went wrong while getting the bookings',
  })
  async getAllBookings(@Query() query: GetBookingsDto) {
    return this.bookingsService
      .findAll(query)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        switch (err.response?.statusCode) {
          case 400:
            throw new BadRequestException('Failed to get the bookings');
          default:
            throw new InternalServerErrorException(
              'Something went wrong while getting the bookings',
            );
        }
      });
  }

  // LAST TIME REVIEWED: 2022-04-10
  // Returns a booking
  @Get('/:id')
  @Serialize(BookingDto)
  @UseGuards(AuthGuard)
  @ApiOkResponse({
    description: 'The booking was found successfully',
  })
  @ApiBadRequestResponse({
    description: 'Failed to get the passenger',
  })
  @ApiNotFoundResponse({
    description: 'Booking not found | Passenger not found',
  })
  @ApiUnauthorizedResponse({
    description: 'You are not allowed to view this booking',
  })
  @ApiInternalServerErrorResponse({
    description: 'Something went wrong while getting the booking',
  })
  async getBooking(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: User,
  ) {
    return this.bookingsService
      .findOne(id, user)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        switch (err.response?.statusCode) {
          case 400:
            throw new BadRequestException('Failed to get the passenger');
          case 404:
            if (err.response?.message === 'Booking not found') {
              throw new NotFoundException('Booking not found');
            } else if (err.response?.message === 'Passenger not found') {
              throw new NotFoundException('Passenger not found');
            }
          case 401:
            throw new UnauthorizedException(
              'You are not allowed to view this booking',
            );
          default:
            throw new InternalServerErrorException(
              'Something went wrong while getting the booking',
            );
        }
      });
  }

  // LAST TIME REVIEWED: 2022-04-10
  // Update a booking if the user is the owner
  @Patch('/:id')
  @Serialize(BookingDto)
  @UseGuards(AuthGuard)
  @ApiOkResponse({
    description: 'The booking was updated successfully',
  })
  @ApiBadRequestResponse({
    description: 'Failed to update the booking | A new seat id is required',
  })
  @ApiNotFoundResponse({
    description:
      'Booking not found | Passenger not found | Seat not found or not available| Flight not found',
  })
  @ApiUnauthorizedResponse({
    description: 'You are not allowed to update this booking',
  })
  @ApiInternalServerErrorResponse({
    description: 'Something went wrong while updating the booking',
  })
  async updateBooking(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateBookingDto,
    @CurrentUser() user: User,
  ) {
    return this.bookingsService
      .update(id, body, user)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        switch (err.response?.statusCode) {
          case 400:
            if (err.response?.message === 'Failed to update the booking') {
              throw new BadRequestException('Failed to update the booking');
            } else if (err.response?.message === 'A new seat id is required') {
              throw new NotFoundException('A new seat id is required');
            }
          case 404:
            if (err.response?.message === 'Booking not found') {
              throw new NotFoundException('Booking not found');
            } else if (err.response?.message === 'Passenger not found') {
              throw new NotFoundException('Passenger not found');
            } else if (
              err.response?.message === 'Seat not found or not available'
            ) {
              throw new NotFoundException('Seat not found or not available');
            } else if (err.response?.message === 'Flight not found') {
              throw new NotFoundException('Flight not found');
            }
          case 401:
            throw new UnauthorizedException(
              'You are not allowed to update this booking',
            );
          default:
            throw new InternalServerErrorException(
              'Something went wrong while updating the booking',
            );
        }
      });
  }

  // LAST TIME REVIEWED: 2022-04-10
  // Delete a booking if the user is the owner
  @Delete('/:id')
  @UseGuards(AuthGuard)
  async deleteBooking(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: User,
  ) {
    return this.bookingsService
      .delete(id, user)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        switch (err.response?.statusCode) {
          case 400:
            throw new BadRequestException('Failed to delete the booking');
          case 404:
            if (err.response?.message === 'Booking not found') {
              throw new NotFoundException('Booking not found');
            } else if (err.response?.message === 'Passenger not found') {
              throw new NotFoundException('Passenger not found');
            }
          case 401:
            throw new UnauthorizedException(
              'You are not allowed to delete this booking',
            );
          default:
            throw new InternalServerErrorException(
              'Something went wrong while deleting the booking',
            );
        }
      });
  }
}
