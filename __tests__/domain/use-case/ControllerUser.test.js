import {describe, test, expect, jest} from '@jest/globals'
import ControllerUser from 'src/domain/user/use-case/ControllerUser.js'

describe('ContollerUser test of use-case', () => {
  describe('findAll test', () => {
    test('should return error when failed connection database', async () => {
      const userRepository = { findAll: () => { throw Error('database error') }}
      const controllerWeb = new ControllerUser(userRepository)
      try {
        await controllerWeb.findAll()
      } catch (error) {
        expect(error.message).toEqual('database error')
      }
    })

    test('should return [] when successful', async () => {
      const userRepository = { findAll: () => [] }
      const controllerWeb = new ControllerUser(userRepository)
      const result = await controllerWeb.findAll()
      expect(result).toEqual([])
    })
  })
})
