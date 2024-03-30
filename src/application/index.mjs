import express from 'express'
import morgan from 'morgan'

import ControllerUser from '../domain/user/use-case/ControllerUser.mjs';

import MemoryRepository from '../infrastructure/user/adapters/memory/MemoryUserRepository.mjs';
import AdapterWeb from "../infrastructure/user/receivers/apirest/AdapterWeb.mjs";

class Main {
  constructor() {
    this.app = new express()

    this.app.use(express.json())
    this.app.use(morgan('dev'))

    this.UserRepository = new MemoryRepository()

    this.controllerUser = new ControllerUser(this.UserRepository)

    this.adapterWeb = new AdapterWeb(this.app, this.controllerUser)
  }

  run(port) {
    this.app.listen(port, () => { console.log(`Listening on http://localhost:${port}`) })
  }
}

const main = new Main()

const PORT = 3000

main.run(PORT)