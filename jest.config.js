/** @type {import('ts-jest').JestConfigWithTsJest && import('jest').Config} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testRegex: "/__tests__/.*(test|spec)\\.[jt]sx?$",
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  }
}