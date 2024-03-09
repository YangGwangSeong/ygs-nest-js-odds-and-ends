import { Test, TestingModule } from '@nestjs/testing';
import { PostsController, postItems } from './posts.controller';
import { PostsService } from './posts.service';

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
      const result = controller.getPost();

      expect(result).toEqual(postItems);
    });
  });

  // 2 getPostById 메소드
  describe('getPostbyId()', () => {
    // 1-1 getPostbyId 메소드가 정의 되었는지
    it('should be defined getPostbyId', () => {
      expect(controller.getPostbyId).toBeDefined();
    });

    // 1-2 getPostbyId 리턴값이 맞는지 체크
    it('should be a post', () => {
      const mockParamPsotId = 3;
      const mockPostValue = postItems.find(
        (item) => item.id === mockParamPsotId,
      );
      const result = controller.getPostbyId(mockParamPsotId);

      expect(result).toEqual(mockPostValue);
    });
  });
});
