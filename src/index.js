import Main from './application/Main.js'

const main = new Main()

main.app.listen(
  main.PORT,
  () => { 
    console.log(`Listening on http://localhost:${main.PORT}`) 
  }
)
  