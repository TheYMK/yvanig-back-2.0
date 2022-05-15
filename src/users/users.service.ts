import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from './user.entity';

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
}
