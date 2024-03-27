import { Test, TestingModule } from '@nestjs/testing';
import { PostsRepository } from './posts.repository';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PostsModel } from './entities/posts.entity';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InternalServerErrorException } from '@nestjs/common';

describe('PostsRepository', () => {
  let repository: PostsRepository;
  let postsRepository: Repository<PostsModel>;
  let mockData: PostsModel;
  let createPostDtoArgs: CreatePostDto;

  beforeEach(async () => {
    const PostsRepositoryMock = {
      find: jest.fn(),
      findOne: jest.fn(),
      save: jest.fn(),
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostsRepository,
        {
          provide: getRepositoryToken(PostsModel),
          useFactory: () => PostsRepositoryMock,
        },
      ],
    }).compile();

    repository = module.get<PostsRepository>(PostsRepository);
    postsRepository = module.get<Repository<PostsModel>>(
      getRepositoryToken(PostsModel), // 여기에도 꼭 getRepositoryToken 함수 사용
    );
    mockData = {
      id: 1,
      author: 'newjeans_official',
      title: '뉴진스 혜인',
      content: '장난 치고 있는 혜인',
      likeCount: 0,
      commentCount: 0,
      created_at: new Date(),
      updated_at: new Date(),
    };
    createPostDtoArgs = {
      title: mockData.title,
      author: mockData.author,
      content: mockData.content,
    };
  });

  it('should be defined repository', () => {
    expect(repository).toBeDefined();
  });

  it('should be defined postsRepository', () => {
    expect(postsRepository).toBeDefined();
  });

  // 1. getPostsRepsotiry()
  describe('getPostsRepsotiry()', () => {
    // 1-1 should be defined getPostsRepository method
    it('should be defined getPostsRepository method', () => {
      expect(repository.getPostsRepository).toBeDefined();
    });

    // 1-2 should be returns when find returns
    it('should be returns when find returns', async () => {
      postsRepository.find = jest.fn().mockReturnValue([]);

      expect(await repository.getPostsRepository()).toEqual([]);
    });
  });

  // 2. getPostByIdRepository()
  describe('getPostByIdRepository()', () => {
    // 2-1 should be defined getPostByIdRepository method
    it('should be defined getPostByIdRepository method', () => {
      expect(repository.getPostByIdRepository).toBeDefined();
    });

    // 2-2 repository findOne 메서드가 제대로 호출 되었는지
    it('should be success called with postsRepository findOneBy ', async () => {
      postsRepository.findOne = jest.fn().mockReturnValue({});

      await repository.getPostByIdRepository(mockData.id);
      expect(postsRepository.findOne).toHaveBeenCalled();
    });

    // 2-3 should be returns findOne find returns
    it('should be returns findOne find returns', async () => {
      postsRepository.findOne = jest.fn().mockReturnValue({});

      expect(await repository.getPostByIdRepository(mockData.id)).toEqual({});
    });
  });

  // 3. createPostRepository()
  describe('createPostRepository', () => {
    // 3-1 should be defined createPostRepository method
    it('should be defined createPostRepository method', () => {
      expect(repository.createPostRepository).toBeDefined();
    });

    // 3-2 파라미터값이 올바른지 확인
    it('파라미터값이 올바른지 확인', async () => {
      postsRepository.save = jest.fn().mockReturnValue(mockData);
      await repository.createPostRepository(createPostDtoArgs);
      expect(postsRepository.save).toHaveBeenCalledWith(createPostDtoArgs);
    });

    // 3-3 repository save 함수가 에러가 났을때
    it('repository save 함수가 에러가 났을때', async () => {
      postsRepository.save = jest.fn().mockRejectedValue(new Error());

      await expect(
        repository.createPostRepository(createPostDtoArgs),
      ).rejects.toThrow();
    });

    // 3-4 save함수 성공시 리턴값
    it('save함수 성공시 리턴값', async () => {
      postsRepository.save = jest.fn().mockResolvedValue(mockData);

      expect(await repository.createPostRepository(createPostDtoArgs)).toEqual(
        mockData,
      );
    });
  });

  // 4. updatePostRepository()
  describe('updatePostRepository', () => {
    // 4-1 updatePostRepository 메서드가 정의 되어 있는지
    it('updatePostRepository 메서드가 정의 되어 있는지', () => {
      expect(repository.updatePostRepository).toBeDefined();
    });

    // 4-2 파라미터값이 올바른지 확인
    it('파라미터값이 올바른지 확인', async () => {
      const updatePostDto: UpdatePostDto = {
        title: '업데이트된 뉴진스 혜인',
      };

      mockData.title = '업데이트된 뉴진스 혜인';
      postsRepository.save = jest.fn().mockReturnValue(mockData);
      await repository.updatePostRepository(updatePostDto);
      expect(postsRepository.save).toHaveBeenCalledWith(updatePostDto);
    });

    // 4-3 repository save 함수가 에러가 났을때
    it('repository save 함수가 에러가 났을때', async () => {
      const updatePostDto: UpdatePostDto = {
        title: '업데이트된 뉴진스 혜인',
      };

      postsRepository.save = jest.fn().mockRejectedValue(new Error());

      await expect(
        repository.updatePostRepository(updatePostDto),
      ).rejects.toThrow();
    });

    // 4-4 save함수 성공시 리턴값
    it('save함수 성공시 리턴값', async () => {
      const updatePostDto: UpdatePostDto = {
        title: '업데이트된 뉴진스 혜인',
      };

      mockData.title = '업데이트된 뉴진스 혜인';

      postsRepository.save = jest.fn().mockResolvedValue(mockData);

      expect(await repository.updatePostRepository(updatePostDto)).toEqual(
        mockData,
      );
    });
  });

  // 5. deletePostRepository()
  describe('deletePostRepository', () => {
    // 5-1 should be defined deletePostRepository method
    it('should be defined deletePostRepository method', () => {
      expect(repository.deletePostRepository).toBeDefined();
    });

    // 5-2 repository delete 메서드가 제대로 호출 되었는지
    it('deletePostRepository delete 메서드가 제대로 호출 되었는지', async () => {
      postsRepository.delete = jest.fn();
      await repository.deletePostRepository(mockData.id);
      expect(postsRepository.delete).toHaveBeenCalled();
    });

    // 5-3 repository delete 함수가 에러가 났을때
    it('repository delete 함수가 에러가 났을때', async () => {
      postsRepository.delete = jest
        .fn()
        .mockRejectedValue(new InternalServerErrorException());

      await expect(
        repository.deletePostRepository(mockData.id),
      ).rejects.toThrow(new InternalServerErrorException());
    });
  });
});
