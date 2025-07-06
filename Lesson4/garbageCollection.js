// In the following code, when can JavaScript garbage collect each of the
// following arrays? [1], [2], and [1, 2].

// let a = [1];

// function add(b) {
//   a = a.concat(b);
// }

// function run() {
//   let c = [2];
//   let d = add(c);
// }

// run();

/*
Let's talk through the program's execution:
First, a is declared and initialized to [1]. At this point, only [1] exists in
memory and a references it, so it's not garbage.
Second, the run function is called.
Third, c is declared and initlaized to [2]. At this point, [1] and [2] both
exist and have references.
Fourth, the add() function is called and a reference to [2] is passed in as an
arg.
Fifth, the reference to [2] is assigned to the local var b.
Sixth, the variable a is reassigned to a new object that is returned from having
the [1] object call the concat method with [2] as the argument --> so a now
references [1,2].
At this point, there are 3 objects with the following refernces:
  i. [1] <- none
  ii. [2] <- c, b
  iii. [1,2] <- a
So, [1] can now be garbage colected.
Seventh, the add function returns undefined and that value is assigned to d. The
b variable is now out of scope, so only c refernces [2]
Eighth, the run function returns undefined and the c variable is now out of
scope. The [2] object has no references and is unreachable; it's garbage
Ninth, the program ends with [1,2] still being referred to by a. Since the
program is over, [1,2] can be garbage collected

*/


// In the following code, when can JavaScript garbage collect the value
// ["Steve", "Edie"]?

// function makeHello(names) {
//   return function() {
//     console.log("Hello, " + names[0] + " and " + names[1] + "!");
//   };
// }

// let helloSteveAndEdie = makeHello(["Steve", "Edie"]);

/*
the array literal ["Steve", "edie"] is assigned to the names local variable.
inside the makeHello function, no other variables are assigned to this array --
though the values inside it are referenced in passing.
Thus, once the makeHello function call returns, there are no longer any refs to
that value literal and it can be garbage collected
*/