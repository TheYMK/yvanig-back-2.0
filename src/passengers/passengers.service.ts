import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserRole } from '../users/user.entity';
import { Repository } from 'typeorm';
import { CreatePassengerDto } from './dtos/create-passenger.dto';
import { Passenger } from './passenger.entity';

@Injectable()
export class PassengersService {
  constructor(
    @InjectRepository(Passenger) private repo: Repository<Passenger>,
  ) {}

  async create(passenger: CreatePassengerDto, user: User) {
    try {
      const newPassenger = this.repo.create(passenger);
      newPassenger.user = user;
      const createdPassenger = await this.repo.save(newPassenger);
      return createdPassenger;
    } catch (err) {
      throw new BadRequestException('Failed to create a new passenger');
    }
  }

  async findAll() {
    try {
      const passengers = await this.repo.find({
        relations: ['user', 'bookings'],
      });

      return passengers;
    } catch (err) {
      throw new BadRequestException('Failed to get the passengers');
    }
  }

  async findByUser(user: User) {
    try {
      const passengers = await this.repo.find({
        where: { user: user },
        relations: ['user', 'bookings'],
      });

      return passengers;
    } catch (err) {
      throw new BadRequestException('Failed to get the passenger');
    }
  }

  async findOne(id: number) {
    const passenger = await this.repo.findOne(id, {
      relations: ['user', 'bookings'],
    });

    if (!passenger) {
      throw new NotFoundException('Passenger not found');
    }

    return passenger;
  }

  async update(id: number, attrs: Partial<Passenger>, user: User) {
    // Check if the passenger exists
    const foundPassenger = await this.findOne(id);

    // Check if the user is linked to the passenger or is an admin
    if (foundPassenger.user.id !== user.id && user.role !== UserRole.ADMIN) {
      throw new UnauthorizedException(
        'You are not allowed to update this passenger',
      );
    }

    // Update the passenger
    Object.assign(foundPassenger, attrs);

    try {
      const updatedPassenger = await this.repo.save(foundPassenger);

      return updatedPassenger;
    } catch (err) {
      throw new BadRequestException('Failed to update the passenger');
    }
  }

  async delete(id: number, user: User) {
    // Check if the passenger exists

    const foundPassenger = await this.findOne(id);

    // Check if the user is linked to the passenger or is an admin
    if (foundPassenger.user.id !== user.id && user.role !== UserRole.ADMIN) {
      throw new UnauthorizedException(
        'You are not allowed to delete this passenger',
      );
    }

    try {
      const removedPassenger = await this.repo.remove(foundPassenger);
      console.log(removedPassenger);
    } catch (err) {
      throw new BadRequestException('Failed to delete the passenger');
    }
  }
}
