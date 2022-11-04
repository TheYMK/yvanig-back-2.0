import { Expose, Transform } from 'class-transformer';
import { DocumentTypes, Genders } from '../passenger.entity';

export class PassengerDto {
  @Expose()
  id: number;

  @Expose()
  document_type: DocumentTypes;

  @Expose()
  document_number: string;

  @Expose()
  phone_number: string;

  @Expose()
  date_of_birth: string;

  @Expose()
  gender: Genders;

  @Transform(({ obj }) => obj.user.id)
  @Expose()
  userId: number;
}
