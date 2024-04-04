import {describe, test, expect, jest} from '@jest/globals'
import ControllerUser from 'src/domain/user/use-case/ControllerUser.js'
import User from 'src/domain/user/entities/User'

describe('ContollerUser test of use-case', () => {
  describe('findAll test', () => {
    test('should return error when failed connection database', async () => {
      const userRepository = { findAll: ()=>{ throw Error('database error')}}
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

  describe('create test', () => {
    test('should return error when failed findByUsername', async () => {
      const userRepository = { findByUsername:
        () => { throw Error('error consultando by Username') }}
      const controllerWeb = new ControllerUser(userRepository)
      try {
        await controllerWeb.create(
          { id: 0, username: 'manuel', password: '123456789' })
      } catch (error) {
        expect(error.message).toEqual('error consultando by Username')
      }
    })

    test('should return error when save user', async() => {
      const userRepository = {
        findByUsername: () => null,
        save: () => { throw Error('error guardando username') }
      }
      const controllerWeb = new ControllerUser(userRepository)
      try {
        await controllerWeb.create(
          { id: 0, username: 'manuel', password: '123456789' })
      } catch (error) {
        expect(error.message).toEqual('error guardando username')
      }
    })

    test('should return error when findByUsername and exists', async() => {
      const userRepository = {
        findByUsername: () => { return {
          id: 1, username: 'manuel', password: '123456789' } }
      }
      const controllerWeb = new ControllerUser(userRepository)
      try {
        await controllerWeb.create(
          { id: 0, username: 'manuel', password: '123456789' })
      } catch (error) {
        expect(error.message).toEqual(`User is register: 'manuel'`)
      }
    })

    test('should return user', async() => {
      const userRepository = {
        findByUsername: () => null,
        save: () => Promise.resolve(new User(1, 'manuel', '123456789'))}
      const controllerWeb = new ControllerUser(userRepository)
      const user = await controllerWeb.create(0, 'manuel', '123456789')
      expect(user.id).toEqual(1)
      expect(user.username).toEqual('manuel')
      expect(user.password).toEqual('123456789')
    })

  })
})
