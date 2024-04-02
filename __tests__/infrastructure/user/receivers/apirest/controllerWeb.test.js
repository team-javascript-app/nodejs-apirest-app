import {describe, test, expect} from '@jest/globals'
import request from 'supertest'
import express from 'express'

import ControllerWeb from 'src/infrastructure/user/receivers/apirest/ControllerWeb.js'
import ExceptionUser from 'src/domain/user/exceptions/ExceptionUser.js'
import User from 'src/domain/user/entities/User.js'

describe('class ControllerWeb', () => {
  describe('Get /api/vi/user', () => {

    test('should returns Array empty', async () => {
      const controllerWeb = new ControllerWeb({ findAll: () => Promise.resolve([]) })
      const app = express()
      app.use('/user', controllerWeb.router)
      const response = await request(app).get('/user')
      expect(response.headers['content-type']).toBe('application/json; charset=utf-8')
      expect(response.headers['content-length']).toBe('43')
      expect(response.body.status).toEqual('successful')
      expect(Array.isArray(response.body.data.users)).toEqual(true)
      expect(response.status).toBe(200)      
    })

    test('should returns ExceptionUser when create a User', async () => {
      const controllerWeb = new ControllerWeb()
      const app = express()
      app.use('/user', controllerWeb.router)
      const response = await request(app).post('/user').send({})
      expect(response.headers['content-type']).toBe('application/json; charset=utf-8')
      expect(response.headers['content-length']).toBe('58')
      expect(response.body.message).toBe(`User need a username: undefined`)
      expect(response.body.status).toEqual(404)
      expect(response.status).toBe(404)
    })
  
  })
})