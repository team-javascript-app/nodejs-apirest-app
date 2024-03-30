export default class MemoryUserRepository {
  constructor() {
    this.users = []
    this.idAutoIncrement = 0
  }

  async findAll() {
    return Promise.resolve(this.users)
  }

  async save(user) {
    if(user.id === 0) {
      user.id = ++this.idAutoIncrement
      this.users.push(user)
      return Promise.resolve(user)
    }
    for(let i=this.users.length-1;i>=0;i--) {
      if (this.users[i].id === user.id) {
        this.users[i] = user
        return Promise.resolve(this.users[i])
      }
    }
    throw Error(`User not found: '${username}'`)
  }

  async findByUsername(username) {
    for(let i=this.users.length-1;i>=0;i--) {
      if (this.users[i].username===username) {
        return Promise.resolve(this.users[i])
      }
    }
    return Promise.resolve(null)
  }

  async delete(username) {
    for(let i=this.users.length-1;i>=0;i--) {
      if (this.users[i].username === username) {
        const user = this.users[i]
        delete this.users[i]
        this.users = this.users.flat()
        return Promise.resolve(user)
      }
    }
    throw Error(`User not found: '${username}'`)
  }

}