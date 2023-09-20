/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type { Config } from 'jest';

const config: Config = {
  displayName: '@rnmu/theme',
  preset: 'react-native',
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.tsx'],
  moduleNameMapper: {
    '^@rnmu/components/(.*)$': '<rootDir>/../components/src/$1',
  },
  testPathIgnorePatterns: ['<rootDir>/node_modules', '<rootDir>/dist'],
  coverageDirectory: 'coverage',
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
