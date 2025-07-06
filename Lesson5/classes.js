/* eslint-disable no-unused-vars */
/* eslint-disable max-len */

// Create a class Cat that logs the string I'm a cat! to the console whenever
// a new instance is created. Then instantiate a new instance of Cat and assign
// it to a kitty variable.
// Using the code from the previous exercise, add a parameter to constructor
// that provides a name for the Cat object, and assign this parameter to a
// property called name. If no argument is provided, the name should default
// to Kitty. Then, replace the I'm a cat! message with a greeting that
// includes the provided name.
// Using the code from the previous exercise, move the greeting from the
// constructor method to an instance method named greet that logs a greeting
// to the console when invoked. Additionally, define one more instance method
// named rename that renames a Cat instance when invoked.
// Using the code from the previous question, write any code necessary so that
// the string Hello! I'm a cat! is logged to the console when
// Cat.genericGreeting is invoked.

class Cat {
  static genericGreeting() {
    console.log('Hello! I am a cat');
  }
  constructor(name = 'Kitty') {
    this.name = name;
  }

  greet() {
    console.log('I am a cat! My name is ' + this.name);
  }

  rename(newName) {
    this.name = newName;
  }
}

let kitty = new Cat();


// Create a class Rectangle.

// The constructor should take 2 arguments which represent width and
// length, respectively.

// Implement the class so that the output from the example below is correct.

// let rect = new Rectangle(4, 5);

// console.log(rect.getWidth()); // 4
// console.log(rect.getLength()); // 5
// console.log(rect.getArea()); // 20
// The formula for the rectangle area is: width * length.

class Rectangle {
  constructor(width, length) {
    this.width = width;
    this.length = length;
  }

  getWidth() {
    return this.width;
  }

  getLength() {
    return this.length;
  }

  getArea() {
    return this.length * this.width;
  }
}
let rect = new Rectangle(4, 5);

console.log(rect.getWidth()); // 4
console.log(rect.getLength()); // 5
console.log(rect.getArea()); // 20

// Given the class from the previous problem, write a class called Square
// that inherits from Rectangle, and is used like this:
// let square = new Square(5);
// console.log(`area of square = ${square.getArea()}`); // area of square = 25

class Square extends Rectangle {
  constructor(side) {
    super(side, side);
  }
}
let square = new Square(5);
console.log(`area of square = ${square.getArea()}`); // area of square = 25

// Without calling the Cat constructor, create an object that looks and acts
// like a Cat instance that doesn't have a defined name.

class Cat2 {
  constructor(name) {
    this.name = name;
  }
  speaks() {
    return `${this.name} says meowwww.`;
  }
}

let fakeCat = Object.create(Cat2.prototype);
console.log(fakeCat instanceof Cat2); // logs true
console.log(fakeCat.hasOwnProperty('name')); // logs false
console.log(fakeCat.speaks()); // logs undefined says meowwww.


// Consider the following program.
class Pet {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}

class Cat3 extends Pet {
  constructor(name, age, fur) {
    super(name, age);
    this.fur = fur;
  }

  info() {
    return `My cat ${this.name} is ${this.age} years old and has ${this.colors} fur.`;
  }
}

let pudding = new Cat3('Pudding', 7, 'black and white');
let butterscotch = new Cat3('Butterscotch', 10, 'tan and white');

console.log(pudding.info());
console.log(butterscotch.info());
// Update this code so that when you run it, you see the following output:
// My cat Pudding is 7 years old and has black and white fur.
// My cat Butterscotch is 10 years old and has tan and white fur.


// Given a class Animal create two classes Cat and Dog that inherit from it.
// The Cat constructor should take 3 arguments, name, age and status. Cats
// should always have a leg count of 4 and a species of cat. Also, the
// introduce method should be identical to the inherited one except, after
// the returned phrase, there should be a single space and the words Meow
// meow!.
// The Dog constructor should take 4 arguments, name, age and status and
// master. Dogs should always have a leg count of 4 and a species of dog. Dogs
// have the same introduce method as any other animal, but they have their own
// method called greetMaster(), which accepts no arguments and returns Hello
// (master's name)! Woof, woof!. (Make sure you replace (master's name) with
// the name of the dog's master.)

