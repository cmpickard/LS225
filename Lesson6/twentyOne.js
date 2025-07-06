class Card {
  constructor(name, suit, value) {
    this.name = name;
    this.suit = suit;
    this.value = value;
  }
}

class Deck {
  static SUITS = ['Hearts', 'Clubs', 'Spades', 'Diamonds'];
  static CARD_VALS = {
    Two: 2,
    Three: 3,
    Four: 4,
    Five: 5,
    Six: 6,
    Seven: 7,
    Eight: 8,
    Nine: 9,
    Ten: 10,
    Jack: 10,
    Queen: 10,
    King: 10,
    Ace: 11,
  }

  constructor() {
    this.deck = this.initialize();
  }

  initialize() {
    let deck = [];
    for (let cardName in Deck.CARD_VALS) {
      for (let suit of Deck.SUITS) {
        deck.push(new Card(cardName, suit, Deck.CARD_VALS[cardName]));
      }
    }
    return deck;
  }

  hit() {
    let length = this.deck.length;
    let randomIdx = Math.floor(Math.random() * length);
    return this.deck.splice(randomIdx, 1)[0];
  }


  reset() {
    this.deck = this.initialize();
  }
}


class TwentyOne {
  constructor() {
    this.deck = new Deck();
    this.playerHand = [this.deck.hit(), this.deck.hit()];
    this.dealerHand = [this.deck.hit(), this.deck.hit()];
    this.dealerScore = this.evaluate(this.dealerHand);
    this.playerScore = this.evaluate(this.playerHand);
    this.readline = require('readline-sync');
    this.winner = null;
  }

  play() {
    this.intro();
    this.playerTurn();
    if (this.playerScore < 22) this.dealerTurn();
    this.determineOutcome();
    this.declareWinner();
  }

  intro() {
    console.log('Welcome to 21!');
    console.log();
  }

  displayHand(participant) {
    if (participant === 'player') {
      console.log('Your current hand:');
      this.playerHand.forEach(card => {
        console.log(`--> The ${card.name} of ${card.suit}`);
      });
    } else {
      console.log("The dealer's current hand:");
      this.dealerHand.forEach((card, idx) => {
        if (idx === 0) {
          console.log('--> HIDDEN CARD');
        } else {
          console.log(`--> The ${card.name} of ${card.suit}`);
        }
      });
    }
    console.log();
  }

  playerTurn() {
    while (true) {
      this.displayHand('dealer');
      this.displayHand('player');
      let move = null;
      while (move !== 'h' && move !== 's') {
        move = this.readline.question('Do you want to (h)it or (s)tay?\n');
      }

      if (move === 's') break;

      this.playerHand.push(this.deck.hit());
      this.playerScore = this.evaluate(this.playerHand);
      if (this.playerScore > 21) {
        this.displayHand('player');
        console.log('You busted!');
        break;
      }
    }

    this.playerScore = this.evaluate(this.playerHand);
  }

  evaluate(hand) {
    let countAces = 0;
    let sum = hand.reduce((sum, card) => sum + card.value, 0);

    hand.forEach(card => {
      if (card.name === 'Ace') countAces += 1;
    });

    while (sum > 21 && countAces > 0) {
      sum -= 10;
      countAces -= 1;
    }

    return sum;
  }

  dealerTurn() {
    while (this.dealerScore < 17) {
      this.dealerHand.push(this.deck.hit());
      this.dealerScore = this.evaluate(this.dealerHand);
    }

    if (this.dealerScore > 21) console.log('The dealer busted!');
  }

  determineOutcome() {
    if (this.playerScore > 21) {
      this.winner = 'The dealer';
    } else if (this.dealerScore > 21 || this.dealerScore < this.playerScore) {
      this.winner = 'You';
    } else if (this.dealerScore > this.playerScore) {
      this.winner = 'The dealer';
    } else {
      this.winner = 'No one (tie game)';
    }
  }

  declareWinner() {
    console.log(`You scored ${this.playerScore}`);
    console.log(`The dealer scored ${this.dealerScore}`);
    console.log(`The winner of this game is: ${this.winner}`);
  }
}

let game = new TwentyOne();
game.play();