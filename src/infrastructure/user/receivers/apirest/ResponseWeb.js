export default class ResposeWeb {
  constructor() {}

  ok(res, data) {
    res.send({ status: 'successful', data })
  }

  error(res, error) {
    res.status(500)
    res.send({ status: 'failed', message: error.message })
  }

  error404(res, error) {
    res.status(404)
    res.send({ status: 404, message: error.message })
  }

}