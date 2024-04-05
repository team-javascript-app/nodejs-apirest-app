import pg from 'pg'

export default class UserRepository {
  constructor() { }

  async connet() {
    this.client = new pg.Client({
      user: 'userapp',
      host: 'localhost',
      database: 'app',
      password: 'passwordapp',
      port: 5432
    })
    await this.client.connect()
  }

  async close() {
    try {
      this.client.end()
    } catch (error) {
      throw error
    }
  }

  async findAll() {
    try {
      const res = await this.client.query(`SELECT * FROM users`)
      return Promise.resolve(res.rows.map(this.mapperUser))
    } catch (error) {
      throw error
    }
  }

  async save(user) {
    try {
      if (user.id === 0) {
        const query = `INSERT INTO users (user_username, user_password)
        VALUES ('${user.username}', '${user.password}')`
        await this.client.query(query)
        return await this.findByUsername(user.username)
      }
      const query = `UPDATE users
      SET user_username = '${user.username}', user_password = '${user.password}'
      WHERE user_id = ${user.id}`
      await this.client.query(query)
      return this.findByUsername(user.username)
    } catch (error) {
      throw error
    }
  }

  mapperUser(obj) {
    return {
      id: obj.user_id,
      username: obj.user_username,
      password: obj.user_password
    }
  }

  async findByUsername(username) {
    try {
      const query = `SELECT * FROM users WHERE user_username = '${username}'`
      const res = await this.client.query(query)
      return this.mapperUser(res.rows[0]) 
    } catch (error) {
      throw error
    }
  }

  async delete(username) {
    try {
      const user = await this.findByUsername(username)
      await this.client.query(`DELETE fROM users WHERE user_username = '${username}'`)
      return Promise.resolve(user)
    } catch (error) {
      throw error
    }
  }

}