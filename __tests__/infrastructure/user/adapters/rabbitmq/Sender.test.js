import Sender from "src/infrastructure/user/adapters/rabbitmq/Sender"

describe('Sender rabbitmq', () => {
  describe('emit test', () => {
    test('should emit event', async () => {
      const channel = {
        assertExchange: async() => { return true },
        assertQueue: async() => { return { queue: 'nameQueue'} },
        bindQueue: async() => {},
        publish: async() => {}
      }
      const exchange = 'domainEvent'
      const sender = new Sender(channel, exchange)
      const msg = { status: 'successful' }
      const routingKey = 'sender'
      sender.emit(msg, routingKey)
    })
  })
})