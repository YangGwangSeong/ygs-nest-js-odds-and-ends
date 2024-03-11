import { Test, TestingModule } from '@nestjs/testing';
import { PostsService } from './posts.service';
import { IPost, postItems } from './posts.controller';
import { NotFoundException } from '@nestjs/common';

describe('PostsService', () => {
  let service: PostsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostsService],
    }).compile();

    service = module.get<PostsService>(PostsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // service 1 getPosts 메소드
  describe('getPosts', () => {
    // service 1-1 getPosts 메소드가 정의 되었는지
    it('should be defined getPosts()', () => {
      expect(service.getPosts).toBeDefined();
    });

    // service 1-2 getPosts 메소드의 리턴값이 맞는지 체크
    it('should return a posts', () => {
      expect(service.getPosts()).toEqual(postItems);
    });
  });

  // servcie 2 getPostById 메서드
  describe('getPostById', () => {
    // service 2-1 getPostById 메서드가 정의 되었는지
    it('shoud be defined getPostById()', () => {
      expect(service.getPostById).toBeDefined();
    });

    // 2-2 getPostbyId 리턴값이 맞는지 체크
    it('should be a post', () => {
      const mockParamPsotId = 3;
      const mockPostValue = postItems.find(
        (item) => item.id === mockParamPsotId,
      );

      expect(service.getPostById(mockParamPsotId)).toEqual(mockPostValue);
    });

    // 2-3 존재 하지 않는 post일때 에러 체크
    it('should be an error when the post does not exist', () => {
      const mockParamPsotId = 7;

      // toTHrow를 사용 함수 실행 중 예외가 발생하는지를 확인
      // 이 때 함수 호출을 콜백으로 전달하여 예외가 발생하는지를 확인
      // expect(controller.getPostbyId(mockParamPsotId)) - 함수를 호출하여 반환된 값을 테스트합니다.
      // expect(() => controller.getPostbyId(mockParamPsotId)) - 함수 호출을 콜백 함수로 감싸고 있습니다. 따라서 테스트는 함수를 호출하고 예외가 발생하는지를 확인
      expect(() => service.getPostById(mockParamPsotId)).toThrow(
        new NotFoundException(),
      );
    });
  });

  // service 3 createPost 메서드
  describe('createPost', () => {
    // service 3-1 createPost 메서드가 정의 되었는지
    it('should be defined createPost()', () => {
      expect(service.createPost).toBeDefined();
    });

    // service 3-2 postPosts 리턴값이 맞는지 체크
    it('should be correct create post', () => {
      const mockNewPost: Omit<IPost, 'likeCount' | 'commentCount'> = {
        id: postItems[postItems.length - 1].id + 1,
        author: 'newjeans_official',
        title: '뉴진스 혜인',
        content: '장난 치고 있는 혜인',
      };

      const returnNewPost: IPost = {
        id: 6,
        author: 'newjeans_official',
        title: '뉴진스 혜인',
        content: '장난 치고 있는 혜인',
        likeCount: 0,
        commentCount: 0,
      };

      expect(
        service.createPost(
          mockNewPost.author,
          mockNewPost.title,
          mockNewPost.content,
        ),
      ).toEqual(returnNewPost);
    });
  });

  // service 4 updatePost 메서드
  describe('updatePost', () => {
    // service 4-1 updatePost 메서드가 정의 되었는지
    it('should be defined updatePost()', () => {
      expect(service.updatePost).toBeDefined();
    });

    // service 4-2 param postId가 없으면 에러
    it('should be an error when the post does not exist', () => {
      const mockParamPsotId = 7;
      expect(() => service.updatePost(mockParamPsotId, {})).toThrow(
        new NotFoundException(),
      );
    });

    // service 4-3 리턴값이 맞는지 체크
    it('should be correct return value', () => {
      const mockPostId = 2;
      const mockUpdatePost = {
        title: '헬로우월드',
      };
      const updatePost = postItems.find((item) => item.id === mockPostId);
      updatePost.title = mockUpdatePost.title;

      expect(service.updatePost(mockPostId, mockUpdatePost)).toEqual(
        updatePost,
      );
    });
  });

  // service 5 deletePost 메서드
  describe('deletePost', () => {
    // service 5-1 deletePost 메서드가 정의 되었는지
    it('should be defined deletePost()', () => {
      expect(service.deletePost).toBeDefined();
    });

    // service 5-2 postId가 없으면 에러 체크
    it('should be an error when the postId by Params', () => {
      const mockParamPsotId = 7;
      expect(() => service.deletePost(mockParamPsotId)).toThrow(
        new NotFoundException(),
      );
    });
  });
});
