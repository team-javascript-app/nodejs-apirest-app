import UserRepository from "src/infrastructure/user/adapters/postgresql/UserRepository.js";
import AdapterWeb from "src/infrastructure/user/receivers/apirest/AdapterWeb.js";
import ControllerUser from 'src/domain/user/use-case/ControllerUser.js'
import express from 'express'
import morgan from 'morgan'

export default class Main {
  constructor() {
    this.PORT = process.env.PORT || 3000
    this.app = new express()
    this.app.use(express.json())
    this.app.use(morgan('dev'))
    this.userRepository = new UserRepository()
    this.controllerUser = new ControllerUser(this.userRepository)
    this.adapterWeb = new AdapterWeb(this.app, this.controllerUser)
  }
}