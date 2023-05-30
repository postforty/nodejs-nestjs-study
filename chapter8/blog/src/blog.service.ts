import { Injectable } from '@nestjs/common';
import { PostDto } from './blog.model';
import { BlogMongoRepository } from './blog.repository';

// import { BlogFileRepository } from './blog.repository';

@Injectable()
export class BlogService {
  // constructor(private blogRepository: BlogFileRepository) {}
  constructor(private blogRepository: BlogMongoRepository) {}

  async getAllPosts() {
    console.log('GET요청');
    return await this.blogRepository.getAllPost();
  }

  createPost(postDto: PostDto) {
    // const id = this.posts.length + 1;
    // this.posts.push({ id: id.toString(), ...postDto, creartedDt: new Date() });
    this.blogRepository.createPost(postDto);
  }

  async getPost(id): Promise<PostDto> {
    // const post = this.posts.find((post) => {
    //   return post.id === id;
    // });
    // console.log(post);
    // return post;
    return await this.blogRepository.getPost(id);
  }

  delete(id) {
    // const filteredPosts = this.posts.filter((post) => post.id !== id);
    // this.posts = [...filteredPosts];
    this.blogRepository.deletePost(id);
  }

  updatePost(id, postDto: PostDto) {
    // const updateIndex = this.posts.findIndex((post) => post.id === id);
    // const updatePost = { id, ...postDto, updateDt: new Date() };
    // this.posts[updateIndex] = updatePost;
    // return updatePost;
    this.blogRepository.updatePost(id, postDto);
  }
}
