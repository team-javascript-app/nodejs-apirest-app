export default class Consumer {
  constructor(channel, exchange, routingKey) {
    this.channel = channel;
    this.exchange = exchange;
    this.routingKey = routingKey;
  }

  async consume() {
    await this.channel.assertExchange(
      this.exchange,
      "direct",
      { durable: false }
    )

    const assertQueue = await this.channel.assertQueue(
      `${this.routingKey}.sender`,
      { exclusive: true }
    )

    await this.channel.bindQueue(assertQueue.queue, exchange, routingKey)

    await this.channel.consume(assertQueue.queue, (msg) => {
      console.log(` [x] %s: '%s'`, msg.fields.routingKey, msg.content.toString())
    })
  }
}
