module.exports = {
  transform: {
    '^.+\\.tsx?$': ['babel-jest', { configFile: './babel.config.cjs' }],
  },
  transformIgnorePatterns: [
    "/node_modules/(?!node-fetch).+\\.js$"
  ],
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.jest.json'
    }
  }
};
