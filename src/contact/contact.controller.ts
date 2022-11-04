import {
  BadRequestException,
  Body,
  Controller,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ContactService } from './contact.service';
import { SendMessageDto } from './dtos/send-message.dto';

@ApiTags('contact')
@Controller({
  path: 'api/contact',
  version: '1',
})
export class ContactController {
  constructor(private contactService: ContactService) {}

  @Post('/send-message')
  @ApiBadRequestResponse({
    description: 'Failed to send a message',
  })
  @ApiInternalServerErrorResponse({
    description: 'Something went wrong while sending a message',
  })
  async sendMessage(@Body() body: SendMessageDto) {
    return this.contactService
      .sendMessage(body)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(err);
        switch (err.response?.statusCode) {
          case 400:
            throw new BadRequestException('Failed to send a message');
          default:
            throw new InternalServerErrorException(
              'Something went wrong while sending a message',
            );
        }
      });
  }
}
