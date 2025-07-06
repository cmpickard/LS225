// Will the code below execute?

// function() {
//   console.log("Sometimes, syntax isn't intuitive!")
// }();

// ANSWER: No. this is a function statement and function statements do resolve
// to a function object value and so cannot  be called.

// Edit the code from problem one so it executes without error.
// ANSWER:
(function() {
  console.log("Sometimes, syntax isn't intuitive!");
})();


// The code below throws an error:

// var sum = 0;
// var numbers;

// sum += 10;
// sum += 31;

// numbers = [1, 7, -3, 3];

// function sum(arr) {
//   return arr.reduce(function(sum, number) {
//     sum += number;
//     return sum;
//   }, 0);
// }

// sum += sum(numbers);  // ?
// What kind of problem does this error highlight? Use an IIFE to address it,
// so that code runs without error.
// ANSWER:
// we have variable redeclaration causing us to lose track of our sum function
// when we reassign sum to 0 on line 1.

var sum = 0;
var numbers;

sum += 10;
sum += 31;

numbers = [1, 7, -3, 3];

sum += (function(nums) {
  return nums.reduce(function(sum, number) {
    sum += number;
    return sum;
  }, 0);
})(numbers);  // ?

// Consider the output below:

// countdown(7);
// 7
// 6
// 5
// 4
// 3
// 2
// 1
// 0
// Done!
// Implement a function countdown that uses an IIFE to generate the
// desired output.

function countdown(start) {
  (function(num) {
    for (num; num >= 0; num--) {
      console.log(num);
    }

    console.log('Done!');
  })(start);
}

// Is the named function in this IIFE accessible in the global scope?

// (function foo() {
//   console.log('Bar');
// })();

// foo() // ?

// ANSWER: No.

// For an extra challenge, refactor the solution to problem 4 using recursion,
// bearing in mind that a named function created in an IIFE can be referenced
// inside of the IIFE.

function countdown2(start) {
  (function traverse(num) {
    if (num === -1) {
      console.log(`Done!`);
    } else {
      console.log(num);
      traverse(num - 1);
    }
  })(start);
}

countdown2(10);