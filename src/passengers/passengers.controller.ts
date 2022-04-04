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
import { AuthGuard } from 'src/guards/auth.guard';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { User } from 'src/users/user.entity';
import { CreatePassengerDto } from './dtos/create-passenger.dto';
import { PassengerDto } from './dtos/passenger.dto';
import { UpdatePassengerDto } from './dtos/update-passenger.dto';
import { PassengersService } from './passengers.service';

@ApiTags('passengers')
@Serialize(PassengerDto)
@Controller('api/passengers')
export class PassengersController {
  constructor(private passengersService: PassengersService) {}

  // Create a new passenger
  @Post()
  @UseGuards(AuthGuard)
  @ApiCreatedResponse({
    description: 'The passenger was created successfully',
  })
  @ApiBadRequestResponse({
    description: 'Failed to create a new passenger',
  })
  @ApiInternalServerErrorResponse({
    description: 'Something went wrong while creating a new passenger',
  })
  async createPassenger(
    @Body() body: CreatePassengerDto,
    @CurrentUser() user: User,
  ) {
    return this.passengersService
      .create(body, user)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        switch (err.response?.statusCode) {
          case 400:
            throw new BadRequestException('Failed to create a new passenger');
          default:
            throw new InternalServerErrorException(
              'Something went wrong while creating a new passenger',
            );
        }
      });
  }

  // Returns all passengers
  @Get()
  @UseGuards(AuthGuard)
  @ApiOkResponse({
    description: 'The passengers were returned successfully',
  })
  @ApiBadRequestResponse({
    description: 'Failed to get the passengers',
  })
  @ApiInternalServerErrorResponse({
    description: 'Something went wrong while getting passengers',
  })
  async getPassengers() {
    return this.passengersService
      .findAll()
      .then((res) => {
        return res;
      })
      .catch((err) => {
        switch (err.response?.statusCode) {
          case 400:
            throw new BadRequestException('Failed to get the passengers');
          default:
            throw new InternalServerErrorException(
              'Something went wrong while getting passengers',
            );
        }
      });
  }

  // Returns a passenger by id
  @Get(':id')
  @UseGuards(AuthGuard)
  @ApiOkResponse({
    description: 'The passenger was returned successfully',
  })
  @ApiNotFoundResponse({
    description: 'Passenger not found',
  })
  @ApiInternalServerErrorResponse({
    description: 'Something went wrong while getting the passenger',
  })
  async getPassenger(@Param('id', ParseIntPipe) id: number) {
    return this.passengersService
      .findOne(id)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        switch (err.response?.statusCode) {
          case 404:
            throw new NotFoundException('Passenger not found');
          default:
            throw new InternalServerErrorException(
              'Something went wrong while getting the passenger',
            );
        }
      });
  }

  // Update a passenger if the user is the owner
  @Patch(':id')
  @UseGuards(AuthGuard)
  @ApiOkResponse({
    description: 'The passenger was updated successfully',
  })
  @ApiBadRequestResponse({
    description: 'Failed to update the passenger',
  })
  @ApiNotFoundResponse({
    description: 'Passenger not found',
  })
  @ApiUnauthorizedResponse({
    description: 'You are not allowed to update this passenger',
  })
  @ApiInternalServerErrorResponse({
    description: 'Something went wrong while updating the passenger',
  })
  async updatePassenger(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdatePassengerDto,
    @CurrentUser() user: User,
  ) {
    return this.passengersService
      .update(id, body, user)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        switch (err.response?.statusCode) {
          case 404:
            throw new NotFoundException('Passenger not found');
          case 401:
            throw new UnauthorizedException(
              'You are not allowed to update this passenger',
            );
          case 400:
            throw new BadRequestException('Failed to update the passenger');
          default:
            throw new InternalServerErrorException(
              'Something went wrong while updating the passenger',
            );
        }
      });
  }

  // Delete a passenger
  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiOkResponse({
    description: 'The passenger was deleted successfully',
  })
  @ApiBadRequestResponse({
    description: 'Failed to delete the passenger',
  })
  @ApiNotFoundResponse({
    description: 'Passenger not found',
  })
  @ApiUnauthorizedResponse({
    description: 'You are not allowed to delete this passenger',
  })
  @ApiInternalServerErrorResponse({
    description: 'Something went wrong while deleting the passenger',
  })
  async deletePassenger(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: User,
  ) {
    return this.passengersService
      .delete(id, user)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        switch (err.response?.statusCode) {
          case 404:
            throw new NotFoundException('Passenger not found');
          case 401:
            throw new UnauthorizedException(
              'You are not allowed to delete this passenger',
            );
          case 400:
            throw new BadRequestException('Failed to delete the passenger');
          default:
            console.log(err);
            throw new InternalServerErrorException(
              'Something went wrong while deleting the passenger',
            );
        }
      });
  }
}
