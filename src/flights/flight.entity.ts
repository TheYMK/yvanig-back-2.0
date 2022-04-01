import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Flight {
  @PrimaryGeneratedColumn()
  id: string;

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
