import UserRepository from 'src/infrastructure/user/adapters/postgresql/UserRepository.js'
import ControllerTraceability from 'src/domain/user/use-case/ControllerTraceability.js'
import AdapterWeb from 'src/infrastructure/user/receivers/apirest/AdapterWeb.js'
import Sender from 'src/infrastructure/user/adapters/rabbitmq/Sender.js'
import ControllerUser from 'src/domain/user/use-case/ControllerUser.js'
import express from 'express'
import morgan from 'morgan'
import amqp from 'amqplib'
import pg from 'pg'

export default class Main {
  constructor() {
    this.init().then(async app => {
      this.channel = await this.rabbimq()
      const client = await this.getPostgresqlConnet()
      this.userRepository = new UserRepository(client)
      this.controllerTraceability = await this.getControllerTraceability()
      this.controllerUser = new ControllerUser(this.userRepository, this.controllerTraceability)
      this.adapterWeb = new AdapterWeb(app, this.controllerUser)
    })
  }

  async getControllerTraceability() {
    const exchange = 'domainEvent'
    const sender = new Sender(this.channel, exchange)
    return new ControllerTraceability(sender)
  }

  async rabbimq() {
    const password = process.env.RABBITMQ_PASSWORD
    const host = process.env.RABBITMQ_HOST
    const user = process.env.RABBITMQ_USER
    const port = process.env.RABBITMQ_PORT
    const url = `amqp://${user}:${password}@${host}:${port}`
    const connetion = await amqp.connect(url)
    const channel = await connetion.createChannel()
    return channel
  }

  async init() {
    this.PORT = process.env.EXPRESS_PORT
    this.app = new express()
    this.app.use(express.json())
    const fotmat = process.env.MORGAN_FORMAT
    this.app.use(morgan(fotmat))
    return Promise.resolve(this.app)
  }

  async getPostgresqlConnet() {
    const client = new pg.Client({
      user: process.env.POSTGRESQL_USER,
      host: process.env.POSTGRESQL_HOST,
      database: process.env.POSTGRESQL_DATABASE,
      password: process.env.POSTGRESQL_PASSWORD,
      port: process.env.POSTGRESQL_PORT
    })
    await client.connect()
    return client
  }
}