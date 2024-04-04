import ExceptionUser from "src/domain/user/exceptions/ExceptionUser.js"

export default class User {
  constructor(id, username, password) {
    if(!username) {
      throw new ExceptionUser(`User need a username: ${username}`)
    }
    if(!password) {
      throw new ExceptionUser(`User need a password: ${password}`)
    }
    if(typeof id !== 'number') {
      throw new ExceptionUser(`User need a id number: ${id}`)
    }
    if(username.length < 5) {
      throw new ExceptionUser(`User need a username with more than 4 characters: ${username}`)
    }
    if(password.length < 7) {
      throw new ExceptionUser(`User need a password with more than 6 characters: ${password}`)
    }
    this.username = username
    this.password = password
    this.id = id
  }
}
