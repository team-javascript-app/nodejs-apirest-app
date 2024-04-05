import UserRepository from 'src/infrastructure/user/adapters/postgresql/UserRepository.js'

import {describe, test, expect} from '@jest/globals'

describe('class UserRepository', () => {

  test('findAll', async()=> {
    const userRepository = new UserRepository()
    await userRepository.connet()
    const users = await userRepository.findAll()
    expect(Array.isArray(users)).toBe(true)
    await userRepository.close()
  })

  test('save', async() => {
    const userRepository = new UserRepository()
    await userRepository.connet()
    const user = await userRepository.save({
      id:0, username: 'manuel', password: '123456789' })
    expect(typeof user.id === 'number').toBe(true)
    expect(user.username).toEqual('manuel')
    expect(user.password).toEqual('123456789')
    await userRepository.close()
  })

  test('update', async() => {
    const userRepository = new UserRepository()
    await userRepository.connet()
    await userRepository.save({
      id:0, username: 'andrea', password: '666777777' })
    const user = await userRepository.save({
      id:1, username: 'manuel', password: '123456789' })


    expect(typeof user.id === 'number').toBe(true)
    expect(user.username).toEqual('manuel')
    expect(user.password).toEqual('123456789')
    await userRepository.close()
  })

  test('delete', async() => {
    const userRepository = new UserRepository()
    await userRepository.connet()
    const user = await userRepository.delete('manuel')
    expect(typeof user.id === 'number').toBe(true)
    expect(user.username).toEqual('manuel')
    expect(user.password).toEqual('123456789')
    await userRepository.close()
  })

})