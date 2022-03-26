import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Session,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { CreateUserDto } from './dtos/create-user.dto';
import { SendEmailDto } from './dtos/send-email.dto';
import { UserDto } from './dtos/user.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Serialize(UserDto)
@Controller('api/auth')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Post('/send-email-verification')
  @HttpCode(200)
  async sendEmailVerification(@Body() body: SendEmailDto) {
    return this.authService.sendEmailVerification(body.email);
  }

  @Post('/register')
  async register(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.register(body);
    session.userId = user.id;
    console.log(session);
    return user;
  }

  @Get('whoami')
  @UseGuards(AuthGuard)
  whoAmI(@CurrentUser() user: User) {
    console.log(user);
    return user;
  }

  @Post('/signout')
  @HttpCode(200)
  signOut(@Session() session: any) {
    session.userId = null;
  }
}
