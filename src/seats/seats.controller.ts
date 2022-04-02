import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
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
@Controller('api/seats')
export class SeatsController {
  constructor(private seatsService: SeatsService) {}

  // Creates a new seat and returns the created seat only for admin user
  @Post()
  @UseGuards(AdminGuard)
  @ApiCreatedResponse({
    description: 'The seat was created successfully',
  })
  @ApiBadRequestResponse({
    description: 'Failed to create the seat',
  })
  async createSeat(@Body() body: CreateSeatDto) {
    return this.seatsService.create(body);
  }

  // Returns all seats
  @Get()
  @ApiOkResponse({
    description: 'The seats were found successfully',
  })
  @ApiNotFoundResponse({
    description: 'Seat not found',
  })
  async getSeats() {
    return this.seatsService.findAll();
  }

  // Returns a single seat
  @Get('/:id')
  @ApiOkResponse({
    description: 'The seat was found successfully',
  })
  @ApiNotFoundResponse({
    description: 'Seat not found',
  })
  async getSeat(@Param('id') id: string) {
    return this.seatsService.findOne(parseInt(id));
  }

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
  async updateSeat(@Param('id') id: string, @Body() body: UpdateSeatDto) {
    return this.seatsService.update(parseInt(id), body);
  }

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
  async deleteSeat(@Param('id') id: string) {
    return this.seatsService.delete(parseInt(id));
  }
}
