import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BlogCategory } from './blog-category.entity';
import { BlogTag } from './blog-tag.entity';
import { Blog } from './blog.entity';
import { CreateBlogDto } from './dtos/create-blog.dto';

@Injectable()
export class BlogsService {
  constructor(
    @InjectRepository(BlogCategory)
    private categoryRepo: Repository<BlogCategory>,
    @InjectRepository(BlogTag) private tagRepo: Repository<BlogTag>,
    @InjectRepository(Blog) private blogRepo: Repository<Blog>,
  ) {}

  // Categories
  async createCategory(name: string): Promise<BlogCategory> {
    try {
      const category = this.categoryRepo.create({ name });
      return this.categoryRepo.save(category);
    } catch (err) {
      throw new BadRequestException('Failed to create a new category');
    }
  }

  async findAllCategories(): Promise<BlogCategory[]> {
    try {
      const categories = await this.categoryRepo.find();
      return categories;
    } catch (err) {
      throw new BadRequestException('Failed to find all categories');
    }
  }

  async findOneCategory(id: number): Promise<BlogCategory> {
    let category: BlogCategory;

    try {
      category = await this.categoryRepo.findOne(id);
    } catch (err) {
      throw new BadRequestException('Failed to find the category');
    }

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return category;
  }

  async deleteCategory(id: number): Promise<BlogCategory> {
    const category = await this.findOneCategory(id);
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    try {
      const removedCategory = await this.categoryRepo.remove(category);
      return removedCategory;
    } catch (err) {
      throw new BadRequestException('Failed to delete the category');
    }
  }

  // Tags
  async createTag(name: string): Promise<BlogTag> {
    try {
      const tag = this.tagRepo.create({ name });
      return this.tagRepo.save(tag);
    } catch (err) {
      throw new BadRequestException('Failed to create a new tag');
    }
  }

  async findAllTags(): Promise<BlogTag[]> {
    try {
      const tags = await this.tagRepo.find();
      return tags;
    } catch (err) {
      throw new BadRequestException('Failed to find all tags');
    }
  }

  async findOneTag(id: number): Promise<BlogTag> {
    let tag: BlogTag;

    try {
      tag = await this.tagRepo.findOne(id);
    } catch (err) {
      throw new BadRequestException('Failed to find the tag');
    }

    if (!tag) {
      throw new NotFoundException('Tag not found');
    }

    return tag;
  }

  async deleteTag(id: number): Promise<BlogTag> {
    const tag = await this.findOneTag(id);
    if (!tag) {
      throw new NotFoundException('Tag not found');
    }
    try {
      const removedTag = await this.tagRepo.remove(tag);
      return removedTag;
    } catch (err) {
      throw new BadRequestException('Failed to delete the tag');
    }
  }

  // Blogs
  async createBlog(blog: CreateBlogDto) {
    // check if the categories exists
    const categories = await this.categoryRepo
      .createQueryBuilder('category')
      .where('category.name IN (:...categories)', {
        categories: blog.blog_categories,
      })
      .getMany();

    const tags = await this.tagRepo
      .createQueryBuilder('tag')
      .where('tag.name IN (:...tags)', {
        tags: blog.blog_tags,
      })
      .getMany();

    if (categories.length === 0 || tags.length === 0) {
      throw new NotFoundException('Categories or Tags not found');
    }

    try {
      blog.blog_categories = categories;
      blog.blog_tags = tags;
      const newBlog = this.blogRepo.create(blog);
      const createdBlog = await this.blogRepo.save(newBlog);

      return createdBlog;
    } catch (err) {
      throw new BadRequestException('Failed to create a new blog');
    }
  }
}
