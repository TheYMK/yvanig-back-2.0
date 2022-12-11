import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Blog } from './blog.entity';

@Entity()
export class BlogCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 200,
    unique: true,
    nullable: false,
  })
  name: string;

  @ManyToMany(() => Blog, (blog) => blog.blog_categories)
  blogs: Blog[];
}
