/* eslint-disable id-length */
// Follow the steps below:

// Create an object called shape that has a getType method.
// Define a Triangle constructor function whose prototype is shape. Objects
// created with Triangle should have four own properties: a, b, c
// (representing the sides of a triangle), and type.
// Add a new method to the prototype called getPerimeter.
// Test your implementation with the following code:

function Triangle(a, b, c) {
  this.a = a;
  this.b = b;
  this.c = c;
  this.type = 'triangle';
}

let shape = {
  constructor: Triangle,
};

Triangle.prototype = shape;
Triangle.prototype.getPerimeter = function() {
  return this.a + this.b + this.c;
};
Triangle.prototype.getType = function() {
  return this.type;
};

let t = new Triangle(3, 4, 5);
console.log(t.constructor === Triangle);    // true
console.log(shape.isPrototypeOf(t));        // true
console.log(t.getPerimeter());              // 12
console.log(t.getType());                   // "triangle"


// Update the following code so that, instead of logging the values, each
// statement logs the name of the constructor to which it belongs.
// console.log("Hello");
// console.log([1,2,3]);
// console.log({name: 'Srdjan'});
// ANSWER:
console.log(Object.getPrototypeOf("Hello").constructor.name);
console.log(Object.getPrototypeOf([1,2,3]).constructor.name);
console.log(Object.getPrototypeOf({name: 'Srdjan'}).constructor.name);
//END ANSWER

// Expected output:
// String
// Array
// Object


// Since a constructor is just a function, it can be called without the
// new operator, and this can lead to unexpected results and errors
// especially for inexperienced programmers.

// Write a constructor function that can be used with or without the new
// operator, and return the same result in either form. Use the code below
// to check your solution:

function User(first, last) {
  if (!(this instanceof User)) {
    return new User(first, last);
  }

  this.name = first + ' ' + last;
}

let name = 'Jane Doe';
let user1 = new User('John', 'Doe');
let user2 = User('John', 'Doe');

console.log(name);         // => Jane Doe
console.log(user1.name);   // => John Doe
console.log(user2.name);   // => John Doe


// Create a function that can create an object with a given object as its
// prototype, without using Object.create.

function createObject(obj) {
  return Object.setPrototypeOf({}, obj);
}

let foo = {
  a: 1
};

let bar = createObject(foo);
console.log(foo.isPrototypeOf(bar));         // true


// Similar to the problem above, without using Object.create, create a
// begetObject method that you can call on any object to create an object
// inherited from it:
function begetObject() {
  return Object.setPrototypeOf({}, this);
}

let foo2 = {
  a: 1,
};

foo2.begetObject = begetObject;

let bar2 = foo2.begetObject();
console.log(foo2.isPrototypeOf(bar2));         // true


// Create a function neww, so that it works like the new operator. For this
// practice problem, you may use Object.create.

function neww(constructor, args) {
  let obj = Object.create(constructor.prototype);
  let constructorReturn = constructor.call(obj, ...args);
  // if the constructor is weird and returns a non-this obj, then we need to
  // return that object too. else return the mutated obj
  return (typeof constructorReturn === 'object' ? constructorReturn : obj);
}

function Person(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
}

Person.prototype.greeting = function() {
  console.log('Hello, ' + this.firstName + ' ' + this.lastName);
};

let john = neww(Person, ['John', 'Doe']);
john.greeting();          // => Hello, John Doe
console.log(john.constructor);         // Person(firstName, lastName) {...}