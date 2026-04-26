import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../api/routes/auth.controller';
import { AuthService } from '../services/auth/auth.service';
import { EmailService } from '@gitroom/nestjs-libraries/services/email.service';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: jest.Mocked<AuthService>;

  beforeEach(async () => {
    const mockAuthService = {
      canRegister: jest.fn(),
      routeAuth: jest.fn(),
      getOrgFromCookie: jest.fn(),
      jwt: jest.fn(),
      forgotPassword: jest.fn(),
      forgotPasswordReturn: jest.fn(),
    };

    const mockEmailService = {
      sendEmail: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: EmailService, useValue: mockEmailService },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get(AuthService);
  });

  describe('canRegister', () => {
    it('should return register status', async () => {
      authService.canRegister.mockResolvedValue(true);
      const result = await controller.canRegister();
      expect(result).toEqual({ register: true });
      expect(authService.canRegister).toHaveBeenCalledWith('LOCAL');
    });

    it('should return false when registration is disabled', async () => {
      authService.canRegister.mockResolvedValue(false);
      const result = await controller.canRegister();
      expect(result).toEqual({ register: false });
    });
  });
});
