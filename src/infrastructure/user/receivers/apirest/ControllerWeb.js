import User from 'src/domain/user/entities/User.js'
import ResposeWeb from "./ResponseWeb.js";

import { Router } from "express";

export default class ControllerWeb {
  constructor(controllerUser) {
    this.controllerUser = controllerUser
    this.response = new ResposeWeb()
    this.router = Router();

    this.findAll()
    this.create()
    this.update()
    this.delete()
    this.findByUsername()
  }

  findAll() {
    const ctrFindAll = async(res) => {
      try {
        const users = await this.controllerUser.findAll()
        this.response.ok(res, {users})
      } catch (error) {
        this.response.error(res, error)
      }
    }

    this.router.get('/', (req, res) => { ctrFindAll(res) })
  }

  create() {
    const ctrCreate = async(req, res) => {
      try {
        const user = new User(0, req.body?.username, req.body?.password)
        const userResul = await this.controllerUser.create(user)
        this.response.ok(res, {user:userResul})
      } catch (error) {
        if(error.name === 'ExceptionUser') {
          this.response.error404(res, error)
        } else {
          this.response.error(res, error)
        }
      }
    }

    this.router.post('/', (req, res) => { ctrCreate(req, res) })
  }

  findByUsername() {
    const ctrfindByUsername = async(req, res) => {
      try {
        const {username} = req.params
        const user = await this.controllerUser.findByUsername(username)
        this.response.ok(res, {user})
      } catch (error) {
        this.response.error(res, error)
      }
    }

    this.router.get('/:username', (req, res) => { ctrfindByUsername(req, res) })
  }

  update() {
    const ctrUpdate = async(req, res) => {
      try {
        const usernameReq = req.params.username
        const {id, username, password} = req.body
        const user = new User(id, username, password)
        const userResult = await this.controllerUser.update(usernameReq, user)
        this.response.ok(res, {user:userResult})
      } catch (error) {
        this.response.error(res, error)
      }
    }

    this.router.put('/:username', (req, res) => { ctrUpdate(req, res) })
  }

  delete() {
    const ctrDelete = async(req, res) => {
      try {
        const {username} = req.params
        const user = await this.controllerUser.deleteUasername(username)
        this.response.ok(res, {user})
      } catch (error) {
        this.response.error(res, error)
      }
    }

    this.router.delete('/:username', (req, res) => { ctrDelete(req, res) })
  }
}
