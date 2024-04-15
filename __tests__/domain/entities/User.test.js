import {describe, test, expect} from '@jest/globals'
import User from 'src/domain/user/entities/User'

describe('User', () => {
  test('should error when User need a password', () => {
    try {
      new User(1, 'manu')
    } catch (error) {
      expect(error.message).toEqual(`User need a password: undefined`)
    }
  })

  test('should error when User need a password', () => {
    try {
      new User('1', 'manu', 'pass')
    } catch (error) {
      expect(error.message).toEqual(`User need a id number: 1`)
    }
  })
  
  test('should error when User need a username with more than 4 characters',
    () => {
    try {
      new User(1, 'manu', 'pass')
    } catch (error) {
      const result = `User need a username with more than 4 characters: manu`
      expect(error.message).toEqual(result)
    }
  })

  test('should error when User need a username with more than 4 characters',
    () => {
    try {
      new User(1, 'manuel', 'pass')
    } catch (error) {
      const result = `User need a password with more than 6 characters: pass`
      expect(error.message).toEqual(result)
    }
  })

  test('should string when use toString method', () => {
    const user = new User(1, 'manuel', 'password')
    expect(user.toString()).toBe('id: 1, username: manuel, password: password')
  })

})