class Animal {
  constructor(name, age, legs, species, status) {
    this.name = name;
    this.age = age;
    this.legs = legs;
    this.species = species;
    this.status = status;
  }
  introduce() {
    return `Hello, my name is ${this.name} and I am ${this.age} years old and ${this.status}.`;
  }
}

class Cat4 extends Animal {
  constructor(name, age, status) {
    super(name, age, 4, 'cat', status);
  }

  introduce() {
    return super.introduce() + ' Meow meow!';
  }
}

class Dog extends Animal {
  constructor(name, age, status, master) {
    super(name, age, 4, 'dog', status);
    this.master = master;
  }

  greetMaster() {
    return `Hello ${this.master}! Woof Woof!`;
  }
}

let cat = new Cat4("Pepe", 2, "happy");
console.log(cat.introduce() === "Hello, my name is Pepe and I am 2 years old and happy. Meow meow!");
// logs true


// Consider the following classes and
// Refactor these classes so they all use a common superclass, and
// inherit behavior as needed.

class Vehicle {
  constructor(make, model, wheels) {
    this.make = make;
    this.model = model;
    this.wheels = wheels;
  }

  getWheels() {
    return this.wheels;
  }

  info() {
    return `${this.make} ${this.model}`;
  }
}

class Car extends Vehicle {
  constructor(make, model) {
    super(make, model, 4);
  }
}

class Motorcycle extends Vehicle {
  constructor(make, model) {
    super(make, model, 2);
  }
}

class Truck extends Vehicle {
  constructor(make, model, payload) {
    super(make, model, 6);
    this.payload = payload;
  }
}


// What will the following code log?

// Copy Code
// class Something {
//   constructor() {
//     this.data = "Hello";
//   }

//   dupData() {
//     return this.data + this.data;
//   }

//   static dupData() {
//     return "ByeBye";
//   }
// }

// let thing = new Something();
// console.log(Something.dupData());
// console.log(thing.dupData());
// ANSWER:
// ByeBye
// HelloHello


// Rewrite the two following object types to use the class keyword, instead
// of direct prototype manipulation. Person exposes a method greeting, which
// when called returns a greeting text. Shouter is a subtype of Person, and
// is a bit loud, so whatever he says is uppercased.

// function Person(name) {
//   this.name = name;
// }

// Person.prototype.greeting = function() {
//   return `Hello, I'm ${this.name}. It's very nice to meet you.`;
// }

// function Shouter(name) {
//   Person.call(this, name);
// }

// Shouter.prototype = Object.create(Person.prototype);
// Shouter.prototype.greeting = function() {
//   return Person.prototype.greeting.call(this).toUpperCase();
// }


class Person {
  constructor(name) {
    this.name = name;
  }

  greeting() {
    return `Hello, I'm ${this.name}. It's very nice to meet you.`;
  }
}

class Shouter extends Person {
  constructor(name) {
    super(name);
  }

  greeting() {
    return super.greeting().toUpperCase();
  }
}

let person = new Person("Jane");
let shouter = new Shouter("Bob");

console.log(person.greeting()); //Hello, I'm Jane. It's very nice to meet you
console.log(shouter.greeting()); //HELLO, I'M BOB. IT'S VERY NICE TO MEET YOU


// Consider the following code:

// let butterscotch = new Pet('cat', 'Butterscotch');
// let pudding      = new Pet('cat', 'Pudding');
// let darwin       = new Pet('bearded dragon', 'Darwin');
// let kennedy      = new Pet('dog', 'Kennedy');
// let sweetie      = new Pet('parakeet', 'Sweetie Pie');
// let molly        = new Pet('dog', 'Molly');
// let chester      = new Pet('fish', 'Chester');

// let phanson = new Owner('P Hanson');
// let bholmes = new Owner('B Holmes');

