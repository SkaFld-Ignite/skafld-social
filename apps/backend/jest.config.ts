export default {
  displayName: 'backend',
  preset: '../../jest.preset.js',
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'js', 'json'],
  moduleNameMapper: {
    '@gitroom/backend/(.*)': '<rootDir>/src/$1',
    '@gitroom/nestjs-libraries/(.*)': '<rootDir>/../../libraries/nestjs-libraries/src/$1',
    '@gitroom/helpers/(.*)': '<rootDir>/../../libraries/helpers/src/$1',
  },
  coverageDirectory: '../../coverage/apps/backend',
  testMatch: ['**/*.spec.ts', '**/*.test.ts'],
};
