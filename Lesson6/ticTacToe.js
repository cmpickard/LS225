// In this assignment, you'll build a Tic Tac Toe game similar to the one you
// built in either PY120 or RB120.

// Begin by reviewing the assignments from PY120 and RB120 that pertain to the
// Tic Tac Toe game. Optionally, you can also include the Bonus Features
// assignment. Then, use an object-oriented approach to design your game;
// it doesn't have to follow the same structure as the Python or Ruby version:

// Write a textual description of the problem.
// Extract the significant nouns and verbs from the description.
// Organize and associate the verbs with the nouns.
// There are many ways to design and implement your code.

// We recommend starting with a minimally acceptable game: that is, a game in
// which each player takes their turn until the game is over, with the computer
// playing at random. You can then add some strategy code for the computer,
// then, finally, have the players keep playing until somebody has won, say,
// 3 games. In this final version, you may want to alternate who starts each
// game: the human or the computer.

// In the following code, we're adding some strategy for the computer.
// The strategy is as follows:
// If the computer can win with a single play, make that play.
// If the computer can't win with a single play, but the human can, then try
// to block that play.
// If neither player can win with a single play and the center square is empty,
// play the center square.
// If none of the above conditions apply, pick a square at random.


// Finally, we'll add some code for playing a multi-game match in which the
// first player to win 3 games wins the match as a whole. Which player goes
// first will alternate between the human and the computer.

class Square {
  constructor(num) {
    this.mark = ' ';
    this.num = num;
  }
}

class Board {
  static BLANK_LINE = '   |   |   ';
  static LINE = '---+---+---'

  constructor() {
    this.board = new Array(9).fill().map((_, idx) => new Square(idx));
  }

  markSquare(squareNumber, mark) {
    this.board[squareNumber].mark = mark;
  }

  topLine() {
    let mark1 = this.board[0].mark;
    let mark2 = this.board[1].mark;
    let mark3 = this.board[2].mark;
    return ` ${mark1} | ${mark2} | ${mark3} `;
  }

  midLine() {
    let mark1 = this.board[3].mark;
    let mark2 = this.board[4].mark;
    let mark3 = this.board[5].mark;
    return ` ${mark1} | ${mark2} | ${mark3} `;
  }

  bottomLine() {
    let mark1 = this.board[6].mark;
    let mark2 = this.board[7].mark;
    let mark3 = this.board[8].mark;
    return ` ${mark1} | ${mark2} | ${mark3} `;
  }

  display() {
    console.log(Board.BLANK_LINE);
    console.log(this.topLine());
    console.log(Board.BLANK_LINE);
    console.log(Board.LINE);
    console.log(Board.BLANK_LINE);
    console.log(this.midLine());
    console.log(Board.BLANK_LINE);
    console.log(Board.LINE);
    console.log(Board.BLANK_LINE);
    console.log(this.bottomLine());
    console.log(Board.BLANK_LINE);
    console.log();
  }

  reset() {
    this.board.forEach(square => {
      square.mark = ' ';
    });
  }
}

class TTTGame {
  static HUMAN_MARK = 'X';
  static COMPUTER_MARK = 'O';
  static WINNERS = /(012|345|678|0.*3.*6|1.*4.*7|2.*5.*8|0.*4.*8|2.*4.*6)/;

  constructor() {
    this.board = new Board();
    this.winner = null;
    this.readline = require('readline-sync');
    this.playerName = '';
    this.wins = [0,0];
  }

  play() {
    this.intro();
    while (true) {
      while (this.noWinner() && this.getOpenSpaces().length !== 0) {
        this.humanTurn();
        if (!this.noWinner() || this.getOpenSpaces().length === 0) break;
        this.computerTurn();
      }
      this.declareResult();

      if (this.wins[0] >= 3 || this.wins[1] >= 3) {
        this.declareVictor();
        break;
      }
    }
  }

  intro() {
    console.log('Welcome to Tic-Tac-Toe!');
    let answer;
    while (!answer) {
      answer = this.readline.question('What is your name?\n');
      // debug:
      // answer = 'Test';
      if (/[^A-Za-z. ]/.test(answer)) {
        answer = '';
        console.log('Invalid name!');
      } else {
        this.playerName = answer;
        break;
      }
    }
    console.log(`Greetings ${this.playerName}! You are playing as X's.`);
    console.log('First to win 3 games will be declared the victor');
  }

  noWinner() {
    let vals = this.board.board.map(square => square.mark);
    let exes = '';
    let ohs = '';

    vals.forEach((val, idx) => {
      if (val === 'X') {
        exes += String(idx);
      } else if (val === 'O') {
        ohs += String(idx);
      }
    });

    if (TTTGame.WINNERS.test(exes)) {
      this.winner = 'human';
      return false;
    } else if (TTTGame.WINNERS.test(ohs)) {
      this.winner = 'computer';
      return false;
    }

    return true;
  }

  setWinner(outcome) {
    this.winner = outcome;
  }

  getOpenSpaces() {
    return this.board.board.filter(square => square.mark === ' ');
  }

  humanTurn() {
    console.log("Here's the current board:\n");
    this.board.display();
    console.log("Which square would you like to mark?");
    let answer;
    let spaces = this.getOpenSpaces().map(square => String(square.num));
    while (!answer) {
      answer = this.readline.question('Enter a digit 0-8.\n');
      //debug:
      // answer = 1;
      if (!spaces.includes(answer)) {
        console.log("Invalid square designation");
        answer = '';
      } else {
        this.board.markSquare(Number(answer), TTTGame.HUMAN_MARK);
      }
    }
  }

  computerTurn() {
    let spaces = this.getOpenSpaces().map(square => square.num);
    let choice;
    let compNextPlay = this.findWinningChoice('O');
    let humanNextPlay = this.findWinningChoice('X');
    this.winner = null;
    if (compNextPlay !== -1) {
      choice = compNextPlay;
    } else if (humanNextPlay !== -1) {
      console.log('here!');
      choice = humanNextPlay;
    } else if (this.board.board[4].mark === ' ') {
      choice = 4;
    } else {
      choice = spaces[Math.floor(Math.random() * spaces.length)];
    }

    // choice = spaces[choice];
    console.log(`computer has chosen to play square ${choice}`);
    this.board.markSquare(choice, TTTGame.COMPUTER_MARK);
  }

  findWinningChoice(mark) {
    let options = this.getOpenSpaces();

    for (let square of options) {
      this.board.markSquare(square.num, mark);
      if (!this.noWinner()) {
        this.board.markSquare(square.num, ' ');
        console.log(`the winning choice is ${square.num}`);
        return square.num;
      } else {
        this.board.markSquare(square.num, ' ');
      }
    }

    return -1;
  }

  declareResult() {
    this.board.display();
    if (this.winner === null) {
      console.log('This game ended in a draw');
    } else if (this.winner === 'human') {
      console.log(`You won!`);
      this.wins[0] += 1;
    } else {
      console.log('You lost.');
      this.wins[1] += 1;
    }

    console.log(`You've won ${this.wins[0]} games and lost ${this.wins[1]}`);
    this.board.reset();
  }

  declareVictor() {
    if (this.wins[0] >= 3) {
      console.log('You won this series!');
    } else {
      console.log('You lost the series');
    }

    console.log('Thanks for playing! Goodbye');
  }
}

let game = new TTTGame();
game.play();
