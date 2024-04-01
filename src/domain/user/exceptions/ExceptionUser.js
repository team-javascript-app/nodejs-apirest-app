export default class ExceptionUser extends Error {
  constructor(message) {
    super(message)
    this.name = 'ExceptionUser'
  }
}