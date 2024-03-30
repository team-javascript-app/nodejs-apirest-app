import { Router } from "express";
import ResposeWeb from "./ResponseWeb.mjs";
import User from "../../../../domain/user/entities/User.mjs";

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
    this.router.get('/', async (req, res) => {
      try {
        const users = await this.controllerUser.findAll()
        this.response.ok(res, {users})
      } catch (error) {
        this.response.error(res, error)
      }
    })
  }

  create() {
    this.router.post('/', async (req, res) => {
      try {
        const {username, password} = req.body
        const user = new User(0, username, password)
        const userResul = await this.controllerUser.create(user)
        this.response.ok(res, {user:userResul})
      } catch (error) {
        this.response.error(res, error)
      }
    })
  }

  findByUsername() {
    this.router.get('/:username', async (req, res) => {
      try {
        const {username} = req.params
        const user = await this.controllerUser.findByUsername(username)
        this.response.ok(res, {user})
      } catch (error) {
        this.response.error(res, error)
      }
    })
  }

  update() {
    this.router.put('/:username', async (req, res) => {
      try {
        const usernameReq = req.params.username
        const {username, password} = req.body
        const user = {username, password}
        const userResult = await this.controllerUser.update(usernameReq, user)
        this.response.ok(res, {user:userResult})
      } catch (error) {
        this.response.error(res, error)
      }
    })
  }

  delete() {
    this.router.delete('/:username', async (req, res) => {
      try {
        const {username} = req.params
        const user = await this.controllerUser.delete(username)
        this.response.ok(res, {user})
      } catch (error) {
        this.response.error(res, error)
      }
    })
  }

}