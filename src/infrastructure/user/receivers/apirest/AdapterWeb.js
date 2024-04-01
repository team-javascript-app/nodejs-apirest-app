import ControllerWeb from './ControllerWeb.js';

export default class AdapterWeb {
  constructor(app, controllerUser) {

    const controllerWeb = new ControllerWeb(controllerUser)

    const {router} = controllerWeb

    app.use('/api/v1/user', router)
  }
}