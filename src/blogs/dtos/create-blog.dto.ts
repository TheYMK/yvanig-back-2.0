import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { BlogCategory } from '../blog-category.entity';
import { BlogTag } from '../blog-tag.entity';

export class CreateBlogDto {
  @ApiProperty({
    type: String,
    description: 'image url of the blog',
    default:
      'https://images.pexels.com/photos/4458/cup-mug-desk-office.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  })
  @IsString()
  @Length(1, 200)
  @IsOptional()
  image_url: string;

  @ApiProperty({
    type: String,
    description: 'the content of the blog',
    default: 'This is the content of the blog',
  })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({
    type: Array,
    description: 'the categories of the blog',
    default: ['category1', 'category2'],
  })
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  blog_categories: BlogCategory[];

  @ApiProperty({
    type: Array,
    description: 'the tags of the blog',
    default: ['tag1', 'tag2'],
  })
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  blog_tags: BlogTag[];
}
