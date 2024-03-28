import express from 'express';
import {
  addNewUser,
	findUser,
  validUser,
  responseFaild404,
  responseSuccessful
}
from './util/validUser.mjs';

const app = express();

const users = [];

const PORT = 3000;

app.use(express.json());

const NO_FIND_USER_ERROR = 'No se encontro user: ';

app.get('/:username', (req, res) => {
  const { username } = req.params;
  const user = findUser(users, username);
  if(user) {
    const result = { data: user };
    res.send(result);
  } else {
    res.status(404);
    const message = `${NO_FIND_USER_ERROR}'${req.params.username}'`;
    const response = responseFaild404(message);
    res.send(response);
  }
});

app.get('/', (_req, res) => {
	const result = { data: users };
  res.send(result);
});

app.post('/', (req, res) => {
  const user = {
    user: req.body.user,
    password: req.body.password
  };
  try {
    validUser(user, users);
    addNewUser(user, users);
    const message = `Usuario '${user.user}' registrado`;
		const result = responseSuccessful(message);
    res.send(result);
  } catch(error) {
    res.status(404)
    const message = `datos ingresados erroneos: ${error.message}`;
    const result = responseFaild404(message);
    res.send(result);
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
