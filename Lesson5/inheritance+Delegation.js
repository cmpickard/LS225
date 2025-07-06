/* eslint-disable no-undef */
// What will the code below log to the console?

// let foo = {};
// let bar = Object.create(foo);

// foo.a = 1;

// console.log(bar.a);

// What will the code below log to the console?
// ANSWER: 1 (!!!)

// let foo = {};
// let bar = Object.create(foo);

// foo.a = 1;
// bar.a = 2;
// console.log(bar.a);
// ANSWER: 2;

// Given the code below, do we know for certain that on the last line we are
// ultimately referencing a property owned by boo? How can we test that far
// is not delegating to boo?

// let boo = {};
// boo.myProp = 1;

// let far = Object.create(boo);

// // lots of code

// far.myProp;       // 1
// ANSWER:
far.hasOwnProptery('myProp');