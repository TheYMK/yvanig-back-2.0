import { Booking } from 'src/bookings/booking.entity';
import { User } from 'src/users/user.entity';
import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

export enum DocumentTypes {
  PASSPORT = 'passport',
  ID_CARD = 'id_card',
}

export enum Genders {
  MALE = 'male',
  FEMALE = 'female',
}

@Entity()
@Unique(['user'])
export class Passenger {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: DocumentTypes,
    nullable: false,
    default: DocumentTypes.PASSPORT,
  })
  document_type: DocumentTypes;

  @Column({
    type: 'varchar',
    length: 200,
    nullable: false,
  })
  document_number: string;

  @Column({
    type: 'date',
    nullable: false,
  })
  date_of_birth: string;

  @Column({
    type: 'enum',
    enum: Genders,
    nullable: false,
  })
  gender: Genders;

  @OneToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;

  @OneToMany(() => Booking, (booking) => booking.passenger)
  bookings: Booking[];

  @AfterInsert()
  logInsert() {
    console.log('Passenger inserted:', this);
  }

  @AfterUpdate()
  logUpdate() {
    console.log('Passenger updated:', this);
  }

  @AfterRemove()
  logRemove() {
    console.log('Passenger removed:', this);
  }
}
