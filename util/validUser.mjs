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

export { 
	validUser
}
