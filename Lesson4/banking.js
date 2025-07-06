/* eslint-disable max-lines-per-function */
// In this assignment, we'll build a small banking application and look at how
// we can use closures to control access to the application's data. We'll
// proceed through this assignment using some example code and then you will
// write code that satisfies it.

// Create an object named account that represents a bank account. It should
// contain a balance property that stores the account's current balance.

// Add a deposit method to the account object that takes a single argument,
// the value of the deposit. The deposit method adds the value of the
// argument passed to it to the account's balance, and then returns the
// deposit amount.

//
// console.log(account.balance);
// // 0
// console.log(account.deposit(12));
// // 12
// console.log(account.balance);
// // 12
// console.log(account.deposit(10));
// // 10
// console.log(account.balance);
// // 22

// Add a withdraw method to the account object that takes a single argument,
// the amount to withdraw. It should subtract the amount from the account's
// balance and return the amount subtracted.

//
// console.log(account.balance);
// // 100
// console.log(account.withdraw(19));
// // 19
// console.log(account.balance);
// // 81
// If the account contains less than the withdrawal amount, the method should
// limit the withdrawal to the amount available, and return the actual amount
// withdrawn. This should leave the account with a balance of 0.

//
// console.log(account.balance);
// // 81
// console.log(account.withdraw(91));
// // 81
// console.log(account.balance);
// // 0

// Each account should have a record of every deposit and withdrawal applied
// to it. To do this, add a property named transactions to account that
// contains an array of transactions, each of which is an object with type
// and amount properties.

//
// console.log(account.deposit(23));
// // 23
// console.log(account.transactions);
// // [{...}]
// console.log(account.transactions[0]);
// // {type: "deposit", amount: 23}


let account1 = {
  balance: 0,
  transactions: [],

  deposit(amount) {
    this.balance += amount;
    this.transactions.push({type: 'deposit', amount: amount});
    return amount;
  },

  withdraw(amount) {
    if (amount > this.balance) {
      amount = this.balance;
      this.balance = 0;
    } else {
      this.balance -= amount;
    }

    this.transactions.push({type: 'withdrawal', amount: amount});
    return amount;
  },
};
console.log(account1.balance);
// 0
console.log(account1.deposit(12));
// 12
console.log(account1.balance);
// 12
console.log(account1.deposit(10));
// 10
console.log(account1.balance);
// 22
account1.balance = 100;
console.log(account1.balance);
// 100
console.log(account1.withdraw(19));
// 19
console.log(account1.balance);
// 81
console.log(account1.balance);
// 81
console.log(account1.withdraw(91));
// 81
console.log(account1.balance);
// 0
console.log(account1.deposit(23));
// 23
console.log(account1.transactions);
// [{...}]
console.log(account1.transactions[0]);
// {type: "deposit", amount: 12}


// We want to create more than one account. Move the account creation code
// to a function named makeAccount that returns a new account object.

function makeAccount(number) {
  let id = number;
  let balance = 0;
  let transactions = [];

  return {
    balance() {
      return balance;
    },
    number() {
      return id;
    },
    transactions() {
      return transactions;
    },
    deposit(amount) {
      balance += amount;
      transactions.push({type: 'deposit', amount: amount});
      return amount;
    },

    withdraw(amount) {
      if (amount > balance) {
        amount = balance;
        balance = 0;
      } else {
        balance -= amount;
      }

      transactions.push({type: 'withdrawal', amount: amount});
      return amount;
    },


  };
}

let account2 = makeAccount();
console.log(account2.deposit(15));
// 15
console.log(account2.balance);
// 15
let otherAccount = makeAccount();
console.log(otherAccount.balance);
// 0

// We also need an object to manage accounts: a bank. Create a function that
// returns an object that represents a bank. The bank should have a property
// named accounts that represents a list of accounts.

// Add a new method named openAccount to the object returned by makeBank. It
// should create a new account, add it to the bank's accounts collection,
// and return the new account. Each new account should have a unique account
// number, starting at 101; each account number should be one greater
// than the previous account created.

function makeBank() {
  let lastId = 100;
  let accounts = [];
  return {
    openAccount() {
      lastId += 1;
      accounts.push(makeAccount(lastId));
      return accounts[accounts.length - 1];
    },

    transfer(source, destination, amount) {
      let withdrawal = source.withdraw(amount);
      if (amount < withdrawal) amount = withdrawal;
      destination.deposit(amount);
      return amount;
    },

    getAccounts() {
      return accounts;
    },
  };
}

let bank = makeBank();
let account3 = bank.openAccount();
console.log(account3.number);
// 101
console.log(bank.accounts);
// [{...}]
console.log(bank.getAccounts()[0]);
// {
//  number: 101,
//  balance: 0,
//  transactions: [],
//  deposit: [Function: deposit],
//  withdraw: [Function: withdraw]
// }
let secondAccount = bank.openAccount();
console.log(secondAccount.number);
// 102


// Add a new method to the bank object that transfers money from one
// account to another.

let bank2 = makeBank();
let source = bank2.openAccount();
console.log(source.deposit(10));
// 10
let destination = bank2.openAccount();
console.log(bank2.transfer(source, destination, 7));
// 7
console.log(source.balance);
// 3
console.log(destination.balance);
// 7

// Change the code so that users can access the account balance, account
// number, and transactions list by calling methods, but not by directly
// accessing those properties.


let bank3 = makeBank();
let account = bank3.openAccount();
console.log(account.balance());
// 0
console.log(account.deposit(17));
// 17
secondAccount = bank.openAccount();
console.log(secondAccount.number());
// 102
console.log(account.transactions());
// [{...}]

// Change the code so that users can no longer access the list of accounts.

//
let bank5 = makeBank();
console.log(bank5.accounts);
// undefined