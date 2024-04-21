export default class Sender {
  constructor(channel, exchange) {
    this.channel = channel
    this.exchange = exchange
  }

  async emit(msg, routingKey) {
    await this.channel.assertExchange(
      this.exchange,
      'direct',
      { durable: false })

    const message = JSON.stringify(msg)

    const assertQueue = await this.channel.assertQueue(
      `${routingKey}.sender`,
      { durable: true }
    )

    await this.channel.bindQueue(assertQueue.queue, this.exchange, routingKey)

    await this.channel.publish(
      this.exchange,
      routingKey,
      Buffer.from(message))

    //console.log(" [x] Sent %s: '%s'", routingKey, msg);
  }
}