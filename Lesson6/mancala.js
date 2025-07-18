/* eslint-disable max-statements */
/* eslint-disable max-lines-per-function */
/* eslint-disable max-len */
/*
 ____________________________________________________
|   |  /   \  /   \  /   \  /   \  /   \  /   \  |   |
|   | |  4  ||  4  ||  4  ||  4  ||  4  ||  4  | |   |
|   |  \___/  \___/  \___/  \___/  \___/  \___/  |   |
| 0 |   ___    ___    ___    ___    ___    ___   | 0 |
|   |  /   \  /   \  /   \  /   \  /   \  /   \  |   |
|   | |  4  ||  4  ||  4  ||  4  ||  4  ||  4  | |   |
|___|__\___/__\___/__\___/__\___/__\___/__\___/__|___|

DESCRIPTION:
In a game of mancala, each player takes turns selecting a pit and moving all
the stones out of that pit into the counterclockwise pits: one stone per pit
until the player runs out.

A player can only select one of the 6 pits on their side and they cannot select
a pit with no stones in it.

After selecting a pit, the player removes all the stones from that pit, then
places one stone in the adjacent pit, counterclockwise from teh selected pit,
then one stone in the adjacent pit counterclockwise of THAT pit, etc. The two
large troughs on the side count BOTH as pits for the purposes of placing stones
and as the players' score. After placing a stone in the right trough, the player
will then place a stone in the rightmost pit on the back row, etc. That procedes
through the back row, until hitting the back left pit. If the player has one or
more stones left, they *DO NOT* place a stone in the opponents trough, but
place their next stone in the front left pit.

There are two special events that can occur, depending on where the last stone
is placed.
1) If the last stone is placed in one's own trough, that player gets another
turn.
2) If the last stone is placed in an empty pit, that player gets to remove
the stone just placed and ALL the stone in the pit on the other side of the
board -- on the other player's side -- and place them on in their trough.

The game ends when one of the players cannot move -- i.e. when there are no
stones in any of the 6 pits on their side of the board. When this occurs, the
other player removes all the remaining stones from their side of the board
and places them in their trough.

The player with the most stones in their trough wins the game -- or they tie
if they have the same number of stones.

The game starts with exactly 4 stones in all 12 pits, and none in the two
troughs. In this version, the human player gets to play first.

For now, the computer will randomly select to play one of their pits from among
those that have stones in it


Nouns:
game, pit, stone, trough, point, player, turn, human, computer, board

Verb:
select, place, win, capture


OOP Design:
Game: board,
Board: pits, troughs
Pits / Troughs: stones
  --Do i want to treat the troughs like special pits?
  --I could have a subtype of pit, Trough extends Pit, and then those 2 are pits
  that can't have their stones removed and are skipped when the non-owner of the
  trough would otherwise insert a stone into it
Stone ? They don't have any interesting properties. I can just use an int as
a collaborator for each pit to keep track of the number of stones in it


Should I represent the pits/trough with a circular linked list?

CompTrough -> pit1 -> pit2 -> pit3 -> pit4 -> pit5 -> pit6 ->
HumanTrough -> pit7 -> pit8 -> pit9 -> pit10 -> pit11 -> pit12 -> CompTrough

That makes placing stones easier, but it makes other pit-based tasks harder.
Also, if comp plays stones from pit10, i'd need to traverse to pit11 before
starting to place stones... so that might ineffecient

maybe an array whose last element points back to its first element?
does that even help? how would i traverse such a thing

I think it's easiest to simply check whether im at the end of the pit array
and then loop back to the beginning
*/

const prompt = require('readline-sync');

class Pit {
  constructor() {
    this.stones = 4;
  }
}

class Trough extends Pit {
  constructor(owner) {
    super();
    this.owner = owner;
    this.stones = 0;
  }
}

