import { BadRequestException, Injectable } from '@nestjs/common';
import { JsonDB } from 'node-json-db';
import { Config } from 'node-json-db/dist/lib/JsonDBConfig';
import { UpdateSettingsDto } from './dtos/update-settings.dto';

@Injectable()
export class SettingsService {
  db: JsonDB;
  constructor() {
    this.db = new JsonDB(new Config('settings.db.json', true, true, '/'));
  }

  getSettings() {
    try {
      return this.db.getData('/');
    } catch (err) {
      throw new BadRequestException('Failed to get settings');
    }
  }

  updateSettings(settings: UpdateSettingsDto) {
    try {
      let allSettings = this.db.getData('/');

      Object.assign(allSettings, {
        settings: { ...allSettings.settings, ...settings },
      });

      this.db.push('/', allSettings);

      return allSettings;
    } catch (err) {
      throw new BadRequestException('Failed to update settings');
    }
  }
}
