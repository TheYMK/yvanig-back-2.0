import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum UserRole {
  ADMIN = 'sysadmin',
  CUSTOMER = 'customer',
  FLIGHT_MANAGER = 'flight_manager',
  RESTAURANT_MANAGER = 'restaurant_manager',
  HOTEL_MANAGER = 'hotel_manager',
}
@Entity()
@Unique(['email'])
export class User {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public first_name: string;

  @Column()
  public last_name: string;

  @Column({
    unique: true,
  })
  public email: string;

  @Column()
  public password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.CUSTOMER,
  })
  public role: UserRole;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  public updated_at: Date;

  @Column({
    default: false,
  })
  public is_email_verified: boolean;

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
