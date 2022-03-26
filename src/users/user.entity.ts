import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @AfterInsert()
  logInsert() {
    console.log('User inserted:', this);
  }

  @AfterUpdate()
  logUpdate() {
    console.log('User updated:', this);
  }

  @AfterRemove()
  logRemove() {
    console.log('User removed:', this);
  }
}
