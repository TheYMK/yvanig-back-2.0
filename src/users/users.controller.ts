import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  InternalServerErrorException,
  NotFoundException,
  Post,
  Session,
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
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { CreateUserDto } from './dtos/create-user.dto';
import { EmailVerificationDto } from './dtos/email-verification.dto';
import { PasswordResetDto } from './dtos/password-reset.dto';
import { UserCredentialsDto } from './dtos/user-credentials.dto';
import { UserDto } from './dtos/user.dto';
import { User } from './user.entity';

@ApiTags('users')
@Serialize(UserDto)
@Controller('api/auth')
export class UsersController {
  constructor(private authService: AuthService) {}

  // LAST TIME REVIEWED: 2022-04-02
  @Post('/send-email-verification')
  @HttpCode(200)
  @ApiOkResponse({
    description: 'The email verification email was sent successfully',
  })
  @ApiBadRequestResponse({
    description: 'Failed to send email verification email',
  })
  @ApiInternalServerErrorResponse({
    description: 'Something went wrong while sending email verification email',
  })
  async sendEmailVerification(@Body() body: EmailVerificationDto) {
    return this.authService
      .sendEmailVerification(body.email)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        switch (err.response?.statusCode) {
          case 400:
            throw new BadRequestException(
              'Failed to send email verification email',
            );
          default:
            throw new InternalServerErrorException(
              'Something went wrong while sending email verification email',
            );
        }
      });
  }

  // LAST TIME REVIEWED: 2022-04-02
  @Post('/send-password-reset-email')
  @HttpCode(200)
  @ApiOkResponse({
    description: 'The password reset email was sent successfully',
  })
  @ApiBadRequestResponse({ description: 'Failed to send password reset email' })
  @ApiInternalServerErrorResponse({
    description: 'Something went wrong while sending password reset email',
  })
  @ApiNotFoundResponse({ description: 'User not found' })
  async sendPasswordResetEmail(@Body() body: EmailVerificationDto) {
    return this.authService
      .sendPasswordResetEmail(body.email)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        switch (err.response?.statusCode) {
          case 400:
            throw new BadRequestException(
              'Failed to send password reset email',
            );
          case 404:
            throw new NotFoundException('User not found');
          default:
            throw new InternalServerErrorException(
              'Something went wrong while sending password reset email',
            );
        }
      });
  }

  // LAST TIME REVIEWED: 2022-04-02
  @Post('/password-reset')
  @HttpCode(200)
  @ApiOkResponse({
    description: 'The password reset was successful',
  })
  @ApiBadRequestResponse({
    description: 'Invalid token // Failed to update password of the user',
  })
  @ApiNotFoundResponse({ description: 'User not found' })
  async passwordReset(@Body() body: PasswordResetDto, @Session() session: any) {
    session.userId = null;
    return this.authService
      .passwordReset(body.token, body.newPassword)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        switch (err.response?.statusCode) {
          case 400:
            if (err.response?.message === 'Invalid token') {
              throw new BadRequestException('Invalid token');
            } else {
              throw new BadRequestException(
                'Failed to update password of the user',
              );
            }
          case 404:
            throw new NotFoundException('User not found');
          default:
            throw new InternalServerErrorException(
              'Something went wrong while resetting password',
            );
        }
      });
  }

  // LAST TIME REVIEWED: 2022-04-02
  @Post('/register')
  @ApiCreatedResponse({
    description: 'The user was created successfully',
  })
  @ApiBadRequestResponse({
    description: 'Invalid token // Email in use // Failed to create a user',
  })
  @ApiInternalServerErrorResponse({
    description: 'Something went wrong while creating the user',
  })
  async register(@Body() body: CreateUserDto, @Session() session: any) {
    return this.authService
      .register(body)
      .then((user) => {
        session.userId = user.id;
        return user;
      })
      .catch((err) => {
        switch (err.response?.statusCode) {
          case 400:
            if (err.response?.message === 'Invalid token') {
              throw new BadRequestException('Invalid token');
            } else if (err.response?.message === 'Email in use') {
              throw new BadRequestException('Email in use');
            } else {
              throw new BadRequestException('Failed to create user');
            }
          default:
            throw new InternalServerErrorException(
              'Something went wrong while creating the user',
            );
        }
      });
  }

  // LAST TIME REVIEWED: 2022-04-02
  @Post('/signin')
  @HttpCode(200)
  @ApiOkResponse({
    description: 'The user was successfully logged in',
  })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiUnauthorizedResponse({ description: 'Incorrect credentials' })
  @ApiInternalServerErrorResponse({
    description: 'Something went wrong while logging in the user',
  })
  async signin(@Body() body: UserCredentialsDto, @Session() session: any) {
    return this.authService
      .signin(body.email, body.password)
      .then((user) => {
        session.userId = user.id;
        return user;
      })
      .catch((err) => {
        switch (err.response?.statusCode) {
          case 404:
            throw new NotFoundException('User not found');
          case 401:
            throw new UnauthorizedException('Incorrect credentials');
          default:
            throw new InternalServerErrorException(
              'Something went wrong while logging in the user',
            );
        }
      });
  }

  // LAST TIME REVIEWED: 2022-04-02
  @Get('whoami')
  @UseGuards(AuthGuard)
  @ApiOkResponse({ description: 'The user was successfully fetched' })
  whoAmI(@CurrentUser() user: User) {
    return user;
  }

  // LAST TIME REVIEWED: 2022-04-02
  @Post('/signout')
  @HttpCode(200)
  @ApiOkResponse({ description: 'The user was successfully logged out' })
  signOut(@Session() session: any) {
    session.userId = null;
  }
}
