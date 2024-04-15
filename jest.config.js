/** @type {import('jest').Config} */
const config = {
  moduleNameMapper: {
    "src/(.*)": "<rootDir>/src/$1"
  },
  "coveragePathIgnorePatterns": [
    "<rootDir>/src/application"
  ]
}

export default config