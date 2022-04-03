import { Seat } from 'src/seats/seat.entity';
import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum FlightStatuses {
  SCHEDULED = 'scheduled',
  DELAYED = 'delayed',
  IN_AIR = 'in_air',
  EXPECTED = 'expected',
  DIVERTED = 'diverted',
  RECOVERY = 'recovery',
  LANDED = 'landed',
  ARRIVED = 'arrived',
  CANCELLED = 'cancelled',
  NO_TAKEOFF_INFO = 'no_takeoff_info',
  PAST_FLIGHT = 'past_flight',
}
@Entity()
export class Flight {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 200,
    nullable: false,
  })
  airline: string;

  @Column({
    type: 'varchar',
    length: 200,
    nullable: false,
  })
  flight_number: string;

  @Column({
    type: 'int',
    nullable: false,
  })
  capacity: number;

  @Column({
    type: 'varchar',
    length: 200,
    nullable: false,
  })
  origin: string;

  @Column({
    type: 'varchar',
    length: 200,
    nullable: false,
  })
  destination: string;

  @Column({
    type: 'varchar',
    length: 200,
    nullable: false,
  })
  origin_airport_name: string;

  @Column({
    type: 'varchar',
    length: 200,
    nullable: false,
  })
  destination_airport_name: string;

  @Column({
    type: 'time',
    nullable: false,
  })
  departure_time: string;

  @Column({
    type: 'time',
    nullable: false,
  })
  arrival_time: string;

  @Column({
    type: 'date',
    nullable: false,
  })
  departure_date: string;

  @Column({
    type: 'date',
    nullable: false,
  })
  arrival_date: string;

  @Column({
    type: 'boolean',
    nullable: false,
    default: false,
  })
  refundable: boolean;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  company_logo: string;

  @Column({
    type: 'varchar',
    length: 1000,
    nullable: false,
  })
  description: string;

  @Column({
    type: 'numeric',
    nullable: false,
  })
  seat_base_price: number;

  @Column({
    type: 'numeric',
    nullable: false,
  })
  seat_price_business_class: number;

  @Column({
    type: 'numeric',
    nullable: false,
  })
  seat_price_first_class: number;

  @Column({
    type: 'enum',
    enum: FlightStatuses,
    default: FlightStatuses.SCHEDULED,
    nullable: false,
  })
  status: FlightStatuses;

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

  // The first argument is only for solving circular dependency issue
  @OneToMany(() => Seat, (seat) => seat.flight)
  seats: Seat[];

  @AfterInsert()
  logInsert() {
    console.log('Flight inserted:', this);
  }

  @AfterUpdate()
  logUpdate() {
    console.log('Flight updated:', this);
  }

  @AfterRemove()
  logRemove() {
    console.log('Flight removed:', this);
  }
}
