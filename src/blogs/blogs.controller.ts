import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AdminGuard } from 'src/guards/admin.guard';
import { BlogsService } from './blogs.service';
import { CreateBlogCategoryDto } from './dtos/create-blog-category.dto';
import { CreateBlogTagyDto } from './dtos/create-blog-tag.dto';
import { CreateBlogDto } from './dtos/create-blog.dto';

@ApiTags('blogs')
@Controller({
  path: '/api/blogs',
  version: '1',
})
export class BlogsController {
  constructor(private blogService: BlogsService) {}

  // Categories
  @Post('/category')
  @UseGuards(AdminGuard)
  @ApiBadRequestResponse({
    description: 'Failed to create a new category',
  })
  @ApiInternalServerErrorResponse({
    description: 'Something went wrong while creating a new category',
  })
  async createBlogCategory(@Body() body: CreateBlogCategoryDto) {
    return this.blogService
      .createCategory(body.name)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        switch (err.response?.statusCode) {
          case 400:
            throw new BadRequestException('Failed to create a new category');
          default:
            throw new InternalServerErrorException(
              'Something went wrong while creating a new category',
            );
        }
      });
  }

  @Get('/categories')
  async getBlogCategories() {
    return this.blogService
      .findAllCategories()
      .then((res) => {
        return res;
      })
      .catch((err) => {
        switch (err.response?.statusCode) {
          case 400:
            throw new BadRequestException('Failed to find all categories');
          default:
            throw new InternalServerErrorException(
              'Something went wrong while finding all categories',
            );
        }
      });
  }

  @Get('/category/:id')
  @ApiBadRequestResponse({
    description: 'Failed to find the category',
  })
  @ApiNotFoundResponse({
    description: 'Category not found',
  })
  @ApiInternalServerErrorResponse({
    description: 'Something went wrong while finding the category',
  })
  async getBlogCategory(@Param('id', ParseIntPipe) id: number) {
    return this.blogService
      .findOneCategory(id)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        switch (err.response?.statusCode) {
          case 404:
            throw new NotFoundException('Category not found');
          case 400:
            throw new BadRequestException('Failed to find the category');
          default:
            throw new InternalServerErrorException(
              'Something went wrong while finding the category',
            );
        }
      });
  }

  @Delete('/category/:id')
  @ApiBadRequestResponse({
    description: 'Failed to find the category',
  })
  @ApiNotFoundResponse({
    description: 'Category not found',
  })
  @ApiInternalServerErrorResponse({
    description: 'Something went wrong while finding the category',
  })
  async deleteBlogCategory(@Param('id', ParseIntPipe) id: number) {
    return this.blogService
      .deleteCategory(id)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        switch (err.response?.statusCode) {
          case 404:
            throw new NotFoundException('Category not found');
          case 400:
            throw new BadRequestException('Failed to find the category');
          default:
            throw new InternalServerErrorException(
              'Something went wrong while finding the category',
            );
        }
      });
  }

  // Tags
  @Post('/tag')
  @UseGuards(AdminGuard)
  @ApiBadRequestResponse({
    description: 'Failed to create a new tag',
  })
  @ApiInternalServerErrorResponse({
    description: 'Something went wrong while creating a new tag',
  })
  async createBlogTag(@Body() body: CreateBlogTagyDto) {
    return this.blogService
      .createTag(body.name)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        switch (err.response?.statusCode) {
          case 400:
            throw new BadRequestException('Failed to create a new tag');
          default:
            throw new InternalServerErrorException(
              'Something went wrong while creating a new tag',
            );
        }
      });
  }

  @Get('/tags')
  async getBlogTags() {
    return this.blogService
      .findAllTags()
      .then((res) => {
        return res;
      })
      .catch((err) => {
        switch (err.response?.statusCode) {
          case 400:
            throw new BadRequestException('Failed to find all tags');
          default:
            throw new InternalServerErrorException(
              'Something went wrong while finding all tags',
            );
        }
      });
  }

  @Get('/tag/:id')
  @ApiBadRequestResponse({
    description: 'Failed to find the tag',
  })
  @ApiNotFoundResponse({
    description: 'Tag not found',
  })
  @ApiInternalServerErrorResponse({
    description: 'Something went wrong while finding the tag',
  })
  async getBlogTag(@Param('id', ParseIntPipe) id: number) {
    return this.blogService
      .findOneTag(id)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        switch (err.response?.statusCode) {
          case 404:
            throw new NotFoundException('Tag not found');
          case 400:
            throw new BadRequestException('Failed to find the tag');
          default:
            throw new InternalServerErrorException(
              'Something went wrong while finding the tag',
            );
        }
      });
  }

  @Delete('/tag/:id')
  @ApiBadRequestResponse({
    description: 'Failed to find the tag',
  })
  @ApiNotFoundResponse({
    description: 'Tag not found',
  })
  @ApiInternalServerErrorResponse({
    description: 'Something went wrong while finding the tag',
  })
  async deleteBlogTag(@Param('id', ParseIntPipe) id: number) {
    return this.blogService
      .deleteTag(id)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        switch (err.response?.statusCode) {
          case 404:
            throw new NotFoundException('Tag not found');
          case 400:
            throw new BadRequestException('Failed to find the tag');
          default:
            throw new InternalServerErrorException(
              'Something went wrong while finding the tag',
            );
        }
      });
  }

  // Blog
  @Post()
  @UseGuards(AdminGuard)
  @ApiBadRequestResponse({
    description: 'Failed to create a new blog',
  })
  @ApiNotFoundResponse({
    description: 'Categories or Tags not found',
  })
  @ApiInternalServerErrorResponse({
    description: 'Something went wrong while creating a blog',
  })
  async createBlog(@Body() body: CreateBlogDto) {
    return this.blogService
      .createBlog(body)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        switch (err.response?.statusCode) {
          case 404:
            throw new NotFoundException('Categories or Tags not found');
          case 400:
            throw new BadRequestException('Failed to create a new blog');
          default:
            throw new InternalServerErrorException(
              'Something went wrong while creating a blog',
            );
        }
      });
  }
}
