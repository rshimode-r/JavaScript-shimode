import { jest } from '@jest/globals';

export const mockRequest = {
  write: jest.fn(),
  end: jest.fn(),
  on: jest.fn(),
};

export const mockResponse = {
  statusCode: 200,
  on: jest.fn(),
};

await jest.unstable_mockModule('https', () => ({
  default: {
    request: (options, callback) => {
      callback(mockResponse);
      return mockRequest;
    },
  },
}));
