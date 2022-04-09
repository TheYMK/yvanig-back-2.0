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
  OneToMany,
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
    type: 'numeric',
    nullable: false,
  })
  price: number;

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
