/* eslint-disable no-multiple-empty-lines */

// Our desired output for the code below is: Christopher Turk is a Surgeon.
// What will the code output, and what explains the difference, if any,
// between the actual and desired outputs?

// let turk = {
//   firstName: 'Christopher',
//   lastName: 'Turk',
//   occupation: 'Surgeon',
//   getDescription() {
//     return this.firstName + ' ' + this.lastName + ' is a ' +
//            this.occupation + '.';
//   }
// };

// function logReturnVal(func) {
//   let returnVal = func();
//   console.log(returnVal);
// }

// logReturnVal(turk.getDescription);

/* ANSWER:
the getDescription function isn't being executed until it's called inside the
logReturnVal funciton. Inside that function, getDescription is not invoked as
a method on turk but as a function, meaning it's implicit execution context is
the global object and, thus, each reference to 'this' inside the function call
resolves to the global object. That object doesn't have a firstName, lastName,
or occupation property, so those property references all return undefined.

Thus, our code outputs to console,
  'undefined undefined is a undefined.'
*/


// Alter logReturnVal such that it takes an additional context argument, and
// use one of the methods we've learned in this lesson to invoke func inside
// of logReturnVal with context as its function execution context. Alter the
// invocation of logReturnVal and supply turk as the context argument.

let turk = {
  firstName: 'Christopher',
  lastName: 'Turk',
  occupation: 'Surgeon',
  getDescription() {
    return this.firstName + ' ' + this.lastName + ' is a ' +
           this.occupation + '.';
  }
};

function logReturnVal(func, context) { // CHANGED LINE
  let returnVal = func.call(context);
  console.log(returnVal);
}

logReturnVal(turk.getDescription, turk); // CHANGED LINE


// Suppose that we want to extract getDescription from turk, but always have it
// execute with turk as context. Use one of the methods we've learned in the
// last lesson to assign such a permanently bound function to a
// new variable, getTurkDescription.

// ANSWER
let getTurkDescription = turk.getDescription.bind(turk);



// Consider the code below, and our desired output:

// let TESgames = {
//   titles: ['Arena', 'Daggerfall', 'Morrowind', 'Oblivion', 'Skyrim'],
//   seriesTitle: 'The Elder Scrolls',
//   listGames() {
//     this.titles.forEach(function(title) {
//       console.log(this.seriesTitle + ' ' + title);
//     });
//   }
// };

// TESgames.listGames();

// Desired output:
// The Elder Scrolls Arena
// The Elder Scrolls Daggerfall
// The Elder Scrolls Morrowind
// The Elder Scrolls Oblivion
// The Elder Scrolls Skyrim
// Will this code log our desired output? Why or why not?


/*
ANSWER:
No. While 'this.titles' correctly resolves to the titles array, the callback
function that forEach repeatedly calls has an implicit execution context of the
global object and so each reference to this fails to grab the property values
we want from the TESgames object.

*/

// Use an arrow function so that the code logs our desired output.

let TESgames = {
  titles: ['Arena', 'Daggerfall', 'Morrowind', 'Oblivion', 'Skyrim'],
  seriesTitle: 'The Elder Scrolls',
  listGames() {
    this.titles.forEach(title => { // CHANGED LINE
      console.log(this.seriesTitle + ' ' + title);
    });
  }
};

TESgames.listGames();

// Use the let self = this fix to alter TESgames.listGames such that it logs
// our desired output to the console.

TESgames = {
  titles: ['Arena', 'Daggerfall', 'Morrowind', 'Oblivion', 'Skyrim'],
  seriesTitle: 'The Elder Scrolls',
  listGames() {
    let self = this; // CHANGED LINE
    this.titles.forEach(function(title) {
      console.log(self.seriesTitle + ' ' + title);  // CHANGED LINE
    });
  }
};

TESgames.listGames();

// If we don't want to rely on let self = this, forEach provides us with an
// alternative means of supplying execution context to the inner function.
// Use this means to achieve our desired output.

TESgames = {
  titles: ['Arena', 'Daggerfall', 'Morrowind', 'Oblivion', 'Skyrim'],
  seriesTitle: 'The Elder Scrolls',
  listGames() {
    this.titles.forEach(function(title) {
      console.log(this.seriesTitle + ' ' + title);
    }, this); // CHANGED LINE
  }
};

TESgames.listGames();

// Consider the code below:

// let foo = {
//   a: 0,
//   incrementA() {
//     function increment() {
//       this.a += 1;
//     }

//     increment();
//   }
// };

// foo.incrementA();
// foo.incrementA();
// foo.incrementA();
// What will the value of foo.a be after this code has executed?
/*
ANSWER:
foo.a === 0

When we call increment from inside the incrementA function, we experience
context loss: we expect that inside the increment function, this will continue
to refer to the foo object, but since we called increment as a function rather
than as a method, JS sets the implicit execution context of our funciton call]
to the global object. Thus, this.a resolves to window.a, meaning we never
actually increment the value assigned to foo.a
*/



// Use one of the methods we learned in this lesson to invoke increment with
// explicit context such that foo.a is incremented with each invocation of
// incrementA.

let foo = {
  a: 0,
  incrementA() {
    function increment() {
      this.a += 1;
    }

    increment.bind(foo)();
  }
};

foo.incrementA();
foo.incrementA();
foo.incrementA();
console.log(foo.a);

// We decide that we want each invocation of foo.incrementA to increment
// foo.a by 3, rather than 1, and alter our code accordingly:

// let foo = {
//   a: 0,
//   incrementA() {
//     function increment() {
//       this.a += 1;
//     }

//     increment.apply(this);
//     increment.apply(this);
//     increment.apply(this);
//   }
// };
// Calling apply three times seems repetitive, though. Use bind to permanently
// set foo as increment's execution context.

foo = {
  a: 0,
  incrementA() {
    function increment() {
      this.a += 1;
    }

    let incrementThrice = increment.bind(foo);
    incrementThrice();
    incrementThrice();
    incrementThrice();
  }
};

foo.incrementA();
foo.incrementA();
foo.incrementA();
console.log(foo.a);