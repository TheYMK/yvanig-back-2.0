import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BlogCategory } from './blog-category.entity';
import { BlogTag } from './blog-tag.entity';

@Entity()
export class Blog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 200,
    default:
      'https://images.pexels.com/photos/4458/cup-mug-desk-office.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  })
  image_url: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  content: string;

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

  @ManyToMany(() => BlogCategory, (blogCategory) => blogCategory.blogs)
  @JoinTable()
  blog_categories: BlogCategory[];

  @ManyToMany(() => BlogTag, (blogTags) => blogTags.blogs)
  @JoinTable()
  blog_tags: BlogTag[];
}
