const { faker } = require('@faker-js/faker');

class UsersService{
    constructor(){
      this.users = [];
      this.generate()
    }
    generate(){
      const limit = 100;
      for (let index = 0; index < limit; index++) {
        this.users.push(
          {
            id: faker.datatype.uuid(),
            nombre: faker.name.firstName(),
            lastName: faker.name.lastName(),
            age: faker.image.imageUrl()
          }
        )
    }
    }

    async find(){
      return this.users;
    }

    async findOne(id){
      return this.users.find(item => item.id === id)
    }

    async update(id, cambios){
        const index = this.users.findIndex(user => user.id === id)
        if (index === -1){
          throw new Error('User not found')
        }

        const newChange = this.users[index];

        this.users[index] = {
          ...newChange,
          ...cambios
        }
        return this.users[index]
    }

    async delete(id){
      const index = this.users.findIndex(user => user.id === id)

      if(id === -1){
        throw new Error('User not found')
      }else{
        this.users.shift(index, 1)
      }
      return {id}
    }

    async create(data){
      const newUser = {
        id: faker.datatype.uuid(),
        ...data
      }
      this.users.push(newUser)
      return newUser
    }
}


module.exports = UsersService;
