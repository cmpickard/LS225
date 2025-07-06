// Write a function that returns the object on a given object's prototype
// chain where a property is defined. See the example code below:

function getDefiningObject(object, propKey) {
  let currObject = object;

  while (currObject) {
    if (currObject.hasOwnProperty(propKey)) return currObject;
    currObject = Object.getPrototypeOf(currObject);
  }

  return null;
}

let foo0 = {
  a: 1,
  b: 2,
};

let barr = Object.create(foo0);
let bazz = Object.create(barr);
let qux = Object.create(bazz);

barr.c = 3;

console.log(getDefiningObject(qux, 'c') === barr);     // => true
console.log(getDefiningObject(qux, 'e'));             // => null

// Write a function to provide a shallow copy of an object. The object that
// you copy should share the same prototype chain as the original object,
// and it should have the same own properties that return the same values or
// objects when accessed. Use the code below to verify your implementation:

function shallowCopy(object) {
  let copy = Object.create(Object.getPrototypeOf(object));
  let ownProps = Object.getOwnPropertyNames(object);
  for (let prop of ownProps) {
    copy[prop] = object[prop];
  }

  return copy;
}

let foo = {
  a: 1,
  b: 2,
};

let bar = Object.create(foo);
bar.c = 3;
bar.say = function() {
  console.log('c is ' + this.c);
};

let baz = shallowCopy(bar);
console.log(baz.a);       // => 1
baz.say();                // => c is 3
console.log(baz.hasOwnProperty('a'));  // false
console.log(baz.hasOwnProperty('b'));  // false
console.log(baz.hasOwnProperty('c'));  // true

// Write a function that extends an object (destination object) with contents
// from multiple objects (source objects).

function extend(destination, ...extensions) {
  let obj = Object.create(extensions.shift());
  let prot = Object.getPrototypeOf(obj);

  for (let extension of extensions) {
    Object.setPrototypeOf(prot, extension);
    prot = Object.getPrototypeOf(prot);
  }

  Object.setPrototypeOf(destination, obj);

  return destination;
}

let foo2 = {
  a: 0,
  b: {
    x: 1,
    y: 2,
  },
};

let joe = {
  name: 'Joe'
};

let funcs = {
  sayHello() {
    console.log('Hello, ' + this.name);
  },

  sayGoodBye() {
    console.log('Goodbye, ' + this.name);
  },
};

let object = extend({}, foo2, joe, funcs);

console.log(object.b.x);          // => 1
object.sayHello();                // => Hello, Joe