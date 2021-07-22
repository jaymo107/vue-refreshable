module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/no-babel',
  verbose: true,
  testMatch: [
    "**/tests/**/*.test.[jt]s?(x)"
  ],
  moduleNameMapper: {
      "^@/(.*)$": "<rootDir>/src/$1",
  },
}
