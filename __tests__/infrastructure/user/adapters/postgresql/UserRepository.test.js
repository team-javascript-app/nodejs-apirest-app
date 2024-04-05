import UserRepository from 'src/infrastructure/user/adapters/postgresql/UserRepository.js'

import {describe, test, expect} from '@jest/globals'

describe('class UserRepository', () => {

  test('findAll', async()=> {
    const user = { user_id:1, user_username:'manuel', password: '123456789' }
    const client = { query: () => Promise.resolve({ rows:[user]}) }
    const userRepository = new UserRepository(client)
    const users = await userRepository.findAll()
    expect(Array.isArray(users)).toBe(true)
  })

  test('should return error findAll', async()=> {
    const client = { query: ()=> { throw Error('error en la base de datos')} }
    const userRepository = new UserRepository(client)
    try {
      await userRepository.findAll()
    } catch (error) {
      expect(error.message).toEqual('error en la base de datos')
    }
  })

  test('save', async() => {
    const userAux = {id:0, username: 'manuel', password: '123456789'}
    const userResult = {
      user_id:1, user_username: 'manuel', user_password: '123456789'}
    const client = { query: ()=> { return {rows: [userResult]}} }
    const userRepository = new UserRepository(client)
    const user = await userRepository.save(userAux)
    expect(typeof user.id === 'number').toBe(true)
    expect(user.username).toEqual('manuel')
    expect(user.password).toEqual('123456789')
  })

  test('update when id !== 0', async() => {
    const userAux = {id:1, username: 'manuel', password: '123456789'}
    const userResult = {
      user_id:1, user_username: 'manuel', user_password: '123456789'}
    const client = { query: ()=> { return {rows: [userResult]}} }
    const userRepository = new UserRepository(client)
    const user = await userRepository.save(userAux)
    expect(typeof user.id === 'number').toBe(true)
    expect(user.username).toEqual('manuel')
    expect(user.password).toEqual('123456789')
  })

  test('should return when update', async() => {
    const userAux = {id:1, username: 'manuel', password: '123456789'}
    const client = { query: ()=> { throw Error('error en la base de datos')} }
    const userRepository = new UserRepository(client)
    try {
      await userRepository.save(userAux)
    } catch (error) {
      expect(error.message).toEqual('error en la base de datos')
    }
  })

})