// let shelter = new Shelter();
// shelter.adopt(phanson, butterscotch);
// shelter.adopt(phanson, pudding);
// shelter.adopt(phanson, darwin);
// shelter.adopt(bholmes, kennedy);
// shelter.adopt(bholmes, sweetie);
// shelter.adopt(bholmes, molly);
// shelter.adopt(bholmes, chester);
// shelter.printAdoptions();
// console.log(`${phanson.name} has ${phanson.numberOfPets()} adopted pets.`);
// console.log(`${bholmes.name} has ${bholmes.numberOfPets()} adopted pets.`);
// Write the classes and methods that will be necessary to make this code run,
// and log the following output:

class Pet2 {
  constructor(species, name) {
    this.species = species;
    this.name = name;
  }
}

class Owner {
  constructor(name) {
    this.name = name;
    this.pets = [];
  }

  numberOfPets() {
    return this.pets.length;
  }

  addPet(pet) {
    this.pets.push(pet);
  }

  printPets() {
    this.pets.forEach(pet => console.log(pet.name));
  }
}

class Shelter {
  constructor() {
    this.owners = {};
  }

  adopt(owner, pet) {
    owner.addPet(pet);
    if (!this.owners[owner.name]) {
      this.owners[owner.name] = owner;
    }
  }

  printAdoptions() {
    for (let name in this.owners) {
      console.log(`${name} has adopted the following pets:`);
      this.owners[name].printPets();
      console.log("");
    }
  }
}

let butterscotch2 = new Pet2('cat', 'Butterscotch');
let pudding2      = new Pet2('cat', 'Pudding');
let darwin       = new Pet2('bearded dragon', 'Darwin');
let kennedy      = new Pet2('dog', 'Kennedy');
let sweetie      = new Pet2('parakeet', 'Sweetie Pie');
let molly        = new Pet2('dog', 'Molly');
let chester      = new Pet2('fish', 'Chester');

let phanson = new Owner('P Hanson');
let bholmes = new Owner('B Holmes');

let shelter = new Shelter();
shelter.adopt(phanson, butterscotch2);
shelter.adopt(phanson, pudding2);
shelter.adopt(phanson, darwin);
shelter.adopt(bholmes, kennedy);
shelter.adopt(bholmes, sweetie);
shelter.adopt(bholmes, molly);
shelter.adopt(bholmes, chester);
shelter.printAdoptions();
console.log(`${phanson.name} has ${phanson.numberOfPets()} adopted pets.`);
console.log(`${bholmes.name} has ${bholmes.numberOfPets()} adopted pets.`);
// P Hanson has adopted the following pets:
// a cat named Butterscotch
// a cat named Pudding
// a bearded dragon named Darwin

// B Holmes has adopted the following pets:
// a dog named Molly
// a parakeet named Sweetie Pie
// a dog named Kennedy
// a fish named Chester

// P Hanson has 3 adopted pets.
// B Holmes has 4 adopted pets.
// The order of the output does not matter, so long as all of the information
// is presented.


// Behold this incomplete class for constructing boxed banners.

class Banner {
  constructor(message) {
    this.message = message;
  }

  displayBanner() {
    console.log([this.horizontalRule(), this.emptyLine(), this.messageLine(), this.emptyLine(), this.horizontalRule()].join("\n"));
  }

  horizontalRule() {
    return '+-' + this.repeat('-', this.message.length) + '-+';
  }

  repeat(char, times) {
    let result = '';
    for (let num = 0; num < times; num++) {
      result += char;
    }
    return result;
  }

  emptyLine() {
    return '| ' + this.repeat(' ', this.message.length) + ' |';
  }

  messageLine() {
    return `| ${this.message} |`;
  }
}
// Complete this class so that the test cases shown below work as intended.
// You are free to add any properties you need.

// You may assume that the input will always fit in your terminal window.

// Test Cases

let banner1 = new Banner('To boldly go where no one has gone before.');
banner1.displayBanner();
// +--------------------------------------------+
// |                                            |
// | To boldly go where no one has gone before. |
// |                                            |
// +--------------------------------------------+

let banner2 = new Banner('');
banner2.displayBanner();
// +--+
// |  |
// |  |
// |  |
// +--+