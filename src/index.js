import Main from './application/Main.js'

const main = new Main()

const callback =()=>{console.log(`Listening on http://localhost:${main.PORT}`)}

main.app.listen(main.PORT, callback)
  