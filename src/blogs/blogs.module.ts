import { Module } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { BlogsController } from './blogs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Blog } from './blog.entity';
import { BlogCategory } from './blog-category.entity';
import { BlogTag } from './blog-tag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Blog, BlogCategory, BlogTag])],
  providers: [BlogsService],
  controllers: [BlogsController]
})
export class BlogsModule { }
