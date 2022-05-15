import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { BookingStatuses } from '../booking.entity';

export class UpdateBookingStatusDto {
  @ApiProperty({
    type: String,
    description: 'completed | pending | cancelled',
    enum: BookingStatuses,
  })
  @IsString()
  @IsNotEmpty()
  @IsEnum(BookingStatuses)
  status: BookingStatuses;
}
