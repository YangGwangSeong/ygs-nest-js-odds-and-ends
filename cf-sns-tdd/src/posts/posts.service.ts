import { Injectable, NotFoundException } from '@nestjs/common';
import { IPost, postItems } from './posts.controller';

@Injectable()
export class PostsService {
  constructor() {}
  getPosts() {
    return postItems;
  }

  getPostById(postId: number) {
    const post = postItems.find((item) => item.id === postId);

    if (!post) throw new NotFoundException('post를 찾을 수 없습니다');

    return post;
  }

  createPost(author: string, title: string, content: string) {
    const newPost: IPost = {
      id: postItems[postItems.length - 1].id + 1,
      author,
      title,
      content,
      likeCount: 0,
      commentCount: 0,
    };

    postItems.push(newPost);

    return newPost;
  }

  updatePost(
    postId: number,
    {
      author,
      title,
      content,
    }: Partial<Omit<IPost, 'id' | 'likeCount' | 'commentCount'>>,
  ) {
    const post = postItems.find((item) => item.id === postId);

    if (!post) throw new NotFoundException('post를 찾을 수 없습니다');

    if (title) {
      post.title = title;
    }

    if (content) {
      post.content = content;
    }

    if (author) {
      post.author = author;
    }

    return post;
  }

  deletePost(postId: number) {
    const post = postItems.find((item) => item.id === postId);

    if (!post) throw new NotFoundException('post를 찾을 수 없습니다');
  }
}
