import app from '../../../../../src/infrastructure/user/receivers/apirest/web.mjs';

const PORT = 3000

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`)
})