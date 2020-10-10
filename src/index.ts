import './scss/index.scss'

class Person {
  name: string
  age: number
  constructor(name: string, age: number) {
    this.name = name
    this.age = age
  }
  getMeta() {
    console.log(`Name: ${this.name}; Age: ${this.age}`)
  }
}

const kate = new Person('Kate', 34)
kate.getMeta()
const alex = new Person('Alex', 31)
alex.getMeta()
