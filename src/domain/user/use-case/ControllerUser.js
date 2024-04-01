export default class ControllerUser {
  constructor(userRepository) {
    this.userRepository = userRepository
  }

  async findAll() {
    return this.userRepository.findAll()
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

  async delete(username) {
    return this.userRepository.delete(username)
  }
}