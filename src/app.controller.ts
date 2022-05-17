import {
  BadRequestException,
  Controller,
  Get,
  InternalServerErrorException,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';
import { AppService } from './app.service';
import { AdminGuard } from './guards/admin.guard';

@Controller({
  path: '/api',
  version: '1',
})
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  welcomeMessage(): { message: string } {
    return this.appService.getWelcomeMessage();
  }

  @Get('/stats')
  @UseGuards(AdminGuard)
  @ApiBadRequestResponse({
    description:
      'Failed to get flights stats | Failed to get users stats | Failed to get bookings stats',
  })
  @ApiInternalServerErrorResponse({
    description: 'Something went wrong while getting stats',
  })
  getStats() {
    return this.appService
      .getStats()
      .then((res) => {
        return res;
      })
      .catch((err) => {
        switch (err.response?.statusCode) {
          case 400:
            if (err.response?.message === 'Failed to get flights stats') {
              throw new BadRequestException('Failed to get flights stats');
            } else if (err.response?.message === 'Failed to get users stats') {
              throw new BadRequestException('Failed to get users stats');
            } else {
              throw new BadRequestException('Failed to get bookings stats');
            }
          default:
            throw new InternalServerErrorException(
              'Something went wrong while getting stats',
            );
        }
      });
  }
}
