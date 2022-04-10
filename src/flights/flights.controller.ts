import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  InternalServerErrorException,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
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
import { AdminGuard } from '../guards/admin.guard';
import { CreateFlightDto } from './dtos/create-flight.dto';
import { GetFlightsDto } from './dtos/get-flights.dto';
import { UpdateFlightDto } from './dtos/update-flight.dto';
import { FlightsService } from './flights.service';

@ApiTags('flights')
@Controller({
  path: 'api/flights',
  version: '1',
})
export class FlightsController {
  constructor(private flightsService: FlightsService) {}

  // LAST TIME REVIEWED: 2022-04-09
  @Post()
  @UseGuards(AdminGuard)
  @ApiCreatedResponse({
    description: 'The flight was created successfully',
  })
  @ApiBadRequestResponse({
    description: 'Failed to create a new flight',
  })
  @ApiInternalServerErrorResponse({
    description: 'Something went wrong while creating a new flight',
  })
  async createFlight(@Body() body: CreateFlightDto) {
    return this.flightsService
      .create(body)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        switch (err.response?.statusCode) {
          case 400:
            throw new BadRequestException('Failed to create a new flight');
          default:
            throw new InternalServerErrorException(
              'Something went wrong while creating a new flight',
            );
        }
      });
  }

  // LAST TIME REVIEWED: 2022-04-09
  @Patch('/:id')
  @UseGuards(AdminGuard)
  @ApiOkResponse({
    description: 'The flight was updated successfully',
  })
  @ApiNotFoundResponse({
    description: 'Flight not found',
  })
  @ApiBadRequestResponse({
    description: 'Failed to update the flight',
  })
  @ApiInternalServerErrorResponse({
    description: 'Something went wrong while updating the flight',
  })
  async updateFlight(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateFlightDto,
  ) {
    return this.flightsService
      .update(body, id)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        switch (err.response?.statusCode) {
          case 400:
            throw new BadRequestException('Failed to update the flight');
          case 404:
            throw new NotFoundException('Flight not found');
          default:
            throw new InternalServerErrorException(
              'Something went wrong while updating the flight',
            );
        }
      });
  }

  // LAST TIME REVIEWED: 2022-04-09
  @Get()
  @ApiOkResponse({
    description: 'The flights were found successfully',
  })
  @ApiBadRequestResponse({
    description: 'Failed to find the flights',
  })
  @ApiInternalServerErrorResponse({
    description: 'Something went wrong while finding the flights',
  })
  async getFlights(@Query() query: GetFlightsDto) {
    return this.flightsService
      .findAll(query)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        switch (err.response?.statusCode) {
          case 400:
            throw new BadRequestException('Failed to find the flights');
          default:
            throw new InternalServerErrorException(
              'Something went wrong while finding the flights',
            );
        }
      });
  }

  // LAST TIME REVIEWED: 2022-04-09
  @Get('/:id')
  @ApiOkResponse({
    description: 'The flight was found successfully',
  })
  @ApiNotFoundResponse({
    description: 'Flight not found',
  })
  @ApiInternalServerErrorResponse({
    description: 'Something went wrong while finding the flight',
  })
  async getFlight(@Param('id', ParseIntPipe) id: number) {
    return this.flightsService
      .findOne(id)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        switch (err.response?.statusCode) {
          case 404:
            throw new NotFoundException('Flight not found');
          default:
            throw new InternalServerErrorException(
              'Something went wrong while finding the flight',
            );
        }
      });
  }

  // LAST TIME REVIEWED: 2022-04-09
  @Delete('/:id')
  @UseGuards(AdminGuard)
  @HttpCode(200)
  @ApiOkResponse({
    description: 'The flight was deleted successfully',
  })
  @ApiNotFoundResponse({
    description: 'Flight not found',
  })
  @ApiBadRequestResponse({
    description: 'Failed to delete the flight',
  })
  @ApiInternalServerErrorResponse({
    description: 'Something went wrong while deleting the flight',
  })
  async deleteFlight(@Param('id', ParseIntPipe) id: number) {
    return this.flightsService
      .delete(id)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        switch (err.response?.statusCode) {
          case 404:
            throw new NotFoundException('Flight not found');
          case 400:
            throw new BadRequestException('Failed to delete the flight');
          default:
            throw new InternalServerErrorException(
              'Something went wrong while deleting the flight',
            );
        }
      });
  }
}
