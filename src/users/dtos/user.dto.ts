import { Expose } from 'class-transformer';
import { UserRole } from '../user.entity';

export class UserDto {
  @Expose()
  id: number;

  @Expose()
  first_name: string;

  @Expose()
  last_name: string;

  @Expose()
  email: string;

  @Expose()
  role: UserRole;

  @Expose()
  created_at: Date;

  @Expose()
  updated_at: Date;

  @Expose()
  is_email_verified: boolean;
}
