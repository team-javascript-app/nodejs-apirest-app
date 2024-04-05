import UserRepository from "src/infrastructure/user/adapters/postgresql/UserRepository.js";
import AdapterWeb from "src/infrastructure/user/receivers/apirest/AdapterWeb.js";
import ControllerUser from 'src/domain/user/use-case/ControllerUser.js'
import express from 'express'
import morgan from 'morgan'
import pg from 'pg'

export default class Main {
  constructor() {
    this.init().then(async app => {
      const client = await this.getPostgresqlConnet()
      this.userRepository = new UserRepository(client)
      this.controllerUser = new ControllerUser(this.userRepository)
      this.adapterWeb = new AdapterWeb(app, this.controllerUser)
    })
  }

  async init() {
    this.PORT = process.env.PORT || 3000
    this.app = new express()
    this.app.use(express.json())
    this.app.use(morgan('dev'))
    return Promise.resolve(this.app)
  }

  async getPostgresqlConnet() {
    const client = new pg.Client({
      user: 'userapp',
      host: 'localhost',
      database: 'app',
      password: 'passwordapp',
      port: 5432
    })
    await client.connect()
    return client
  }
}