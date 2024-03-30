import User from "../entities/User.mjs"

export default class IRepository {
  save
  deleteUser
  findAll
  findByUsername
   /**
   * @param {Object} contrat
   * @param {Function} contrat.save
   * @param {Function} contrat.deleteUser
   * @param {Function} contrat.findAll
   * @param {Function} contrat.findByUsername
   */
  constructor(contrat) {
    this.#initMethodSave(contrat.save)
    this.#initMethodDeleteUser(contrat.deleteUser)
    this.#initMethodFindAll(contrat.findAll)
    this.#initMethodFindByUsername(contrat.findByUsername)
  }
  /**
   * @param {Function} save 
   */
  #initMethodSave(save) {
    this.save = this.#isFunction(save) ? save : this.#Default('save')
  }
  /**
   * @param {Function} deleteUser 
   */
  #initMethodDeleteUser(deleteUser) {
    this.deleteUser = this.#isFunction(deleteUser) ? deleteUser : this.#Default('save')
  }
  /**
   * @param {Function} findAll 
   */
  #initMethodFindAll(findAll) {
    this.findAll = this.#isFunction(findAll) ? findAll : this.#Default('save')
  }
  /**
   * @param {Function} findByUsername 
   */
  #initMethodFindByUsername(findByUsername) {
    this.findByUsername = this.#isFunction(findByUsername) ? findByUsername : this.#Default('save')
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
   * @function save
   * @param {Object} user
   * @param {number} user.id
   * @param {string} user.username
   * @param {string} user.password
   * @returns {Promise<User>}
   */
  get save() { this.save }
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
   * @returns {Promise<User>}
   */
  get findAll() { this.findAll }
  /**
   * @async
   * @function findByUsername
   * @param {string} username
   * @returns {Promise<Array<User>>}
   */
  get findByUsername() { this.findByUsername }
}