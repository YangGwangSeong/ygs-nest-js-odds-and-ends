import { Test, TestingModule } from '@nestjs/testing';
import { PostsService } from './posts.service';
import { IPost, postItems } from './posts.controller';
import { NotFoundException } from '@nestjs/common';
import { PostsRepository } from './posts.repository';
import { PostsModel } from './entities/posts.entity';

describe('PostsService', () => {
  let service: PostsService;
  let repository: PostsRepository;
  let mockData: PostsModel = new PostsModel(); // 나중에 createPostDto로 대체됨

  beforeEach(async () => {
    const PostsRepositoryMock = {
      getPostsRepository: jest.fn(),
      getPostByIdRepository: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostsService,
        {
          provide: PostsRepository,
          useFactory: () => PostsRepositoryMock,
        },
      ],
    }).compile();

    service = module.get<PostsService>(PostsService);
    repository = module.get<PostsRepository>(PostsRepository);
    mockData.id = 1;
    mockData.author = '양광성';
    mockData.commentCount = 0;
    mockData.content = '테스트 데이터';
    mockData.likeCount = 0;
    mockData.title = '제목';
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be defined repository', () => {
    expect(repository).toBeDefined();
  });

  // service 1 getPosts 메소드
  describe('getPosts', () => {
    // service 1-1 getPosts 메소드가 정의 되었는지
    it('should be defined getPosts()', () => {
      expect(service.getPosts).toBeDefined();
    });

    // service 1-2 service의 getPosts메서드를 호출 했을때 repository의 리턴 에러가 안나는지 체크
    it('should be not throw if repository returns', async () => {
      await expect(service.getPosts()).resolves.not.toThrow();
    });

    // service 1-3 repository의 getPostsRepository 리턴이 있을때 service의 getPosts 메서드에 제대로 리턴값이 오는지 체크
    it('should be return when repository return', async () => {
      (repository.getPostsRepository as jest.Mock).mockReturnValue([]);
      expect(await service.getPosts()).toEqual([]);
    });
  });

  // servcie 2 getPostById 메서드
  describe('getPostById', () => {
    // service 2-1 getPostById 메서드가 정의 되었는지
    it('shoud be defined getPostById()', () => {
      expect(service.getPostById).toBeDefined();
    });

    // service 2-2 존재하지 않는 post일때 에러 체크
    it('존재하지 않는 post일때 에러 체크', async () => {
      const mockParamPsotId = 999;

      (repository.getPostByIdRepository as jest.Mock).mockReturnValue(null);

      await expect(service.getPostById(mockParamPsotId)).rejects.toThrow(
        new NotFoundException('post를 찾을 수 없습니다'),
      );
    });

    // service 2-3 service의 getPostById메서드를 호출 했을때 repository의 리턴 에러가 안나는지 체크
    it('should be not throw if repository returns', async () => {
      (repository.getPostByIdRepository as jest.Mock).mockReturnValue(mockData);

      await expect(service.getPostById(1)).resolves.not.toThrow();
    });

    // service 2-4 service의 getPostById메서드를 호출 했을때 repository의 리턴값이 올바른지 확인
    it('service의 getPostById메서드를 호출 했을때 repository의 리턴값이 올바른지 확인', async () => {
      const mockParamPsotId = 1;

      (repository.getPostByIdRepository as jest.Mock).mockReturnValue(mockData);

      expect(await service.getPostById(mockParamPsotId)).toEqual(mockData);
    });
  });

  // service 3 createPost 메서드
  // describe('createPost', () => {
  //   // service 3-1 createPost 메서드가 정의 되었는지
  //   it('should be defined createPost()', () => {
  //     expect(service.createPost).toBeDefined();
  //   });

  //   // service 3-2 postPosts 리턴값이 맞는지 체크
  //   it('should be correct create post', () => {
  //     const mockNewPost: Omit<IPost, 'likeCount' | 'commentCount'> = {
  //       id: postItems[postItems.length - 1].id + 1,
  //       author: 'newjeans_official',
  //       title: '뉴진스 혜인',
  //       content: '장난 치고 있는 혜인',
  //     };

  //     const returnNewPost: IPost = {
  //       id: 6,
  //       author: 'newjeans_official',
  //       title: '뉴진스 혜인',
  //       content: '장난 치고 있는 혜인',
  //       likeCount: 0,
  //       commentCount: 0,
  //     };

  //     expect(
  //       service.createPost(
  //         mockNewPost.author,
  //         mockNewPost.title,
  //         mockNewPost.content,
  //       ),
  //     ).toEqual(returnNewPost);
  //   });
  // });

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
        new NotFoundException('post를 찾을 수 없습니다'),
      );
    });

    // service 4-3 리턴값이 맞는지 체크
    it('should be correct return value', () => {
      const mockPostId = 2;
      const mockUpdatePost = {
        title: '헬로우월드',
        content: 'hello',
        author: 'me',
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
        new NotFoundException('post를 찾을 수 없습니다'),
      );
    });
  });
});
