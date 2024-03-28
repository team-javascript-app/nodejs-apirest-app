import express from 'express';
import {validUser} from './util/validUser.mjs';

const app = express();

const users = [];

const PORT = 3000;

app.use(express.json());

app.get('/:username', (req, res) => {
	const {username} = req.params;
  res.send(`Hola ${username}`);
});

app.get('/', (_req, res) => {
  res.send(users);
});

app.post('/', (req, res) => {
  try {
    validUser(req.body, users);
    users.push({
      user: req.body.user.toUpperCase(),
      password: req.body.password
    });
    res.send({
      status: 'sucessful',
      message: `Usuario '${req.body.user}' registrado`
    });
  } catch(error) {
    res.status(404)
    res.send({
      status: 'faild',
      message: `datos ingresados erroneos: ${error.message}`
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
