// Create a makeCounterLogger function that takes a number as an argument and
// returns a function. When we invoke the returned function with a second number
// it should count up or down from the first number to the second number,
// logging each number to the console:

// > let countlog = makeCounterLogger(5);
// > countlog(8);
// 5
// 6
// 7
// 8
// > countlog(2);
// 5
// 4
// 3
// 2

function makeCounterLogger(startNum) {
  return function(endNum) {
    if (startNum < endNum) {
      for (let num = startNum; num <= endNum; num++) {
        console.log(num);
      }
    } else {
      for (let num = startNum; num >= endNum; num--) {
        console.log(num);
      }
    }
  };
}

let countFive = makeCounterLogger(5);
countFive(8);
countFive(2);

// We'll build a simple todo list program using the techniques we've seen in
// this assignment. Write a makeList function that returns a new function that
// implements a todo list. The returned function should have the following
// behavior:

// When called with an argument that is not already on the list, it adds
// that argument to the list.
// When called with an argument that is already on the list, it removes the
// element from the list.
// When called without arguments, it logs all items on the list. If the list
// is empty, it logs an appropriate message.

function makeList() {
  let todos = [];
  return function list(todo) {
    if (todo === undefined) {
      if (todos.length === 0) {
        console.log('The list is empty');
      } else {
        todos.forEach(todo => console.log(todo));
      }
    } else if (todos.includes(todo)) {
      todos.splice(todos.findIndex(el => el === todo), 1);
      console.log(`${todo} removed`);
    } else {
      todos.push(todo);
      console.log(`${todo} added to list`);
    }
  };
}

let list = makeList();
list();
list('make breakfast');
list ('read book');
list();
list('make breakfast');
list();

// > let list = makeList();
// > list();
// The list is empty.
// > list('make breakfast');
// make breakfast added!
// > list('read book');
// read book added!
// > list();
// make breakfast
// read book
// > list('make breakfast');
// make breakfast removed!
// > list();
// read book