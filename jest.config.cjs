/** @type {import('jest').Config} */
const config = {
  collectCoverage: true,
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['js', 'jsx'],
  setupFilesAfterEnv: ['<rootDir>/internal/jest.setup.js'],
  collectCoverageFrom: ['<rootDir>/src/**/*.{js, jsx, ts, tsx}'],
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  moduleNameMapper: {
    '^.+\\.css$': 'identity-obj-proxy',
    '^.+\\.svg$': 'jest-svg-transformer',
  },
};

module.exports = config;
