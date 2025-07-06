/* eslint-disable max-lines-per-function */
// Reimplement makeList, so that it returns an Object that provides the
// interface shown above, including add, list, and remove methods.

// Show Solution

function makeList() {
  let items = [];
  return {
    add(todo) {
      items.push(todo);
      console.log(`${todo} added`);
    },
    remove(todo) {
      let idx = items.indexOf(todo);
      if (idx !== -1) {
        items.splice(idx, 1);
        console.log(`${todo} removed`);
      } else {
        console.log('No such todo');
      }
    },
    list() {
      items.forEach(todo => {
        console.log(todo);
      });
    },
  };
}

let list = makeList();
list.add('break');
list.add('coffee');
list.list();
list.remove('nothing');
list.remove('break');
list.list();

// Notice that the solution lets us access the array of items through the
// items property:

// > list.items;            // items accessible from outside object
// = ['corn']               // since it is an object property
// This was not the case in the single-function implementation:

// > list.items;            // items not accessible from outside function
// = undefined              // since it is within a closure

// Update the implementation from problem 1 so that it retains the use of an
// object with methods but prevents outside access to the items the object
// stores internally.

/*
ANSWER: This is accomplished by moving the items array OUT OF THE OBJECT and
into the function that creates the todo list obj. That way the items array is
in the closure of the methods returned by makeTodos and, thus, those methods
will have access to the array, but not being inside the object directly, the
array is not a property on the obj and so not accessible through the obj
directly
*/