/* eslint-disable no-multiple-empty-lines */
// What will the code below output to the console?

// let message = 'Hello from the global scope!';

// function func(message) {
//   message = 'Hello from the function scope!';
//   console.log(message);
//                          ANSWER: // 'Hello from the function scope!'
// }

// func(message);
// console.log(message);
//                          ANSWER: // 'Hello from the global scope!'




// What will the code below log to the console? What does this output
// demonstrate in relation to the output of problem one?

// let myObj = { message: 'Greetings from the global scope!' };

// function func(obj) {
//   obj.message = 'Greetings from the function scope!';
//   console.log(obj.message);
//                          ANSWER: // 'Greetings from the function scope!'
// }

// func(myObj);

// console.log(myObj.message);
//                          ANSWER: // 'Greetings from the function scope!'

// ANSWER: This demonstrates the mutability of objects in JS as well as the
// pass-by-value-of-the-reference behavior we get when passing objects into
// and out of function calls (whereas the first problem demonstrates the
// immutability of primitives and the pass-by-value behavior we get when passing
// them into and out of function calls)


// What will the code below log to the console?

// let message = 'Hello from the global scope!';

// function func() {
//   message = 'Hello from the function scope!';
//   console.log(message);
//                          ANSWER: // 'Hello from the function scope!';
// }

// func();
// console.log(message);
//                          ANSWER: // 'Hello from the function scope!';


// What will the code below log to the console?

// let a = 10;
// let obj = {
//   a
// }

// let newObj = obj;
// newObj.a += 10;

// console.log(obj.a === a);
//                          ANSWER: false
// console.log(newObj.a === obj.a);
//                          ANSWER: true


// Consider the code below:

// let animal = {
//   name: 'Pumbaa',
//   species: 'Phacochoerus africanus',
// };

// let menagerie = {
//   warthog: animal,
// };

// animal = {
//   name: 'Timon',
//   species: 'Suricata suricatta',
// };

// menagerie.meerkat = animal;

// menagerie.warthog === animal; // false
// menagerie.meerkat === animal; // true
// If objects are mutable, why does the second to last line return false?
/*
when we reassign animal to the object containing the Timon values, we are
actually creating a brand new object and assigning that object to the variable,
animal. That is, it's NOT the case that we are mutating the original object that
animal pointed to. Thus, when we compare the value of managerie.warthod with the
current value assigned to animal, the comparison evaluates to false because
those are not literally one and same token object.
*/