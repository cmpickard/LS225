// What naming convention separates constructor functions from other functions?

//Answer: use PascalCase for the name


// What will the code below output? Why?

// function Lizard() {
//   this.scamper = function() {
//     console.log("I'm scampering!");
//   };
// }

// let lizzy = Lizard();
// lizzy.scamper(); // ?
/*
ANSWER: b/c we called Lizard without the *new* operator, the implicit execution
context for our function call was set to window rather than to a new Lizard obj.
That means, we have defined a new property scamper on the window obj and not on
a new lizard obj.
In fact, since our Lizard function doesn't have a return clause, it returned
undefined, so undefined.scamper() is what we are attempting to call on the last
line and that will throw an error
*/

// Alter the code in problem 2 so that it produces the desired output.

// let lizzy = new Lizard(); // FIXED