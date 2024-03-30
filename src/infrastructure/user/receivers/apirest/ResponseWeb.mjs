export default class ResposeWeb {
  constructor() {}

  ok(res, data) {
    res.send({ status: 'successful', data })
  }

  error(res, error) {
    res.status(500)
    res.send({ status: 'failed', message: error.message })
  }

}