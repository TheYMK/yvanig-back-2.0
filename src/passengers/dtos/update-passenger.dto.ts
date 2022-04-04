import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { DocumentTypes, Genders } from '../passenger.entity';

export class UpdatePassengerDto {
  @ApiProperty({
    type: String,
    description: 'the type of documented used to identify the passenger',
    enum: DocumentTypes,
    default: DocumentTypes.PASSPORT,
  })
  @IsString()
  @IsNotEmpty()
  @IsEnum(DocumentTypes)
  @IsOptional()
  document_type: DocumentTypes;

  @ApiProperty({
    type: String,
    description: 'the number of the document',
    default: '123456789',
  })
  @IsString()
  @IsNotEmpty()
  @Length(1, 200)
  @IsOptional()
  document_number: string;

  @ApiProperty({
    type: String,
    description: 'the date of birth of the passenger',
    default: '1990-01-01',
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  date_of_birth: string;

  @ApiProperty({
    type: String,
    description: 'the gender of the passenger',
    enum: Genders,
  })
  @IsString()
  @IsNotEmpty()
  @IsEnum(Genders)
  @IsOptional()
  gender: Genders;
}
