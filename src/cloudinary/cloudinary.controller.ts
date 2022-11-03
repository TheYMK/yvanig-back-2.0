import {
  BadRequestException,
  Body,
  Controller,
  InternalServerErrorException,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';
import { CloudinaryService } from './cloudinary.service';
import { RemoveImageDto } from './dtos/remove-image.dto';
import { UploadImageDto } from './dtos/upload-image.dto';

@ApiTags('cloudinary')
@Controller({
  path: 'api/cloudinary',
  version: '1',
})
export class CloudinaryController {
  constructor(private cloudinaryService: CloudinaryService) {}

  @Post('/upload')
  @UseGuards(AuthGuard)
  async upload(@Body() { image }: UploadImageDto) {
    return this.cloudinaryService
      .upload(image)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        switch (err.response?.statusCode) {
          case 400:
            throw new BadRequestException('Failed to upload image');
          default:
            throw new InternalServerErrorException(
              'Something went wrong while uploading image',
            );
        }
      });
  }

  @Post('/remove')
  @UseGuards(AuthGuard)
  async remove(@Body() { public_id }: RemoveImageDto) {
    return this.cloudinaryService
      .remove(public_id)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        switch (err.response?.statusCode) {
          case 400:
            throw new BadRequestException('Failed to remove image');
          default:
            throw new InternalServerErrorException(
              'Something went wrong while removing image',
            );
        }
      });
  }
}
