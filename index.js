const express = require('express')

const app = express();
const port = 3000;

const routerApi = require('./routes/index')

// para que pueda capturar el valor del json que se envia con el post en productsRouter
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hola Mi server en express')
})


routerApi(app)

app.listen(port, () => {
  console.log(`Mi puerto: ${port}`)
})

