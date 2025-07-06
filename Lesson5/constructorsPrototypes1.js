// What does the following code log to the console?

// let a = 1;
// let foo;
// let obj;

// function Foo() {
//   this.a = 2;
//   this.bar = function() {
//     console.log(this.a);
//   };
//   this.bar();
// }

// foo = new Foo();

// foo.bar();
// Foo();

// obj = {};
// Foo.call(obj);
// obj.bar();

// console.log(this.a);

/*
ANSWER:
(i) foo = new Foo() -> logs 2
  b/c of the this.bar() call at the end of the constructor function Foo
(ii) foo.bar() -> logs 2
  calling the bar method on foo results in the value of foos' a prop being
  logged to teh console
(iii) Foo() -> logs 2
  in this function call, window.a is set to 2 and window.bar is defined, and
  then called, so we log 2: that value of window.a
(iv) Foo.call(obj) -> logs 2
  in this function call, we set the explicit execution context to obj, and so
  inside our call we define an a prop and a bar method on obj then call that
  method. We log 2 because this.a is equiv to obj.a which === 2
(v) obj.bar() -> logs 2
  since the obj object now has an a prop assigned to 2, we we call the bar
  method on obj, we log the value of obj's a property
(vi) console.log(this.a) -> logs 2
  since we earlier defined an a prop on the window object, we here log the value
  we assigned to the console -- which happens to be 2
*/


// What does the following code log to the console?

// let RECTANGLE = {
//   area() {
//     return this.width * this.height;
//   },
//   perimeter() {
//     return 2 * (this.width + this.height);
//   },
// };

// function Rectangle(width, height) {
//   this.width = width;
//   this.height = height;
//   this.area = RECTANGLE.area();
//   this.perimeter = RECTANGLE.perimeter();
// }

// let rect1 = new Rectangle(2, 3);
// console.log(rect1.area);
// console.log(rect1.perimeter);

/*
ANSWER:
NaN
NaN

That's because the RECTANGLE.perimeter() call has the implicit ex context of the
RECTANGLE object and so inside that method, this refers to RECTANLGE.
(and also the same for perimeter() call)
*/

// How do you fix this problem?
/*
ANSWER:
We can use call or apply to call those methods in the explicit execution context
of our intended object, rect1, which we can  access using the this keyword
from inside our constructor function -- e.g.
RECTANGLE.perimeter.call(this)
RECTANGLE.area.call(this)
*/


// Write a constructor function Circle, that takes a radius as an argument.
// You should be able to call an area method on the created objects to get the
// circle's area. Test your implementation with the following code:

// let a = new Circle(3);
// let b = new Circle(4);

// console.log(a.area().toFixed(2)); // => 28.27
// console.log(b.area().toFixed(2)); // => 50.27

function Circle(radius) {
  this.radius = radius;
  this.area = function() {
    return this.radius * this.radius * Math.PI;
  };
}
let a = new Circle(3);
let b = new Circle(4);

console.log(a.area().toFixed(2)); // => 28.27
console.log(b.area().toFixed(2)); // => 50.27


// What will the following code log out and why?

// let ninja;
// function Ninja() {
//   this.swung = true;
// }

// ninja = new Ninja();

// Ninja.prototype.swingSword = function() {
//   return this.swung;
// };

// console.log(ninja.swingSword());
/*
ANSWER:
true

You might think it matters that the ninja object is created prior to the
swingSword method being added to the Ninja constructor function's function
prototype object. but that's not right. The objects we create using the
constructor function don't receive a COPY of all the content in their object
prototype, the contents a frozen-in-time snapshot of the contents of
Ninja.prototype at the moment of the instance's creation. Rather they save a
*pointer* to Ninja.prototype. Thus, any changes we make to that object will
be reflected in the instances that point to it.
*/


// What will the following code log out and why?
// let ninja;
// function Ninja() {
//   this.swung = true;
// }

// ninja = new Ninja();

// Ninja.prototype = {
//   swingSword: function() {
//     return this.swung;
//   },
// };

// console.log(ninja.swingSword());

/*
ANSWER:
ERROR - ninja.swingSword is not a function

After we create the ninja instance object using the Ninja constructor function,
we then *reassign* the function prototype of the Ninja function to a completely
different object. This does not affect the particular ninja object. it still
points to the particular object that Ninja.prototype originally pointed to.

Since that object does not contain a swingSword method, our attempt to access
ninja.swingSword fails and throws an error
*/


// Implement the method described in the comments below:

let ninjaA;
let ninjaB;
function Ninja() {
  this.swung = false;
}

ninjaA = new Ninja();
ninjaB = new Ninja();

// Add a swing method to the Ninja prototype which
// returns the calling object and modifies swung
Ninja.prototype.swing = function() {
  this.swung = !this.swung;
  return this;
};

console.log(ninjaA.swing().swung);      // must log true
console.log(ninjaB.swing().swung);      // must log true


// In this problem, we'll ask you to create a new instance of an object, without
// having direct access to the constructor function:

let ninjaAA = (function() {
  function Ninja() {}
  return new Ninja();
})();

// create a ninjaB object
let ninjaBB = new ninjaAA.constructor();
console.log(ninjaBB.constructor === ninjaAA.constructor);    // should log true