import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Session,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
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

@ApiTags('users')
@Serialize(UserDto)
@Controller('api/auth')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Post('/send-email-verification')
  @HttpCode(200)
  @ApiOkResponse({
    description: 'The email verification email was sent successfully',
  })
  @ApiBadRequestResponse({
    description: 'Failed to send email verification email',
  })
  async sendEmailVerification(@Body() body: EmailVerificationDto) {
    return this.authService.sendEmailVerification(body.email);
  }

  @Post('/send-password-reset-email')
  @HttpCode(200)
  @ApiOkResponse({
    description: 'The password reset email was sent successfully',
  })
  @ApiBadRequestResponse({ description: 'Failed to send password reset email' })
  async sendPasswordResetEmail(@Body() body: EmailVerificationDto) {
    return this.authService.sendPasswordResetEmail(body.email);
  }

  @Post('/password-reset')
  @HttpCode(200)
  @ApiOkResponse({
    description: 'The password reset was successful',
  })
  @ApiBadRequestResponse({ description: 'Invalid token' })
  @ApiNotFoundResponse({ description: 'User not found' })
  async passwordReset(@Body() body: PasswordResetDto, @Session() session: any) {
    session.userId = null;
    return this.authService.passwordReset(body.token, body.newPassword);
  }

  @Post('/register')
  @ApiCreatedResponse({
    description: 'The user was created successfully',
  })
  @ApiBadRequestResponse({ description: 'Invalid token' })
  @ApiBadRequestResponse({ description: 'User already exists' })
  @ApiNotFoundResponse({ description: 'User not found' })
  async register(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.register(body);
    session.userId = user.id;
    return user;
  }

  @Post('/signin')
  @HttpCode(200)
  @ApiOkResponse({
    description: 'The user was successfully logged in',
  })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiUnauthorizedResponse({ description: 'Incorrect credentials' })
  async signin(@Body() body: UserCredentialsDto, @Session() session: any) {
    const user = await this.authService.signin(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  @Get('whoami')
  @UseGuards(AuthGuard)
  @ApiOkResponse({ description: 'The user was successfully fetched' })
  whoAmI(@CurrentUser() user: User) {
    return user;
  }

  @Post('/signout')
  @HttpCode(200)
  @ApiOkResponse({ description: 'The user was successfully logged out' })
  signOut(@Session() session: any) {
    session.userId = null;
  }
}
