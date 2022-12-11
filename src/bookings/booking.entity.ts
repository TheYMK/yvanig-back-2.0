import { Flight } from 'src/flights/flight.entity';
import { Passenger } from 'src/passengers/passenger.entity';
import { Seat } from 'src/seats/seat.entity';
import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

export enum BookingTypes {
  FLIGHT = 'flight',
  HOTEL = 'hotel',
  RESTAURANT = 'restaurant',
}

export enum BookingStatuses {
  CONFIRMED = 'confirmed',
  CANCELLED = 'cancelled',
  PENDING = 'pending',
}

export enum PaymentMethods {
  BANK_CARD = 'bank_card',
  MONEYGRAM = 'moneygram',
  WESTERN_UNION = 'western_union',
  PAYPAL = 'paypal',
}

@Entity()
@Unique(['passenger', 'flight'])
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: BookingTypes,
    nullable: false,
  })
  booking_type: BookingTypes;

  @Column({
    type: 'enum',
    enum: PaymentMethods,
    nullable: false,
  })
  payment_method: PaymentMethods;

  @Column({
    type: 'numeric',
    nullable: false,
  })
  price: number;

  @Column({
    type: 'enum',
    enum: BookingStatuses,
    nullable: false,
    default: BookingStatuses.PENDING,
  })
  status: BookingStatuses;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    nullable: false,
  })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
    nullable: false,
  })
  updated_at: Date;

  @ManyToOne(() => Flight, (flight) => flight.bookings, { onDelete: 'CASCADE' })
  flight: Flight;

  @OneToOne(() => Seat, { onDelete: 'CASCADE' })
  @JoinColumn()
  seat: Seat;

  @ManyToOne(() => Passenger, (passenger) => passenger.bookings, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  passenger: Passenger;

  @AfterInsert()
  logInsert() {
    console.log('Booking inserted:', this);
  }

  @AfterUpdate()
  logUpdate() {
    console.log('Booking updated:', this);
  }

  @AfterRemove()
  logRemove() {
    console.log('Booking removed:', this);
  }
}
