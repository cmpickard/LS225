// Write a function named makeMultipleLister that, when invoked and passed
// a number, returns a function that logs every positive integer multiple of
// that number less than 100. Usage looks like this:

// > let lister = makeMultipleLister(13);
// > lister();
// 13
// 26
// 39
// 52
// 65
// 78
// 91

function makeMultipleLister(num) {
  return function() {
    for (let count = num; count < 100; count += num) {
      console.log(count);
    }
  };
}

let list13s = makeMultipleLister(13);
list13s();

// Write a program that uses two functions, add and subtract, to manipulate a
// running total value. When you invoke either function with a number, it
// should add or subtract that number from the running total and log the new
// total to the console. Usage looks like this:

// > add(1);
// 1
// > add(42);
// 43
// > subtract(39);
// 4
// > add(6);
// 10

let obj = {
  count: 0,
  add(num) {
    this.count += num;
    console.log(this.count);
  },

  subtract(num) {
    this.count -= num;
    console.log(this.count);
  },
};

let add = obj.add.bind(obj);
let subtract = obj.subtract.bind(obj);
add(1);
add(42);
subtract(39);
add(6);

// Given the following code:

// function startup() {
//   let status = 'ready';
//   return function() {
//     console.log('The system is ready.');
//   };
// }

// let ready = startup();
// let systemStatus = // ?

// Is there a way to set the value of systemStatus to the value of the inner
// variable status without changing startup in any way? If so, how?

/*
ANSWER: No. We'd need to change startup to get access to that value from outside
the startup function
*/