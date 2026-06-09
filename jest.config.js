/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: "node",
  testMatch: ["**/tests/**/*.test.ts"],
  testTimeout: 30_000,
  verbose: true,
  transform: {
    "^.+\\.ts$": ["ts-jest", { tsconfig: { rootDir: "." } }],
  },
};
