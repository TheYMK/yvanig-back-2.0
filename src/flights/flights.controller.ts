import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
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
@Controller('api/flights')
export class FlightsController {
  constructor(private flightsService: FlightsService) {}

  // Creates a new flight and returns the created flight only for admin user
  @Post()
  @UseGuards(AdminGuard)
  @ApiCreatedResponse({
    description: 'The flight was created successfully',
  })
  @ApiBadRequestResponse({
    description: 'Failed to create the flight',
  })
  async createFlight(@Body() body: CreateFlightDto) {
    return this.flightsService.create(body);
  }

  // Update flight and returns the updated flight only for admin user
  @Patch('/:id')
  @UseGuards(AdminGuard)
  @HttpCode(200)
  @ApiOkResponse({
    description: 'The flight was updated successfully',
  })
  @ApiNotFoundResponse({
    description: 'Flight not found',
  })
  @ApiBadRequestResponse({
    description: 'Failed to update the flight',
  })
  async updateFlight(@Param('id') id: string, @Body() body: UpdateFlightDto) {
    return this.flightsService.update(body, parseInt(id));
  }

  // Returns all flights
  @Get()
  @ApiOkResponse({
    description: 'The flights were found successfully',
  })
  @ApiBadRequestResponse({
    description: 'Failed to find the flights',
  })
  async getFlights(@Query() query: GetFlightsDto) {
    return this.flightsService.findAll(query);
  }

  // Returns a flight by id
  @Get('/:id')
  @ApiOkResponse({
    description: 'The flight was found successfully',
  })
  @ApiNotFoundResponse({
    description: 'Flight not found',
  })
  @ApiBadRequestResponse({
    description: 'Failed to find the flight',
  })
  async getFlight(@Param('id') id: string) {
    return this.flightsService.findOne(parseInt(id));
  }

  // Deletes a flight by id
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
  async deleteFlight(@Param('id') id: string) {
    return this.flightsService.delete(parseInt(id));
  }
}
