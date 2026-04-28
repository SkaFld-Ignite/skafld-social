import { Test, TestingModule } from '@nestjs/testing';
import { PostsController } from '../api/routes/posts.controller';
import { PostsService } from '@gitroom/nestjs-libraries/database/prisma/posts/posts.service';
import { AgentGraphService } from '@gitroom/nestjs-libraries/agent/agent.graph.service';
import { ShortLinkService } from '@gitroom/nestjs-libraries/short-linking/short.link.service';

describe('PostsController', () => {
  let controller: PostsController;
  let postsService: jest.Mocked<PostsService>;

  const mockOrg = { id: 'org-123', name: 'Test Org' };
  const mockUser = { id: 'user-123', email: 'test@test.com' };

  beforeEach(async () => {
    const mockPostsService = {
      getStatistics: jest.fn(),
      getMissingContent: jest.fn(),
      updateReleaseId: jest.fn(),
      createComment: jest.fn(),
    };

    const mockAgentGraphService = {
      generate: jest.fn(),
    };

    const mockShortLinkService = {
      askShortLinkedin: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostsController],
      providers: [
        { provide: PostsService, useValue: mockPostsService },
        { provide: AgentGraphService, useValue: mockAgentGraphService },
        { provide: ShortLinkService, useValue: mockShortLinkService },
      ],
    }).compile();

    controller = module.get<PostsController>(PostsController);
    postsService = module.get(PostsService);
  });

  describe('getStatistics', () => {
    it('should return post statistics for organization', async () => {
      const mockStats = { views: 100, clicks: 50 };
      postsService.getStatistics.mockResolvedValue(mockStats);

      const result = await controller.getStatistics(mockOrg as any, 'post-123');
      expect(result).toEqual(mockStats);
      expect(postsService.getStatistics).toHaveBeenCalledWith('org-123', 'post-123');
    });
  });

  describe('getMissingContent', () => {
    it('should return missing content for a post', async () => {
      const mockMissing = { missing: ['image'] };
      postsService.getMissingContent.mockResolvedValue(mockMissing);

      const result = await controller.getMissingContent(mockOrg as any, 'post-123');
      expect(result).toEqual(mockMissing);
      expect(postsService.getMissingContent).toHaveBeenCalledWith('org-123', 'post-123');
    });
  });

  describe('updateReleaseId', () => {
    it('should update release id for a post', async () => {
      postsService.updateReleaseId.mockResolvedValue(undefined);

      await controller.updateReleaseId(mockOrg as any, 'post-123', 'release-456');
      expect(postsService.updateReleaseId).toHaveBeenCalledWith('org-123', 'post-123', 'release-456');
    });
  });

  describe('createComment', () => {
    it('should create a comment on a post', async () => {
      const mockComment = { id: 'comment-1', comment: 'Great post!' };
      postsService.createComment.mockResolvedValue(mockComment);

      const result = await controller.createComment(
        mockOrg as any,
        mockUser as any,
        'post-123',
        { comment: 'Great post!' }
      );
      expect(result).toEqual(mockComment);
      expect(postsService.createComment).toHaveBeenCalledWith('org-123', 'user-123', 'post-123', 'Great post!');
    });
  });
});
