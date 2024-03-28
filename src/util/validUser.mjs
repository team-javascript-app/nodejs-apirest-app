/** @typedef Customer
 *  @type {Object}
 *  @property {string} user - the username.
 *  @property {string} password - the password.
 */

/**
 * @param {Customer} customer
 * @param {Array<Customer>} users
 */
const validUser = ({user, password}, users) => {
  if (!user) throw Error(`El valor user no puede ser vacio: '${user}'`);
  if (!password) throw Error(`El valor password no puede ser vacio '${password}'`);
  if (user.length < 3) throw Error(`El valor de user debe ser mayor de 3 caracteres: ${user}`);
  if (password.length < 3) throw Error(`El valor de password debe ser mayor a 3 caracteres: ${password}`);
  
  for(let i=0; i<users.length ;i++) {
    if (users[i].user === user.toUpperCase()) {
      throw Error(`El usuario '${user}' ya se encuentra registrado`);
    }
  }
};

/**
 * @param {Array<Customer>} users
 * @param {string} user
 */
const findUser = (users, user) => {
	if(!user) return null;
  for(let i=users.length - 1; i>=0 ;i--) {
    if(users[i].user === user.toUpperCase()) {
      return users[i];
    }
  }
	return null;
};

/**
 * @param {Customer} customer
 * @param {Array<Customer>} users
 */
const addNewUser = ({user, password}, users) => {
  users.push({user:user.toUpperCase(), password});
};

/**
 * @param {string} message
 */
const responseSuccessful = (message) => {
  return { status: 'successful', message };
};

/**
 * @param {string} message
 */
const responseFaild404 = (message) => {
  return { status: 'faild', message };
};

export {
  validUser,
  findUser,
  addNewUser,
  responseSuccessful,
  responseFaild404
}
