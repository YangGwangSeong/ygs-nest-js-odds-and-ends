import { Test, TestingModule } from '@nestjs/testing';
import { PostsRepository } from './posts.repository';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PostsModel } from './entities/posts.entity';
import { Repository } from 'typeorm';

describe('PostsRepository', () => {
  let repository: PostsRepository;
  let postsRepository: Repository<PostsModel>;

  beforeEach(async () => {
    const PostsRepositoryMock = {};

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
});
