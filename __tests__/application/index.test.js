import {describe, test, expect} from '@jest/globals'

import Main from 'src/application/index.js'

describe('Class Main', () => {
  test('should return object tha instance Main', () => {
    const main = new Main()
    expect(typeof main).toBe('object')
  })
})