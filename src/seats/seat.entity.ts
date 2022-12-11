import { Flight } from 'src/flights/flight.entity';
import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

export enum ClassTypes {
  FIRST = 'first',
  BUSINESS = 'business',
  ECONOMY = 'economy',
}

@Entity()
@Unique(['seat_number', 'flight'])
export class Seat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 20,
  })
  seat_number: string;

  @Column({
    type: 'boolean',
    default: true,
    nullable: false,
  })
  is_available: boolean;

  @Column({
    type: 'enum',
    enum: ClassTypes,
    default: ClassTypes.ECONOMY,
    nullable: false,
  })
  class_type: ClassTypes;

  @ManyToOne(() => Flight, (flight) => flight.seats, { onDelete: 'CASCADE' })
  flight: Flight;

  @AfterInsert()
  logInsert() {
    console.log('Seat inserted:', this);
  }

  @AfterUpdate()
  logUpdate() {
    console.log('Seat updated:', this);
  }

  @AfterRemove()
  logRemove() {
    console.log('Seat removed:', this);
  }
}
