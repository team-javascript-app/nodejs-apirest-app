import MemoryUserRepository from "src/infrastructure/user/adapters/memory/MemoryUserRepository";

import {describe, test, expect} from '@jest/globals'

describe('class MemoryRepository', () => {
  test('findAll', async() => {
    const memoryRepository = new MemoryUserRepository()
    const result = await memoryRepository.findAll()
    expect(result).toEqual([])
  })

  test('save when userid equals 0', async() => {
    const memoryRepository = new MemoryUserRepository()
    const result = await memoryRepository.save({
      id: 0, username: 'manuelflorez',password: '123456789'})
    expect(result.id).toEqual(1)
    expect(result.username).toEqual('manuelflorez')
    expect(result.password).toEqual('123456789')
  })

  test('save when for update user', async() => {
    const memoryRepository = new MemoryUserRepository()
    await memoryRepository.save({
      id: 0, username: 'jairoperes',password: 'xxxxxxxxxxx'})
    
    const result = await memoryRepository.save({
      id: 1, username: 'manuelflorez',password: '123456789'})

    expect(result.id).toEqual(1)
    expect(result.username).toEqual('manuelflorez')
    expect(result.password).toEqual('123456789')
  })

  test('should return error when for update user', async() => {
    const memoryRepository = new MemoryUserRepository()
    try {
      await memoryRepository.save({
        id: 2, username: 'manuelflorez',password: '123456789'})
    } catch (error) {
      expect(error.message).toEqual(`User not found: 'manuelflorez'`)
    }
  })

  test('findByUsername', async() => {
    const memoryRepository = new MemoryUserRepository()
    const result = await memoryRepository.findByUsername('manuelflorez')
    expect(result).toBe(null)
  })

  test('findByUsername', async() => {
    const memoryRepository = new MemoryUserRepository()
    await memoryRepository.save({
      id: 0, username: 'manuelflorez',password: '123456789'})  
    const result = await memoryRepository.findByUsername('manuelflorez')
    expect(result.id).toBe(1)
    expect(result.username).toBe('manuelflorez')
    expect(result.password).toBe('123456789')
  })

  test('delete', async() => {
    const memoryRepository = new MemoryUserRepository()
    await memoryRepository.save({
      id: 0, username: 'manuelflorez',password: '123456789'})
    const result = await memoryRepository.delete('manuelflorez')
    expect(result.id).toEqual(1)
    expect(result.password).toEqual('123456789')
    expect(result.username).toEqual('manuelflorez')
  })

  test('should return error of delete', async() => {
    const memoryRepository = new MemoryUserRepository()
    try {
      await memoryRepository.delete('manuelflorez')
    } catch (error) {
      expect(error.message).toEqual(`User not found: 'manuelflorez'`)
    }
  })
})