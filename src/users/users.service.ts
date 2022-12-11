import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { User, UserRole } from './user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  async create(user: CreateUserDto) {
    try {
      const newUser = this.repo.create(user);
      const createdUser = await this.repo.save(newUser);

      return createdUser;
    } catch (err) {
      throw new BadRequestException('Failed to create a new user');
    }
  }

  async findOne(id: number) {
    const user = await this.repo.findOne(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async find(email: string) {
    const users = await this.repo.find({ email });

    if (!users) {
      throw new NotFoundException('Users not found');
    }

    return users;
  }

  async update(user: User, attrs: Partial<User>) {
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (attrs.email && user.email !== attrs.email) {
      user.is_email_verified = false;
    }

    Object.assign(user, attrs);

    try {
      const updatedUser = await this.repo.save(user);
      return updatedUser;
    } catch (err) {
      throw new BadRequestException('Failed to update user');
    }
  }

  async remove(id: number) {
    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const removedUser = await this.repo.remove(user);

    return removedUser;
  }

  async getStats() {
    let stats = {
      total: 0,
      total_admin: 0,
      total_customer: 0,
      total_verified: 0,
      total_unverified: 0,
    };

    try {
      const users = await this.repo.find();

      stats.total = users.length;

      users.forEach((user) => {
        user.is_email_verified && (stats.total_verified += 1);
        !user.is_email_verified && (stats.total_unverified += 1);
        user.role === UserRole.ADMIN && (stats.total_admin += 1);
        user.role === UserRole.CUSTOMER && (stats.total_customer += 1);
      });

      return stats;
    } catch (err) {
      throw new BadRequestException('Failed to get users stats');
    }
  }
}
