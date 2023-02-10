const { faker } = require('@faker-js/faker');
// manejamos errores
const boom = require('@hapi/boom')

class ProductsService  {
    constructor(){
      this.products = [];
      this.generate()
    }

    generate(){

      const limit= 100;

      for(let index=0; index < limit; index++){
      this.products.push({
        id: faker.datatype.uuid(),
        name:faker.commerce.productName(),
        price:parseInt(faker.commerce.price(),10),
        image:faker.image.imageUrl(),
        isBlock: faker.datatype.boolean()
      });
  }
    }

    create(data){
      const newProduct = {
        id: faker.datatype.uuid(),
        ...data
      }
      this.products.push(newProduct)
      return newProduct
    }

    find(){
      return this.products;
    }

    findOne(id){
      const product = this.products.find(item => item.id === id)
      if (!product){
        throw boom.notFound('Product not Found')
      }
      if(product.isBlock){
        throw boom.conflict('product is block')
      }
      else{
        return product
      }
    }

    update(id, body){
        const index = this.products.findIndex(product => product.id === id)

        if (index === -1){

            throw boom.notFound('Product not Found')

        }else{
          const products = this.products[index]
          this.products[index] = {
            ...products,
            ...body
          }
          return this.products[index]
        }
    }

    delete(id){
      const index = this.products.findIndex(product => product.id === id)

      if(id === -1){
        throw boom.notFound('Pododuct not found')
      }else{
        this.products.shift(index, 1)
      }
      return {id}
    }
}

module.exports = ProductsService;
