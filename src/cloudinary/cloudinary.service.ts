import { BadRequestException, Injectable } from '@nestjs/common';
import * as cloudinary from 'cloudinary';

// config
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

@Injectable()
export class CloudinaryService {
  constructor() {}

  async upload(image: string) {
    console.log(cloudinary.v2);
    try {
      let result = await cloudinary.v2.uploader.upload(image, {
        public_id: `${Date.now()}`,
        resource_type: 'auto',
      });
      return JSON.stringify({
        public_id: result.public_id,
        url: result.secure_url,
      });
    } catch (err) {
      console.log(err);
      throw new BadRequestException('Failed to upload image');
    }
  }

  async remove(public_id: string) {
    cloudinary.v2.uploader.destroy(public_id, (err, result) => {
      if (err) {
        console.log(err);
        throw new BadRequestException('Failed to remove image');
      }
      return JSON.stringify({
        success: true,
      });
    });
  }
}
