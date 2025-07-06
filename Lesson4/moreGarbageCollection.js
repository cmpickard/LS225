// Is JavaScript a garbage-collected language, and if so, what does this entail?

/*
It is. That means that the JS engine automatically takes care of freeing up
allocated memory when the objects / values stored there are no longer needed by
the program.
*/

// Consider the code below:

// let myNum = 1;

// function foo() {
//   let myArr = ['this is an array'];
//   // what is eligible for GC here?
// }

// foo();

// // what is eligible for GC here?

// // more code
// Are either of the values 1 or ['this is an array'] eligible for garbage
// collection on line 5? What about on line 10?

/*
The number 1 is never eligible for GC bc in JS primitives are kept in the stack
which I don't know what tha tmeans really except stack-kept things are never
garbage collected.

On line 10, the array is eligble but not on line 5.
*/


// Consider the code below:

// function makeGreeting() {
//   let foo = { greeting: 'hello' };
//   return function(name) {
//     foo.name = name;
//     return foo;
//   };
// }

// let greeting = makeGreeting();

// // is the object eligible for GC here?

// // more code
// Is the object created and assigned to foo on line 2 eligible for garbage
// collection on line 11?

/*
no. that object is referenced by the closure formed when the anonymous function
is created inside makeGreeting --> which function is then saved to the greeting
variable.
*/