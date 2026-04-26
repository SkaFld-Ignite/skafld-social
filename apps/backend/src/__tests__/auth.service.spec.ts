import { AuthService } from '../services/auth/auth.service';
import { Provider } from '@prisma/client';

describe('AuthService', () => {
  let service: AuthService;
  let mockUserService: any;
  let mockOrgService: any;
  let mockNotificationService: any;
  let mockEmailService: any;
  let mockProviderManager: any;

  beforeEach(() => {
    mockUserService = {
      getUserByEmail: jest.fn(),
    };

    mockOrgService = {
      getCount: jest.fn(),
      createOrgAndUser: jest.fn(),
      addUserToOrg: jest.fn(),
    };

    mockNotificationService = {};
    mockEmailService = { sendEmail: jest.fn() };
    mockProviderManager = {};

    service = new AuthService(
      mockUserService,
      mockOrgService,
      mockNotificationService,
      mockEmailService,
      mockProviderManager
    );
  });

  describe('canRegister', () => {
    it('should return true when registration is not disabled', async () => {
      const originalEnv = process.env.DISABLE_REGISTRATION;
      delete process.env.DISABLE_REGISTRATION;

      const result = await service.canRegister(Provider.LOCAL as string);
      expect(result).toBe(true);

      process.env.DISABLE_REGISTRATION = originalEnv!;
    });

    it('should return true for GENERIC provider even when registration is disabled', async () => {
      const originalEnv = process.env.DISABLE_REGISTRATION;
      process.env.DISABLE_REGISTRATION = 'true';

      const result = await service.canRegister(Provider.GENERIC as string);
      expect(result).toBe(true);

      process.env.DISABLE_REGISTRATION = originalEnv!;
    });

    it('should return true when no organizations exist and registration disabled', async () => {
      const originalEnv = process.env.DISABLE_REGISTRATION;
      process.env.DISABLE_REGISTRATION = 'true';

      mockOrgService.getCount.mockResolvedValue(0);
      const result = await service.canRegister(Provider.LOCAL as string);
      expect(result).toBe(true);

      process.env.DISABLE_REGISTRATION = originalEnv!;
    });

    it('should return false when organizations exist and registration disabled', async () => {
      const originalEnv = process.env.DISABLE_REGISTRATION;
      process.env.DISABLE_REGISTRATION = 'true';

      mockOrgService.getCount.mockResolvedValue(5);
      const result = await service.canRegister(Provider.LOCAL as string);
      expect(result).toBe(false);

      process.env.DISABLE_REGISTRATION = originalEnv!;
    });
  });
});
