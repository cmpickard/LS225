// Practice Problems: The Global Object
// Be sure to use Chrome Snippets for this assignment. You can use other
// browser tools or Node, but we will assume that you're using Chrome. If
// you do use Node or another browser, you may see different results and
// even experience errors. We introduce Chrome Snippets in this assignment.

// With strict mode not enabled, what object serves as the implicit execution
// context? What happens when strict mode is enabled?

// What does the code below log?

// a = 10;
// console.log(window.a === a);
// ANSWER: true


// What does the code below log?
// "use strict"
// a = 10;
// console.log(window.a === a);
// ANSWER: Reference Error thrown

// What does the code below do?
// function func() {
//   let b = 1;
// }
// func();
// console.log(b);
// ANSWER: Reference Error thrown


// What does the code below do?
// function func() {
//   b = 1;
// }

// func();
// console.log(b);
// ANSWER: outputs 1 to the console.

// What does the code below log?

// "use strict"
// function func() {
//   b = 1;
// }

// func();
// console.log(b);
// ANSWER: Reference Error thrown