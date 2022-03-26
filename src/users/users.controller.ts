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
import { EmailVerificationDto } from './dtos/email-verification.dto';
import { PasswordResetDto } from './dtos/password-reset.dto';
import { UserCredentialsDto } from './dtos/user-credentials.dto';
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
  async sendEmailVerification(@Body() body: EmailVerificationDto) {
    return this.authService.sendEmailVerification(body.email);
  }

  @Post('/send-password-reset-email')
  @HttpCode(200)
  async sendPasswordResetEmail(@Body() body: EmailVerificationDto) {
    return this.authService.sendPasswordResetEmail(body.email);
  }

  @Post('/password-reset')
  @HttpCode(200)
  async passwordReset(@Body() body: PasswordResetDto, @Session() session: any) {
    session.userId = null;
    return this.authService.passwordReset(body.token, body.newPassword);
  }

  @Post('/register')
  async register(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.register(body);
    session.userId = user.id;
    console.log(session);
    return user;
  }

  @Post('/signin')
  async signin(@Body() body: UserCredentialsDto, @Session() session: any) {
    const user = await this.authService.signin(body.email, body.password);
    session.userId = user.id;
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
