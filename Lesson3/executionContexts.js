// What will the code below output?

// function foo() {
//   return this;
// }

// let context = foo();
// console.log(context);
// ANSWER:
// window


// What will the code in the previous question output in strict mode?
// ANSWER:
// undefined


// What will the code below output? Explain the difference, if any, between
// this output and that of problem 1.
// let obj = {
//   foo() {
//     return this;
//   },
// };

// let context = obj.foo();

// console.log(context);
// ANSWER: obj


// What will the code below output?
// var message = 'Hello from the global scope!';

// function deliverMessage() {
//   console.log(this.message);
// }

// deliverMessage();

// let bar = {
//   message: 'Hello from the function scope!',
// };

// bar.deliverMessage = deliverMessage;

// bar.deliverMessage();
//ANSWER: 'Hello from the global scope!' then 'Hello from the function scope!'


// What will the code below output? What would happen if we replaced var on line
// 1 with let? Can you explain why the output changes?

// var a = 10;
// let b = 10;
// let c = {
//   a: -10,
//   b: -10,
// };

// function add() {
//   return this.a + b;
// }

// c.add = add;

// console.log(add());
// console.log(c.add());
//ANSWER:
// 20 and then -20
// after the change: NaN and -20
// when we invoke the add funciton on the second to last line our implicit
// context is the global object. thus, this.a resolves to the value 10 b/c our
// the first line where we declare a var variable in the global scope has the
// effect of creating a property named a on the global object and assigning
// that property to 10. Thus, this.a === window.a which resolves to 10.
// But if we use let rather than var, we do not create a property named a on
// the global object. And thus, this.a resolves to undefined. Adding undefined
// to 10 results in the NaN.


// The problems above all feature implicit function execution context. What
// methods have we learned so far that let us explicitly specify what a
// function's execution context should be?
//ANSWER: Function.prototyple.call && Function.prototype.apply


// In the code below, use call to invoke bar.add as a method but with foo as
// the execution context. What will this return?

let foo = {
  a: 1,
  b: 2,
};

let bar = {
  a: 'abc',
  b: 'def',
  add() {
    return this.a + this.b;
  },
};

// ANSWER:
bar.add.call(foo);
// returns 3

// Given the code and desired output shown below, should you use call or applyto
// supply explicit context and the arguments to outputList? That is, whichmethod
// makes the most sense to use? Implement a solution using your preferred method
// such that the desired output is logged, and explain your choice.

let fruitsObj = {
  list: ['Apple', 'Banana', 'Grapefruit', 'Pineapple', 'Orange'],
  title: 'A Collection of Fruit',
};

function outputList() {
  console.log(this.title + ':');

  let args = [].slice.call(arguments);

  args.forEach(function(elem) {
    console.log(elem);
  });
}

outputList.call(fruitsObj, ...fruitsObj.list);

// Desired output:

// A Collection of Fruit:
// Apple
// Banana
// Grapefruit
// Pineapple
// Orange
// Solution
// For an extra challenge, consider this line of code from the previous problem:

// Copy Code
// let args = [].slice.call(arguments);
// Inside of JavaScript functions, arguments is an object that holds all of the
// arguments passed to the function. Bearing in mind that the function author
// wants to iterate over the arguments later in the method using an Array method
// why do you think he or she is invoking call?