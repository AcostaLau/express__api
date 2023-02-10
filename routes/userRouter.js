const express = require('express')
const {createUserSchemam, getUserSchema, updateUserSchema} = require('../schemas/userSchema')
const validatorHandler = require('../middlewares/validatorHandler')
const userService = require('../services/userService')



const router = express.Router()
const service = new userService()

router.get('/', async (req, res) => {

  const users = await service.find()

  res.status(200).json(users)
})

router.get('/:id', validatorHandler(getUserSchema, 'params'),
async (req, res, next)=> {
  try{
    const { id } =req.params;
    const user = await service.findOne(id)
    res.json(user)
  }catch(e){
    next(e)
  }
})
// post
router.post('/', validatorHandler(createUserSchemam, 'body'), async (req, res, next) => {
  try{
    const body = req.body;
    const newUser = await service.create(body)
    res.status(201).json(newUser)
  }catch(e){
    next(e)
  }

})

router.patch('/:id', validatorHandler(updateUserSchema, 'body'), validatorHandler(getUserSchema, 'params'), async (req, res, next) => {
  try{
    const { id } = req.params;
    const body = req.body;
    const update = await service.update(id, body)
    res.json(update)
  }catch(error){
    next(error)
  }


})

router.delete('/:id', async (res, req) => {

  try{
    const { id } = req.params;
    const del = await service.delete(id)
    res.json(del)
  }catch(error){
    res.status(404).json({
      message: error.message
    })
  }

})


module.exports = router
