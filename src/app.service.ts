import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getWelcomeMessage(): { message: string } {
    return {
      message: 'Welcome to the YVANIG Tour API',
    };
  }
}
