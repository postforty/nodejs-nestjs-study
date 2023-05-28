import { PostDto } from './blog.model';

export class BlogService {
  posts = [];

  getAllPosts() {
    console.log('GET요청');
    return this.posts;
  }

  createPost(postDto: PostDto) {
    const id = this.posts.length + 1;
    this.posts.push({ id: id.toString(), ...postDto, creartedDt: new Date() });
  }

  getPost(id) {
    const post = this.posts.find((post) => {
      return post.id === id;
    });
    console.log(post);
    return post;
  }

  delete(id) {
    const filteredPosts = this.posts.filter((post) => post.id !== id);
    this.posts = [...filteredPosts];
  }

  updatePost(id, postDto: PostDto) {
    const updateIndex = this.posts.findIndex((post) => post.id === id);
    const updatePost = { id, ...postDto, updateDt: new Date() };
    this.posts[updateIndex] = updatePost;
    return updatePost;
  }
}
