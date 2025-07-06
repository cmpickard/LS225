/*
In this game, the human user is asked to select a move between 3 options:
Rock, Paper, and Scissors

after making the selection, their "computer opponent" will also select one of
those options.

Then the two moves will be compared and the winner declared

Nouns:
game, player, computer, move (rock, pp, sci), selection, options, winner

Verbs:
ask
select
compare
declare

classes:
RPSGame -> welcome, compare, declare
Player -> makeChoice
Computer -> makeChoice
*/

const readline = require('readline-sync');

class Player {
  constructor(test = false) {
    this.move = null;
    this.test = test;
    this.name = this.getName(this.test);
  }
}

class Human extends Player {
  constructor(test = false) {
    super(test);
  }

  getName() {
    if (this.test) return 'Chuck Tester';
    let ans;
    while (!ans) {
      ans = readline.question('What is your name?\n');
      if (/[^ A-Za-z.-]/.test(ans)) {
        console.log('invalid name');
        ans = null;
      }
    }

    return ans;
  }

  makeChoice(moves) {
    if (this.test) {
      this.move = 's';
      return;
    }

    let ans;
    while (!ans) {
      console.log('What move do you wish to select?');
      ans = readline.question(`(r)ock, (p)aper, or (s)cissors\n`);
      ans = ans.slice(0, 1).toLowerCase();
      if (!moves.includes(ans)) {
        ans = null;
        console.log('Not a valid move!');
      } else {
        this.move = ans;
      }
    }
  }
}

class Computer extends Player {
  constructor() {
    super();
  }

  getName() {
    const NAMES = ['BeepBoopert', 'TIS100', 'DATA', 'AIBERT', 'HAL'];
    let randIdx = Math.floor(Math.random() * NAMES.length);
    return NAMES[randIdx];
  }

  makeChoice(moves) {
    let randIdx = Math.floor(Math.random() * moves.length);
    this.move = moves[randIdx];
  }
}

class RPSGame {
  static MOVES = ['r', 'p', 's'];
  static NEEDED_WINS = 3;

  constructor(test = false) {
    this.human = new Human(test);
    this.computer = new Computer();
    this.winner = null;
    this.score = [0, 0];
  }

  play() {
    this.welcome();

    while (!this.score.includes(RPSGame.NEEDED_WINS)) {
      this.human.makeChoice(RPSGame.MOVES);
      this.computer.makeChoice(RPSGame.MOVES);
      this.logMoves();
      this.calcWinner();
      this.announceWinner();
      this.reset();
    }
    this.goodbye();
  }

  welcome() {
    console.log(`\nWelcome to Rock-Paper-Scissors!`);
    console.log(`${this.human.name} is playing against ${this.computer.name}`);
    console.log(`First to ${RPSGame.NEEDED_WINS} wins the match\n`);
  }

  logMoves() {
    const NAMES = { r: 'rock', p: 'paper', s: 'scissors'};
    console.log(`\nYou play: ${NAMES[this.human.move]}`);
    console.log(`${this.computer.name} plays: ${NAMES[this.computer.move]}`);
  }

  calcWinner() {
    let humMove = this.human.move;
    let compMove = this.computer.move;
    if ((humMove === 'r' && compMove === 's') ||
        (humMove === 's' && compMove === 'p') ||
        (humMove === 'p' && compMove === 'r')) {
      this.winner = this.human;
      this.score[0] += 1;
    } else if (humMove === compMove) {
      this.winner = 'tie';
    } else {
      this.winner = this.computer;
      this.score[1] += 1;
    }
  }

  announceWinner() {
    if (this.winner === this.human) {
      console.log(`${this.human.name} wins this game!`);
    } else if (this.winner === 'tie') {
      console.log('This game is a tie');
    } else {
      console.log(`${this.computer.name} wins this game!`);
    }

    console.log();
    console.log(`The match stands at:`);
    console.log(`${this.human.name}: ${this.score[0]}`);
    console.log(`${this.computer.name}: ${this.score[1]}`);
  }

  reset() {
    this.human.move = null;
    this.computer.move = null;
    this.winner = null;
  }

  goodbye() {
    console.log('Thanks for playing! Goodbye');
  }
}

// let testGame = new RPSGame(true);
// testGame.play();
let game = new RPSGame();
game.play();