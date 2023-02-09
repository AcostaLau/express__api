const products_router = require('./productsRouter')
const user_router = require('./userRouter')


const express = require('express')

function routerApi( app){
    const router = express.Router()
    app.use('/API/v1', router)
    router.use('/products', products_router)
    router.use('/user', user_router)
}



module.exports = routerApi
