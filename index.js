const express = require('express')
const routerApi = require('./routes/index')
const {logErrors, errorHandler, boomErrorHandler} = require('./middlewares/errorHandler')
const cors = require('cors');




const app = express();
const port = 3000;



// para que pueda capturar el valor del json que se envia con el post en productsRouter
app.use(express.json())


// middleware cors para que habilite o desabilite el acceso
const whitelist = ['http://localhost:8080', 'https://myapp.co']
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin)){
      callback(null, true)
    }else{
      callback(new Error('No tienes acceso'))
    }
  }
}
app.use(cors(options));


app.get('/', (req, res) => {
  res.send('Hola Mi server en express')
})


// ruta de api
routerApi(app)


// middlewares
app.use(logErrors)
app.use(errorHandler)
app.use(errorHandler)


app.listen(port, () => {
  console.log(`Mi puerto: ${port}`)
})

