/* eslint-disable id-length */
// // Write a function named greet that takes two arguments and logs a greeting:

// // Copy Code
// // > greet('howdy', 'Joe');
// // Howdy, Joe!
// // > greet('good morning', 'Sue');
// // Good morning, Sue!

// // Use the partial function shown above and your solution to problem 1
// // to create sayHello and sayHi functions that work like this:

// // > sayHello('Brandon');
// // Hello, Brandon!
// // > sayHi('Sarah');
// // Hi, Sarah!

function greet(greeting, name) {
  console.log(`${greeting}, ${name}!`);
}

function createGreeter(greeting) {
  return function(name) {
    greet(greeting, name);
  };
}

let sayHello = createGreeter('Hello');
let sayHi = createGreeter('Hi');
sayHello('Brandon');
sayHi('Sarah');


// Use partial function application to implement a function, makeSub, that
// returns a function that subtracts 5 from the argument passed to the
// return function.

function subtract(a, b) {
  return a - b;
}

function makeSub() {
  return function(a) {
    return subtract(a, 5);
  };
}

const sub5 = makeSub();

console.log(sub5(10)); // 5
console.log(sub5(20)); // 15


// This code is a bit limited however, because we can only subtract by 5.
// Implement the makeSubN function below so that we can supply any value
// we want to be subtracted from a, and get a new function that will
// always subtract this value.

function makeSubN(n) {
  return function(m) {
    return subtract(m,n);
  };
}

const sub4 = makeSubN(4);
const sub7 = makeSubN(7);

console.log(sub4(10)); // 6
console.log(sub4(20)); // 16
console.log(sub7(10)); // 3
console.log(sub7(20)); // 13

// Although the solution above is more flexible, we now want to be able to
// supply any operation, not just subtraction. Implement makePartialFunc below.

function makePartialFunc(func, b) {
  return function(a) {
    return func(a, b);
  };
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

let multiplyBy5 = makePartialFunc(multiply, 5);
let divideBy2 = makePartialFunc(divide, 2);

console.log(multiplyBy5(100)); // 500
console.log(divideBy2(100)); // 50


// In our previous solution, multiplyBy5 retains access to func and b long
// after makePartialFunc has finished execution. What makes this possible?
/*
ANSWER:
the closure created around the anon function that's created and returned by
the makePartialFunc function call
*/
// Consider the code below:

let subjects = {
  English: ['Bob', 'Tyrone', 'Lizzy'],
  Math: ['Fatima', 'Gary', 'Susan'],
  Biology: ['Jack', 'Sarah', 'Tanya'],
};

function rollCall(subject, students) {
  console.log(subject + ':');
  students.forEach(function(student) {
    console.log(student);
  });
}

function makeMathRollCall() {
  return function(students) {
    return rollCall('Math', students);
  };
}

let mathRollCall = makeMathRollCall();
mathRollCall(subjects['Math']);
// => Math:
// => Fatima
// => Gary
// => Susan
// Implement makeMathRollCall such that it returns a partially applied
// rollCall function, with the subject as 'Math'.