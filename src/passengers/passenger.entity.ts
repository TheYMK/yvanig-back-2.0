import { User } from 'src/users/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
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
  Female = 'female',
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
}
