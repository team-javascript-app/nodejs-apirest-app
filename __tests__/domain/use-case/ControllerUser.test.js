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

  describe('update test', () => {
    test('should return error when User not found', async() => {
      const userRepository = { findByUsername:
        async() => Promise.resolve(null),
        save: () => Promise.resolve(new User(1, 'manuel', '123456789'))
      }
      const controllerWeb = new ControllerUser(userRepository)
      const user = new User(1, 'manuelflorezw', '123456789')
      try {
        await controllerWeb.update('manuel', user)
      } catch (error) {
        expect(error.message).toEqual(`User not found: 'manuel'`)
      }
    })

    test('should return user', async() => {
      const userRepository = { findByUsername:
        async() => Promise.resolve(new User(1, 'manuel', 'aaaaaaaaa')),
        save:() => Promise.resolve(new User(1, 'manuelflorezw', '123456789'))
      }
      const controllerWeb = new ControllerUser(userRepository)
      const user = new User(1, 'manuelflorezw', '123456789')

      const userResult = await controllerWeb.update('manuel', user)
      expect(userResult.id).toEqual(1)
      expect(userResult.username).toEqual('manuelflorezw')
      expect(userResult.password).toEqual('123456789')
    })
  })

  describe('update test', () => {
    test('should return error when User not found', async() => {
      const userRepository = {}
      userRepository.delete = async () => { throw Error('error faild') }
      const controllerWeb = new ControllerUser(userRepository)
      try {
        await controllerWeb.deleteUasername('manuelflorezw')
      } catch (error) {
        expect(error.message).toEqual('error faild')
      }
    })
  })
})
