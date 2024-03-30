export default class User {
  constructor(id, username, password) {
    if(!username) {
      throw Error(`User need a username: ${username}`)
    }
    if(!password) {
      throw Error(`User need a password: ${password}`)
    }
    if(typeof id !== 'number') {
      throw Error(`User need a id: ${id}`)
    }
    if(username.length < 4) {
      throw Error(`User need a username with more than 4 characters: ${username}`)
    }
    if(password.length < 6) {
      throw Error(`User need a password with more than 6 characters: ${password}`)
    }
    this.username = username
    this.password = password
    this.id = id
  }
}