import {describe, test, expect} from '@jest/globals'
import request from 'supertest'
import express from 'express'

import ControllerWeb from 'src/infrastructure/user/receivers/apirest/ControllerWeb.js'

describe('class ControllerWeb', () => {
  describe('Get /api/v1/user', () => {

    test('should returns Array empty', async () => {
      const controllerWeb = new ControllerWeb({ findAll:
        () => Promise.resolve([]) })
      const app = express()
      app.use(express.json())
      app.use('/user', controllerWeb.router)
      const response = await request(app).get('/user')
      expect(response.headers['content-type'])
        .toBe('application/json; charset=utf-8')
      expect(response.headers['content-length']).toBe('43')
      expect(response.body.status).toEqual('successful')
      expect(Array.isArray(response.body.data.users)).toEqual(true)
      expect(response.status).toBe(200)      
    })

    test('should return error', async()=> {
      const controllerWeb = new ControllerWeb({ findAll:
        ()=> {throw Error('return failed') } })
      const app = express()
      app.use(express.json())
      app.use('/user', controllerWeb.router)
      const response = await request(app).get('/user')
      expect(response.headers['content-type'])
        .toBe('application/json; charset=utf-8')
        expect(response.headers['content-length']).toBe('45')
      expect(response.body.status).toEqual('failed')
      expect(response.body.message).toEqual('return failed')
      expect(response.status).toBe(500)
    })

    test('should return a user by username', async () => {
      const controllerWeb = new ControllerWeb({ findByUsername:
        (username) => Promise.resolve({
          id: 1, username, password: '123456789'
        })
      })
      const app = express()
      app.use(express.json())
      app.use('/user', controllerWeb.router)
      const response = await request(app).get('/user/manuelflorewz')
      expect(response.headers['content-type'])
        .toBe('application/json; charset=utf-8')
      expect(response.headers['content-length']).toBe('98')
      expect(response.body.status).toEqual('successful')
      const result = {
        id: 1, username: 'manuelflorewz', password: '123456789'
      }
      expect(response.body.data.user).toEqual(result)
    })

  })

  describe('POST /api/v1/user', () => {

    test('should returns ExceptionUser when create a User', async () => {
      const controllerWeb = new ControllerWeb()
      const app = express()
      app.use(express.json())
      app.use('/user', controllerWeb.router)
      const response = await request(app).post('/user').send({})
      expect(response.headers['content-type'])
        .toBe('application/json; charset=utf-8')
      expect(response.headers['content-length']).toBe('58')
      expect(response.body.message).toBe(`User need a username: undefined`)
      expect(response.body.status).toEqual(404)
      expect(response.status).toBe(404)
    })

    test('should return user when create successful a User', async () => {
      const controllerWeb = new ControllerWeb({ create: (user) => {
        user.id = 1
        return Promise.resolve(user) }
      })
      const app = express()
      app.use(express.json())
      app.use('/user', controllerWeb.router)
      const payload = { username: 'Manuel', password: '12345678' }
      const response = await request(app).post('/user').send(payload)
      expect(response.headers['content-type'])
        .toBe('application/json; charset=utf-8')
      expect(response.headers['content-length']).toBe('90')
      const result = { id: 1, username: 'Manuel', password: '12345678' }
      expect(response.body.data.user).toEqual(result)
      expect(response.body.status).toEqual('successful')
      expect(response.status).toBe(200)
    })
  })

  describe('PUT /api/v1/user', () => {
    test('shoul return user when update a user', async () => {
      const controllerWeb = new ControllerWeb({ update: (username) => {
        return {
          id: 1,
          username,
          password: '12345678' 
        }
      }})
      const app = express()
      app.use(express.json())
      app.use('/user', controllerWeb.router)
      const payload = {
        id: 1, username: 'manuelflorezw', password: '12345678' }
      const response = await request(app).put('/user/manuelflorezw')
        .send(payload)
      expect(response.headers['content-type'])
        .toBe('application/json; charset=utf-8')
      expect(response.headers['content-length']).toBe('97')
      const result = { id: 1, username: 'manuelflorezw', password: '12345678' }
      expect(response.body.data.user).toEqual(result)
      expect(response.body.status).toEqual('successful')
      expect(response.status).toBe(200)
    })
  
    test('should return error when update a user without username',async() => {
      const controllerWeb = new ControllerWeb({ update: (username) => {
          throw Error(`User not found: '${username}'`)
        }})
      const app = express()
      app.use(express.json())
      app.use('/user', controllerWeb.router)
      const payload = {
        id: 1, username: 'manuelflorezw', password: '12345678' }
      const response = await request(app).put('/user/manuelflorezw')
        .send(payload)
      expect(response.headers['content-type'])
        .toBe('application/json; charset=utf-8')
      expect(response.headers['content-length']).toBe('63')
      expect(response.body.status).toEqual('failed')
      expect(response.body.message).toEqual(`User not found: 'manuelflorezw'`)
      expect(response.status).toBe(500)
    })
  })

  describe('DELETE /api/v1/user', () => {
    test('should return user when delete by username', async() => {
      const controllerWeb = new ControllerWeb({ deleteUasername: (username) => {
        return { id: 1, username, password: '123456789' }
      }})
      const app = express()
      app.use(express.json())
      app.use('/user', controllerWeb.router)
      const response = await request(app).delete('/user/manuelflorezw')
      expect(response.headers['content-type'])
        .toBe('application/json; charset=utf-8')
      expect(response.headers['content-length']).toBe('98')
      const result = { id: 1, username: 'manuelflorezw', password: '123456789' }
      expect(response.body.data.user).toEqual(result)
      expect(response.body.status).toEqual('successful')
      expect(response.status).toBe(200)
    })

    test('should return a error when try delete user', async() => {
      const controllerWeb = new ControllerWeb({ deleteUasername: (username) => {
        throw Error(`User not found: '${username}'`)
      }})
      const app = express()
      app.use(express.json())
      app.use('/user', controllerWeb.router)
      const response = await request(app).delete('/user/manuelflorezw')
      expect(response.headers['content-type'])
        .toBe('application/json; charset=utf-8')
      expect(response.headers['content-length']).toBe('63')
      expect(response.body.status).toEqual('failed')
      expect(response.body.message).toEqual(`User not found: 'manuelflorezw'`)
      expect(response.status).toBe(500)
    })
  }) 

})
