import MemoryRepository from 'src/infrastructure/user/adapters/memory/MemoryUserRepository.js';
import AdapterWeb from "src/infrastructure/user/receivers/apirest/AdapterWeb.js";
import ControllerUser from 'src/domain/user/use-case/ControllerUser.js'
import express from 'express'
import morgan from 'morgan'

export default class Main {
  constructor() {
    this.app = new express()

    this.app.use(express.json())
    this.app.use(morgan('dev'))

    this.UserRepository = new MemoryRepository()

    this.controllerUser = new ControllerUser(this.UserRepository)

    this.adapterWeb = new AdapterWeb(this.app, this.controllerUser)
  }

  run() {
    const port = 3000
    this.app.listen(port, () => { console.log(`Listening on http://localhost:${port}`) })
  }
}

new Main().run()