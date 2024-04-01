import {jest, describe, test, expect} from '@jest/globals'

import ControllerWeb from 'src/infrastructure/user/receivers/apirest/ControllerWeb.js'
import Main from 'src/application/index.js'

jest.mock('ControllerWeb')

describe('class ControllerWeb', () => {
  test('Main', () => {
    const app = new Main().app
    const router = new ControllerWeb(controllerUser)
    //expect(typeof main).toBe('object')
  })
})