class Board {
  static OPPOSITE_PITS = { 0: 12, 1: 11, 2: 10, 3: 9, 4: 8, 5: 7, 7: 5, 8: 4,
    9: 3, 10: 2, 11: 1, 12:0 };

  constructor() {
    this.pits = this.createPits();
  }

  createPits() {
    let pits = [];
    for (let num = 0; num < 14; num++) {
      if (num === 6) {
        pits.push(new Trough(num, 'human'));
      } else if (num === 13) {
        pits.push(new Trough(num, 'computer'));
      } else {
        pits.push(new Pit(num));
      }
    }

    return pits;
  }

  moveStones(pitIdx, opponent) {
    let player = opponent === 'computer' ? 'human' : 'computer';
    let stones = this.pits[pitIdx].stones;
    this.pits[pitIdx].stones = 0;

    let currPitIdx = pitIdx;
    while (stones > 0) {
      currPitIdx = (currPitIdx === 13) ? 0 : currPitIdx + 1;

      if (this.pits[currPitIdx].owner !== opponent) {
        this.pits[currPitIdx].stones += 1;
        stones -= 1;
      }
    }

    let playAgain = this.calcSpecialEvent(currPitIdx, player);
    return playAgain;
  }

  calcSpecialEvent(pitIdx, player, playAgain = false) {
    if ((player === 'human' && pitIdx === 6) ||
        (player === 'computer' && pitIdx === 13)) {
      playAgain = true;
    } else if (this.pits[pitIdx].stones === 1) {
      let opposite = Board.OPPOSITE_PITS[pitIdx];
      let stones = 1 + this.pits[opposite].stones;
      let troughIdx = (player === 'human') ? 6 : 13;
      this.pits[opposite].stones = 0;
      this.pits[pitIdx].stones = 0;
      this.pits[troughIdx].stones += stones;
    }

    return playAgain;
  }

  clearLastStones(human, computer) {
    human.PITNUMS.forEach(idx => {
      this.pits[6].stones += this.pits[idx].stones;
      this.pits[idx].stones = 0;
    });

    computer.PITNUMS.forEach(idx => {
      this.pits[13].stones += this.pits[idx].stones;
      this.pits[idx].stones = 0;
    });
  }

  display() {
    console.log('The board currently looks like this:');
    console.log(' ____________________________________________________');
    console.log('|   |  /   \\  /   \\  /   \\  /   \\  /   \\  /   \\  |   |');
    console.log(this.getCompRow());
    console.log('|   |  \\___/  \\___/  \\___/  \\___/  \\___/  \\___/  |   |');
    console.log(this.getTroughRow());
    console.log('|   |  /   \\  /   \\  /   \\  /   \\  /   \\  /   \\  |   |');
    console.log(this.getHumanRow());
    console.log('|___|__\\___/__\\___/__\\___/__\\___/__\\___/__\\___/__|___|');
    console.log();
  }

  formatStones(start, end) {
    let stones = [];
    for (let idx = start; idx <= end; idx++) {
      stones.push(String(this.pits[idx].stones));
    }

    return stones.map(stone => {
      return stone.length === 1 ? stone + ' ' : stone;
    });
  }

  getCompRow() {
    let stones = this.formatStones(7, 12);

    return '|   | |  ' +
    stones[5] + ' ||  ' + stones[4] + ' ||  ' +
    stones[3] + ' ||  ' + stones[2] + ' ||  ' +
    stones[1]  +  ' ||  ' + stones[0] + ' | |   |';
  }

  getTroughRow() {
    let trough1 = String(this.pits[13].stones);
    let trough2 = String(this.pits[6].stones);
    trough1 = trough1.length === 1 ? trough1 + ' ' : trough1;
    trough2 = trough2.length === 1 ? trough2 + ' ' : trough2;
    return `| ${trough1}|   ___    ___    ___    ` +
    `___    ___    ___   |${trough2} |`;
  }

