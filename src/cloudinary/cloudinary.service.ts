import { BadRequestException, Injectable } from '@nestjs/common';
import { v2 } from 'cloudinary';

@Injectable()
export class CloudinaryService {
  constructor() {}

  async upload(image: string) {
    try {
      let result = await v2.uploader.upload(image, {
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
    v2.uploader.destroy(public_id, (err, result) => {
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
