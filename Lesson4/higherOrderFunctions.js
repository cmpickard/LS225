// What are the characteristics that define higher-order functions?

// ANSWER: the function takes a function object as input and/or returns a
// function object as output


// Consider the code below:
// let numbers = [1, 2, 3, 4];
// function checkEven(number) {
//   return number % 2 === 0;
// }

// numbers.filter(checkEven); // [2, 4]

// Of the two functions invoked (checkEven and filter), which is a
// higher-order function and why?

// ANSWER: filter is the higher order funciton b/c it takes another function as
// input.


// Implement makeCheckEven below, such that the last line of the code
// returns an array [2, 4].

let numbers = [1, 2, 3, 4];
function makeCheckEven() {
  // ANSWER
  return function(num) {
    return num % 2 === 0;
  };
  // END ANSWER
}

let checkEven = makeCheckEven();

console.log(numbers.filter(checkEven)); // [2, 4]


// Implement execute below, such that the return values for the two
// function invocations match the commented values.

function execute(func, operand) {
  // ANSWER
  return func(operand);
  // END ANSWER
}

console.log(execute(function(number) {
  return number * 2;
}, 10)); // 20

console.log(execute(function(string) {
  return string.toUpperCase();
}, 'hey there buddy')); // "HEY THERE BUDDY"


// Implement makeListTransformer below such that timesTwo's return
// value matches the commented return value.

function makeListTransformer(func) {
  // ANSWER
  return function modifyList(list) {
    let result = [];
    for (let idx = 0; idx < list.length; idx++) {
      result.push(func(list[idx]));
    }
    return result;
  };
  // END ANSWER
}

let timesTwo = makeListTransformer(function(number) {
  return number * 2;
});

console.log(timesTwo([1, 2, 3, 4])); // [2, 4, 6, 8]