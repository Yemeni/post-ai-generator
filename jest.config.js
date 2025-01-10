module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom', // Required for mocking fetch
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'], // Point to the setup file
};
