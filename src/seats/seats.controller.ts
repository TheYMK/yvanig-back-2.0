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
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AdminGuard } from 'src/guards/admin.guard';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { CreateSeatDto } from './dtos/create-seat.dto';
import { SeatDto } from './dtos/seat.dto';
import { UpdateSeatDto } from './dtos/update-seat.dto';
import { SeatsService } from './seats.service';

@ApiTags('seats')
@Serialize(SeatDto)
@Controller({
  path: 'api/seats',
  version: '1',
})
export class SeatsController {
  constructor(private seatsService: SeatsService) {}

  // LAST TIME REVIEWED: 2022-04-10
  // Creates a new seat and returns the created seat only for admin user
  @Post()
  @UseGuards(AdminGuard)
  @ApiCreatedResponse({
    description: 'The seat was created successfully',
  })
  @ApiBadRequestResponse({
    description: 'Failed to create the seat',
  })
  @ApiNotFoundResponse({
    description: 'Flight not found',
  })
  @ApiInternalServerErrorResponse({
    description: 'Something went wrong while creating a new seat',
  })
  async createSeat(@Body() body: CreateSeatDto) {
    return this.seatsService
      .create(body)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        switch (err.response?.statusCode) {
          case 400:
            throw new BadRequestException('Failed to create the seat');
          case 404:
            throw new NotFoundException('Flight not found');
          default:
            throw new InternalServerErrorException(
              'Something went wrong while creating a new seat',
            );
        }
      });
  }

  // LAST TIME REVIEWED: 2022-04-10
  // Returns all seats
  @Get()
  @ApiOkResponse({
    description: 'The seats were found successfully',
  })
  @ApiBadRequestResponse({
    description: 'Failed to get the seats',
  })
  @ApiInternalServerErrorResponse({
    description: 'Something went wrong while getting the seats',
  })
  async getSeats() {
    return this.seatsService
      .findAll()
      .then((res) => {
        return res;
      })
      .catch((err) => {
        switch (err.response?.statusCode) {
          case 400:
            throw new BadRequestException('Failed to get the seats');
          default:
            throw new InternalServerErrorException(
              'Something went wrong while getting the seats',
            );
        }
      });
  }

  // LAST TIME REVIEWED: 2022-04-10
  // Returns a single seat
  @Get('/:id')
  @ApiOkResponse({
    description: 'The seat was found successfully',
  })
  @ApiNotFoundResponse({
    description: 'Seat not found',
  })
  @ApiInternalServerErrorResponse({
    description: 'Something went wrong while getting the seat',
  })
  async getSeat(@Param('id', ParseIntPipe) id: number) {
    return this.seatsService
      .findOne(id)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        switch (err.response?.statusCode) {
          case 404:
            throw new NotFoundException('Seat not found');
          default:
            throw new InternalServerErrorException(
              'Something went wrong while getting the seat',
            );
        }
      });
  }

  // LAST TIME REVIEWED: 2022-04-10
  // Updates a single seat and returns the updated seat only for admin user
  @Patch('/:id')
  @UseGuards(AdminGuard)
  @ApiOkResponse({
    description: 'The seat was updated successfully',
  })
  @ApiNotFoundResponse({
    description: 'Seat not found',
  })
  @ApiBadRequestResponse({
    description: 'Failed to update the seat',
  })
  @ApiInternalServerErrorResponse({
    description: 'Something went wrong while updating the seat',
  })
  async updateSeat(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateSeatDto,
  ) {
    return this.seatsService
      .update(id, body)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        switch (err.response?.statusCode) {
          case 404:
            throw new NotFoundException('Seat not found');
          case 400:
            throw new BadRequestException('Failed to update the seat');
          default:
            throw new InternalServerErrorException(
              'Something went wrong while updating the seat',
            );
        }
      });
  }

  // LAST TIME REVIEWED: 2022-04-10
  // Deletes a single seat and returns the deleted seat only for admin user
  @Delete('/:id')
  @UseGuards(AdminGuard)
  @ApiOkResponse({
    description: 'The seat was deleted successfully',
  })
  @ApiNotFoundResponse({
    description: 'Seat not found',
  })
  @ApiBadRequestResponse({
    description: 'Failed to delete the seat',
  })
  @ApiInternalServerErrorResponse({
    description: 'Something went wrong while deleting the seat',
  })
  async deleteSeat(@Param('id', ParseIntPipe) id: number) {
    return this.seatsService
      .delete(id)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        switch (err.response?.statusCode) {
          case 404:
            throw new NotFoundException('Seat not found');
          case 400:
            throw new BadRequestException('Failed to delete the seat');
          default:
            throw new InternalServerErrorException(
              'Something went wrong while deleting the seat',
            );
        }
      });
  }
}
