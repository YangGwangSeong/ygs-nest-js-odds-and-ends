import { Test, TestingModule } from '@nestjs/testing';
import { PostsController, postItems } from './posts.controller';
import { PostsService } from './posts.service';
import { NotFoundException } from '@nestjs/common';

describe('PostsController', () => {
  let controller: PostsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostsController],
      providers: [PostsService],
    }).compile();

    controller = module.get<PostsController>(PostsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // 1 getPost 메소드
  describe('getPost()', () => {
    // 1-1 getPost 메소드가 정의 되었는지
    it('should be defined getPost', () => {
      expect(controller.getPost).toBeDefined();
    });

    // 1-2 getPost 메소드의 리턴값이 맞는지 체크
    it('should return a posts', () => {
      expect(controller.getPost()).toEqual(postItems);
    });
  });

  // 2 getPostById 메소드
  describe('getPostbyId()', () => {
    // 2-1 getPostbyId 메소드가 정의 되었는지
    it('should be defined getPostbyId', () => {
      expect(controller.getPostbyId).toBeDefined();
    });

    // 2-2 getPostbyId 리턴값이 맞는지 체크
    it('should be a post', () => {
      const mockParamPsotId = 3;
      const mockPostValue = postItems.find(
        (item) => item.id === mockParamPsotId,
      );

      expect(controller.getPostbyId(mockParamPsotId)).toEqual(mockPostValue);
    });

    // 2-3 존재 하지 않는 post일때 에러 체크
    it('should be an error when the post does not exist', () => {
      const mockParamPsotId = 7;

      // toTHrow를 사용 함수 실행 중 예외가 발생하는지를 확인
      // 이 때 함수 호출을 콜백으로 전달하여 예외가 발생하는지를 확인
      // expect(controller.getPostbyId(mockParamPsotId)) - 함수를 호출하여 반환된 값을 테스트합니다.
      // expect(() => controller.getPostbyId(mockParamPsotId)) - 함수 호출을 콜백 함수로 감싸고 있습니다. 따라서 테스트는 함수를 호출하고 예외가 발생하는지를 확인
      expect(() => controller.getPostbyId(mockParamPsotId)).toThrow(
        new NotFoundException(),
      );
    });
  });

  // 3 postPosts 메소드
  describe('postPosts', () => {
    // 3-1 postPosts 메소드가 정의 되었는지
    it('should be defined postPosts', () => {
      expect(controller.postPosts).toBeDefined();
    });
  });
});
