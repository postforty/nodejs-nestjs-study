import {
  Controller,
  Param,
  Body,
  Delete,
  Get,
  Post,
  Put,
} from '@nestjs/common';
import { BlogService } from './blog.service';

@Controller('blog')
export class BlogController {
  BlogService: BlogService;
  constructor() {
    this.BlogService = new BlogService();
  }

  @Get()
  getAllPosts() {
    console.log('모든 게시글 가져오기');
    return this.BlogService.getAllPosts();
  }

  @Post()
  createPost(@Body() postDto) {
    console.log('게시글 작성');
    console.log(postDto);
    this.BlogService.createPost(postDto);
    return 'success';
  }

  @Get('/:id')
  async getPost(@Param('id') id: string) {
    console.log(`[id: ${id}]게시글 하나 가져오기`);

    const post = await this.BlogService.getPost(id);
    console.log(post);
    return post;
  }

  @Delete('/:id')
  deletePost(@Param('id') id: string) {
    console.log('게시글 삭제');
    this.BlogService.delete(id);
    return 'success';
  }

  @Put('/:id')
  updatePost(@Param('id') id: string, @Body() postDto) {
    console.log('게시글 업데이트', id, postDto);
    return this.BlogService.updatePost(id, postDto);
  }
}
