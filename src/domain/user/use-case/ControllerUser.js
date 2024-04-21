export default class ControllerUser {
  constructor(userRepository, traceability) {
    this.userRepository = userRepository
    this.traceability = traceability
    this.routingKey = 'user.service'
  }

  async findAll() {
    const message = { method: 'findAll' }
    try {
      const users = await this.userRepository.findAll()
      message.data = users
      await this.traceability.emit(message, this.routingKey)
      return users
    } catch (error) {
      message.error = error
      this.traceability.emitError(message)
      throw error
    }
  }

  async create(user) {
    const userFind = await this.findByUsername(user.username)
    if (userFind) {
      throw Error(`User is register: '${user.username}'`)
    }
    return this.userRepository.save(user)
  }

  async findByUsername(username) {
    return this.userRepository.findByUsername(username)
  }

  async update(username, user) {
    const userFind = await this.findByUsername(username)
    if(!userFind) {
      throw Error(`User not found: '${username}'`)
    }
    return this.userRepository.save(user)
  }

  async deleteUasername(username) {
    return this.userRepository.delete(username)
  }
}