const express=require('express');
const ProductService = require('../services/productService')


const router=express.Router();
const service = new ProductService()


router.get('/',(req,res)=>{
    const products = service.find();
    res.status(200).json(products);
});

router.get('/filter', (req,res)=> {res.send('Yo soy un filter')});

router.get('/:id',(req,res)=>{
    const{id}=req.params;
    const products = service.findOne(id)
    res.json(products)
});


// metodo post, en ruta original
router.post('/', (req, res) => {
  const body = req.body;
  const newProduct = service.create(body)
  res.status(201).json(newProduct)
});



router.patch('/:id', (req, res) => {
  const {id} = req.params
  const body = req.body;
  const update = service.update(id, body)
  res.json(update);
});



router.delete('/:id', (req, res) => {
  const {id} = req.params
  const del = service.delete(id)
  res.json(del);
});
module.exports=router;
