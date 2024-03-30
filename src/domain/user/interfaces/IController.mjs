import User from "../entities/User.mjs"

export default class Icontroller {
  create
  update
  deleteUser
  findAll
  findByUsername
  /**
   * 
   * @param {Object} contrat
   * @param {Function} contrat.create
   * @param {Function} contrat.update
   * @param {Function} contrat.deleteUser
   * @param {Function} contrat.findAll
   * @param {Function} contrat.findByUsername
   */
  constructor(contrat) {
    this.#initMethodCreate(contrat.create)
    this.#initMethodUpdate(contrat.update)
    this.#initMethodDelete(contrat.deleteUser)
    this.#initMethodFindAll(contrat.findAll)
    this.#initMethodFindByUsername(contrat.findByUsername)
  }
  /**
   * 
   * @param {Function} create 
   */
  #initMethodCreate(create) {
    this.create = this.#isFunction(create) ? create : this.#Default('create')
  }
  /**
   * 
   * @param {Function} create 
   */
  #initMethodUpdate(update) {
    this.update = this.#isFunction(update) ? update : this.#Default('update')
  }
  /**
   * 
   * @param {Function} create 
   */
  #initMethodDelete(deleteUser) {
    this.deleteUser = this.#isFunction(deleteUser) ? deleteUser : this.#Default('deleteUser')
  }
  /**
   * 
   * @param {Function} create 
   */
  #initMethodFindAll(findAll) {
    this.findAll = this.#isFunction(findAll) ? findAll : this.#Default('findAll')
  }
  /**
   * 
   * @param {Function} create 
   */
  #initMethodFindByUsername(findByUsername) {
    this.findByUsername = this.#isFunction(findByUsername) ? findByUsername : this.#Default('findByUsername')
  }
  /**
   * is a Funtion ? true : false
   * @param {Function} method 
   * @returns {boolean}
   */
  #isFunction(method) { return typeof method === 'function' }
  /**
   * Function for default
   * @param {string} methodName 
   * @returns {Function}
   */
  #Default(methodName) { return () => { throw Error(`method ${methodName} no implement`) }}
  /**
   * @async
   * @function create
   * @param {Object} user
   * @param {number} user.id
   * @param {string} user.username
   * @param {string} user.password
   * @returns {Promise<User>}
   */
  get create() { this.create }
  /**
   * @async
   * @function update
   * @param {string} username
   * @param {Object} user
   * @param {string} user.username
   * @param {string} user.password
   * @returns {Promise<User>}
   */
  get update() { this.update }
  /**
   * @async
   * @function deleteUser
   * @param {string} username
   * @returns {Promise<User>}
   */
  get deleteUser() { this.deleteUser }
  /**
   * @async
   * @function findAll
   * @returns {Promise<Array<User>>}
   */
  get findAll() { this.findAll }
  /**
   * @async
   * @function findByUsername
   * @param {string} username
   * @returns {Promise<User>}
   */
  get findByUsername() { this.findByUsername }
}