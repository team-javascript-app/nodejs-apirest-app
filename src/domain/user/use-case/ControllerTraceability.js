const APP_NAME = process.env.APP_NAME
const ROUTINGKEY_ERROR = 'error'
const STATUS = {
  SUCCESSFUL: 'successful',
  FAILED: 'failed'
}

export default class ControllerTraceability {

  constructor(sender) {
    this.sender = sender
  }

  emitError(message) {
    const routingKey = ROUTINGKEY_ERROR
    message.service = APP_NAME
    message.status = STATUS.FAILED
    this.sender.emit(message, routingKey)
  }

  emit(message, routingKey) {
    message.service = APP_NAME
    message.status = STATUS.SUCCESSFUL
    this.sender.emit(message, routingKey)
  }

}