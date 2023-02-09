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

    find(){
      return this.users;
    }

    findOne(id){
      return this.users.find(item => item.id === id)
    }

    update(id, cambios){
        const index = this.users.findIndex(user => user.id === id)
        if (index === -1){
          throw new Error('User not found')
        }

        const user = this.users[index]
        this.user[index] = {
          ...user,
          ...cambios
        }


        return this.users[index]
    }

    delete(id){
      const index = this.users.findIndex(user => user.id === id)

      if(id === -1){
        throw new Error('User not found')
      }else{
        this.users.shift(index, 1)
      }
      return {id}
    }

    create(data){
      const newUser = {
        id: faker.datatype.uuid(),
        ...data
      }
      this.users.push(newUser)
      return newUser
    }
}


module.exports = UsersService;
