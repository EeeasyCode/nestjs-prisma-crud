import { Test, TestingModule } from '@nestjs/testing';
import { PostService } from '../post.service';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateRequestDto } from '../dtos/request/create-request.dto';
import { UpdateRequestDto } from '../dtos/request/update-request.dto';

describe('PostService', () => {
  let postService: PostService;
  let prismaService: PrismaService;

  const testUser = {
    id: 1,
    email: 'test@example.com',
    name: 'Test User',
    createdAt: new Date(),
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostService,
        {
          provide: PrismaService,
          useValue: new PrismaService(),
        },
      ],
    }).compile();

    postService = module.get<PostService>(PostService);
    prismaService = module.get<PrismaService>(PrismaService);

    // Create test user
    await prismaService.user.create({
      data: testUser,
    });
  });

  describe('CRUD operations', () => {
    it('should create a post', async () => {
      const createDto: CreateRequestDto = {
        title: 'Test Post',
        content: 'Test Content',
        authorId: testUser.id,
      };

      const post = await postService.create(createDto);
      expect(post.title).toBe(createDto.title);
      expect(post.content).toBe(createDto.content);
      expect(post.authorId).toBe(createDto.authorId);
    });

    it('should find all posts', async () => {
      const posts = await postService.findAll();
      expect(Array.isArray(posts)).toBe(true);
    });

    it('should find one post', async () => {
      // Create a post first
      const createDto: CreateRequestDto = {
        title: 'Test Post',
        content: 'Test Content',
        authorId: testUser.id,
      };
      const created = await postService.create(createDto);

      const post = await postService.findOne(created.id);
      expect(post).toBeDefined();
      expect(post.id).toBe(created.id);
    });

    it('should update a post', async () => {
      // Create a post first
      const createDto: CreateRequestDto = {
        title: 'Test Post',
        content: 'Test Content',
        authorId: testUser.id,
      };
      const created = await postService.create(createDto);

      const updateDto: UpdateRequestDto = {
        title: 'Updated Title',
        content: 'Updated Content',
      };

      const updated = await postService.update(created.id, updateDto);
      expect(updated.title).toBe(updateDto.title);
      expect(updated.content).toBe(updateDto.content);
    });

    it('should delete a post', async () => {
      // Create a post first
      const createDto: CreateRequestDto = {
        title: 'Test Post',
        content: 'Test Content',
        authorId: testUser.id,
      };
      const created = await postService.create(createDto);

      await postService.remove(created.id);
      const found = await postService.findOne(created.id);
      expect(found).toBeNull();
    });
  });

  afterAll(async () => {
    await prismaService.$disconnect();
  });
});
