/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type { Config } from 'jest';

const config: Config = {
  preset: 'react-native',
  displayName: '@rnmu/components',
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.tsx'],
  coverageDirectory: 'coverage',
  testPathIgnorePatterns: ['<rootDir>/node_modules', '<rootDir>/dist'],
  transformIgnorePatterns: [
    '<rootDir>/../../node_modules/(?!(@react-native|react-native(-.*)?)/)',
  ],
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  transform: {
    '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$':
      'jest-transform-stub',
    '\\.[jt]sx?$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};

export default config;
