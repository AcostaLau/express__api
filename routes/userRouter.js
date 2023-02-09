const express = require('express')
const userService = require('../services/userService')



const router = express.Router()
const service = new userService()

router.get('/', (req, res) => {

  const users = service.find()

  res.status(200).json(users)
})

router.get('/:id', (req, res)=> {
  const {id} = req.params()
  const user = service.findOne(id)
  res.status(200).json(user)
})
// post
router.post('/', (req, res) => {
  const body = req.body;
  const newUser = service.create(body)
  res.status(201).json(newUser)
})

router.patch('/:id', (req, res) => {
    const {id} = req.params;
    const body = req.body;
    const update = service.update(id, body)
    res.json(update)
})

router.delete('/:id', (res, req) => {
    const { id } = req.params;
    const del = service.delete(id)
    res.json(del)
})


module.exports = router
