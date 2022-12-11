import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString, Length } from 'class-validator';
import { DocumentTypes, Genders } from '../passenger.entity';

export class CreatePassengerDto {
  @ApiProperty({
    type: String,
    description: 'the type of documented used to identify the passenger',
    enum: DocumentTypes,
    default: DocumentTypes.PASSPORT,
  })
  @IsString()
  @IsNotEmpty()
  @IsEnum(DocumentTypes)
  document_type: DocumentTypes;

  @ApiProperty({
    type: String,
    description: 'the number of the document',
    default: '123456789',
  })
  @IsString()
  @IsNotEmpty()
  @Length(1, 200)
  document_number: string;

  @ApiProperty({
    type: String,
    description: 'the phone number of the user',
    default: '+33650578840',
  })
  @IsString()
  @IsNotEmpty()
  @Length(1, 200)
  phone_number: string;

  @ApiProperty({
    type: String,
    description: 'the date of birth of the passenger',
    default: '1990-01-01',
  })
  @IsString()
  @IsNotEmpty()
  date_of_birth: string;

  @ApiProperty({
    type: String,
    description: 'the gender of the passenger',
    enum: Genders,
  })
  @IsString()
  @IsNotEmpty()
  @IsEnum(Genders)
  gender: Genders;
}
