// Use the method we learned above to assign foo below to a new Object with
// prot as its prototype.

let prot = {};
let foo = Object.create(prot);

// Use getPrototypeOf to demonstrate the prototypal relationship between
// prot and foo.

let fooProt = Object.getPrototypeOf(foo);
console.log(fooProt); // prot

// Use isPrototypeOf to demonstrate the prototypal relationship between
// prot and foo.
console.log(prot.isPrototypeOf(foo)); // true

// What will the last two lines of the code below return? Why?

prot = {};
foo = Object.create(prot);

prot.isPrototypeOf(foo);
Object.prototype.isPrototypeOf(foo);

/*
ANSWER
true -- because prot is directly the prototype of foo
true -- because Object is the prototype of prot
*/