import ControllerTraceability from "src/domain/user/use-case/ControllerTraceability"

describe('ControllerTraceability test of use-case', () => {
  describe('emit test', () => {
    test('should successful', async () => {
      const sender = { emit: async() => {} }
      const controllerTraceability = new ControllerTraceability(sender)

      controllerTraceability.emit({ status: 'Hello World!'}, 'test')
    })
  })
  describe('emitError test', () => {
    test('should successful', async () => {
      const sender = { emit: async() => {} }
      const controllerTraceability = new ControllerTraceability(sender)

      controllerTraceability.emitError({ status: 'failed'}, 'test')
    })
  })
})