import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Blog } from './blog.entity';

@Entity()
export class BlogTag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 200,
    nullable: false,
    unique: true,
  })
  name: string;

  @ManyToMany(() => Blog, (blog) => blog.blog_tags)
  blogs: Blog[];
}
