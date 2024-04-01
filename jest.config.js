/** @type {import('jest').Config} */
const config = {
  moduleNameMapper: {
    "src/(.*)": "<rootDir>/src/$1"
  }
}

export default config