  getHumanRow() {
    let stones = this.formatStones(0, 5);

    return '|   | |  ' +
    stones[0] + ' ||  ' + stones[1] + ' ||  ' +
    stones[2] + ' ||  ' + stones[3] + ' ||  ' +
    stones[4] + ' ||  ' + stones[5] + ' | |   |';
  }
}

class Player {
  constructor() {
    this.points = 0;
  }

  hasStones(board) {
    let stones = this.PITNUMS.map(idx => {
      return board.pits[idx].stones;
    });

    return stones.some(stone => stone !== 0);
  }
}

class Human extends Player {
  constructor() {
    super();
    this.name = 'Human';
    this.PITNUMS = [0, 1, 2, 3, 4, 5];
  }

  takeTurn(board, test = false) {
    let play = true;
    while (play) {
      let ans;
      // board.display();
      console.log('Which pit would you like to play from?');

      while (ans === undefined) {
        if (test) {
          ans = Math.floor((Math.random() * 6));
          console.log(`Human selects pit number ${ans}`);
        } else {
          let options = this.PITNUMS.join(', ');
          ans = Number(prompt.question(`Enter ${options} to select a pit\n`));
        }

        if (!this.PITNUMS.includes(ans)) {
          ans = undefined;
          console.log('Not a valid selection!');
        } else if (board.pits[ans].stones === 0) {
          ans = undefined;
          console.log("That pit's empty. Select a pit with at least one stone");
        } else {
          play = (board.moveStones(ans, 'computer') && this.hasStones(board));

          if (play) {
            console.log('You get to play again!');
            board.display();
          }
        }
      }
    }
  }
}

class Computer extends Player {
  constructor() {
    super();
    this.name = 'Computer';
    this.PITNUMS = [7, 8, 9, 10, 11, 12];
  }

  takeTurn(board) {
    let play = true;
    while (play && this.hasStones(board)) {
      let choices = this.PITNUMS.filter(idx => {
        return board.pits[idx].stones > 0;
      });

      let randIdx = Math.floor(Math.random() * choices.length);
      console.log(`The computer has chosen pit ${choices[randIdx]}`);
      prompt.question('PRESS ENTER');
      play = board.moveStones(choices[randIdx], 'human');
      board.display();
    }
  }
}

class Mancala {
  constructor() {
    this.board = new Board();
    this.human = new Human();
    this.computer = new Computer();
  }

  play() {
    this.welcome();
    this.board.display();
    while (this.human.hasStones(this.board) &&
           this.computer.hasStones(this.board)) {
      this.human.takeTurn(this.board, false);
      this.board.display();
      if (!this.computer.hasStones(this.board) ||
          !this.human.hasStones(this.board)) break;
      this.computer.takeTurn(this.board);
    }

    this.calcWinner();
    this.goodbye();
  }

  welcome() {
    console.log('Welcome to Mancala!');
    console.log('You play first. Here is the starting board:');
  }

  calcWinner() {
    this.board.clearLastStones(this.human, this.computer);
    let humanPoints = this.board.pits[6].stones;
    let computerPoints = this.board.pits[13].stones;
    this.board.display();
    let winner;
    if (humanPoints === computerPoints) {
      winner = 'No one is';
    } else if (humanPoints > computerPoints) {
      winner = 'You are';
    } else {
      winner = 'The computer is';
    }

    this.announceWinner(winner, humanPoints, computerPoints);
  }

  announceWinner(winner, humanPoints, computerPoints) {
    let ending = (this.human.hasStones(this.board)) ? 'the computer' : 'you';
    console.log(`The game has ended b/c ${ending} have no moves to make.`);
    console.log(`You scored: ${humanPoints} points`);
    console.log(`The computer scored: ${computerPoints} points`);
    console.log(`${winner} the winner`);
  }

  goodbye() {
    console.log('Thanks for playing Mancala. Goodbye');
  }
}

let game = new Mancala();
game.play();