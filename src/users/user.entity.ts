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
}
@Entity()
@Unique(['email'])
export class User {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'varchar', length: 200, nullable: false })
  public first_name: string;

  @Column({ type: 'varchar', length: 200, nullable: false })
  public last_name: string;

  @Column({
    type: 'varchar',
    unique: true,
    length: 200,
    nullable: false,
  })
  public email: string;

  @Column({ type: 'varchar', length: 200, nullable: false })
  public password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.CUSTOMER,
    nullable: false,
  })
  public role: UserRole;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    nullable: false,
  })
  public created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
    nullable: false,
  })
  public updated_at: Date;

  @Column({
    type: 'boolean',
    default: false,
    nullable: false,
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
