import {
  BadRequestException,
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Patch,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AdminGuard } from 'src/guards/admin.guard';
import { UpdateSettingsDto } from './dtos/update-settings.dto';
import { SettingsService } from './settings.service';

@ApiTags('settings')
@Controller({
  path: 'api/settings',
  version: '1',
})
export class SettingsController {
  constructor(private settingsService: SettingsService) {}

  @Get()
  @UseGuards(AdminGuard)
  @ApiBadRequestResponse({
    description: 'Failed to get settings',
  })
  @ApiInternalServerErrorResponse({
    description: 'Something went wrong while updating the settings',
  })
  getSettings() {
    try {
      return this.settingsService.getSettings();
    } catch (err) {
      switch (err.response?.statusCode) {
        case 400:
          throw new BadRequestException('Failed to get settings');
        default:
          throw new InternalServerErrorException(
            'Something went wrong while updating settings',
          );
      }
    }
  }

  @Patch()
  @UseGuards(AdminGuard)
  @ApiOkResponse({
    description: 'The settings were updated successfully',
  })
  @ApiBadRequestResponse({
    description: 'Failed to update the settings',
  })
  @ApiInternalServerErrorResponse({
    description: 'Something went wrong while updating the settings',
  })
  updateSettings(@Body() body: UpdateSettingsDto) {
    try {
      return this.settingsService.updateSettings(body);
    } catch (err) {
      switch (err.response?.statusCode) {
        case 400:
          throw new BadRequestException('Failed to update settings');
        default:
          throw new InternalServerErrorException(
            'Something went wrong while updating settings',
          );
      }
    }
  }
}
