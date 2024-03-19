import { Test, TestingModule } from '@nestjs/testing';
import { PostsRepository } from './posts.repository';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PostsModel } from './entities/posts.entity';
import { Repository } from 'typeorm';

describe('PostsRepository', () => {
  let repository: PostsRepository;
  let postsRepository: Repository<PostsModel>;

  beforeEach(async () => {
    const PostsRepositoryMock = {
      find: jest.fn(),
      findOne: jest.fn(),
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
      (postsRepository.find as jest.Mock).mockReturnValue([]);
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
      (postsRepository.findOne as jest.Mock).mockReturnValue({});
      await repository.getPostByIdRepository(1);
      expect(postsRepository.findOne).toHaveBeenCalled();
    });

    // 2-3 should be returns findOne find returns
    it('should be returns findOne find returns', async () => {
      (postsRepository.findOne as jest.Mock).mockReturnValue({});
      expect(await repository.getPostByIdRepository(1)).toEqual({});
    });
  });
});