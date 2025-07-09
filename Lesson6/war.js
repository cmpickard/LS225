/*
In this procedural game, two players split a deck of cards, each getting half
of the shuffled deck.

Then, they both reveal the top card of their pile, and the person with the
higher rank card "wins" the contest and both of the cards played go into their
discard pile. If the two drawn cards are the same, then each players lays down
another card and the winner takes all four cards. If the second pair is a tie...
etc. If one player runs out of playable cards before there's a tiebreaker, then
the other player wins. (players can shuffle in their discard piles for ties
though)

When a player runs out of cards, they shuffle all the cards in their discard
deck, and that shuffled deck becomes their play-deck.

The game continues until one player has no cards either in hand or in their
discard deck. that player loses.

noun:
deck, card, player, play-deck, discard pile

verb:
split, shuffle, play, take, win/lose

Classes:
Game - has 2 Players, 1 full deck
  -> play, welcome, goodbye
  -> play round -- tells both players to grab and play a card
    -> compare cards, can loop until winner, then:
    -> distribute all played cards to victor's discard pile

Player - has 1 play-deck, 1 discard-pile
  -> can remove one randomly selected card and play it
  -> can check if play-deck empty and call for a reset
    -> shuffle discard then push shuffled cards out to playDeck

Deck - has 52 cards
  -> constructor creates 52 cards, has method for distributing 26 to each player
  -> shuffle

Card - has value, rank, suit


Do I want to use the same Deck class for the full deck + the discard pile +
the play deck? Maybe it makes more sense to use a simple
array for those, and maybe static methods on Deck for shuffling?

Or, actually, maybe I should have a subtype, PlayDeck that inherits from Deck
and a subtype DiscardPile that inherits from Deck. YES, i like that
*/

class Card {
  constructor(suit, rank, value) {
    this.rank = rank;
    this.suit = suit;
    this.value = value;
  }

  toString() {
    return `${this.rank} of ${this.suit}`;
  }
}

class Deck {
  static SUITS = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
  static RANKS = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen',
    'King', 'Ace'];
  static VALUES = { 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, 10: 10,
    Jack: 11, Queen: 12, King: 13, Ace: 14 }

  constructor() {
    this.deck = Deck.shuffle(this.initDeck());
  }

  initDeck() {
    let deck = [];
    Deck.SUITS.forEach(suit => {
      Deck.RANKS.forEach(rank => {
        deck.push(new Card(suit, rank, Deck.VALUES[rank]));
      });
    });

    return deck;
  }

  assign(player1, player2) {
    for (let idx = 0; idx < this.deck.length; idx++) {
      if (idx < 26) {
        player1.playDeck.push(this.deck[idx]);
      } else {
        player2.playDeck.push(this.deck[idx]);
      }
    }
  }

  static shuffle(cards) {
    for (let times = 0; times < 3; times++) {
      for (let currIdx = 0; currIdx < cards.length; currIdx++) {
        let randIdx = Math.floor(Math.random() * cards.length);
        [cards[currIdx], cards[randIdx]] = [cards[randIdx], cards[currIdx]];
      }
    }

    return cards;
  }
}

class Player {
  static STARTING_HAND_SIZE = 26;

  constructor(name) {
    this.name = name;
    this.playDeck = [];
    this.discardPile = [];
  }

  isEmpty() {
    return this.playDeck.length === 0;
  }

  resetPlayDeck() {
    Deck.shuffle(this.discardPile);
    [this.discardPile, this.playDeck] = [this.playDeck, this.discardPile];
  }

  playCard() {
    return this.playDeck.pop();
  }

  totalCards() {
    return this.playDeck.length + this.discardPile.length;
  }
}

class War {
  constructor() {
    this.player1 = new Player('Player 1');
    this.player2 = new Player('Player 2');
    this.deck = new Deck();
    this.stakes = [];
    this.currCards = [];
    this.victor = null;
    this.rounds = 0;
  }

  play() {
    this.welcome();
    this.assignCards();
    while (this.player1.totalCards() > 0 && this.player2.totalCards() > 0) {
      while (this.victor === null &&
            (this.player1.totalCards() > 0 && this.player2.totalCards() > 0)) {
        this.playCards();
        this.displayPlay();
        this.assessCards();
      }
      this.settleOutcome();
    }
    this.announceWinner();
    this.goodbye();
  }

  welcome() {
    console.log('Welcome to WAR!');
  }

  assignCards() {
    this.deck.assign(this.player1, this.player2);
  }

  playCards() {
    if (this.player1.isEmpty()) this.player1.resetPlayDeck();
    if (this.player2.isEmpty()) this.player2.resetPlayDeck();

    let card1 = this.player1.playCard();
    let card2 = this.player2.playCard();
    this.stakes.push(card1, card2);
    this.currCards.push(card1, card2);
  }

  displayPlay() {
    console.log(`The current stakes are [${this.stakes.join(', ')}]\n`);
    console.log(`Player 1 has played a ${this.currCards[0].toString()}`);
    console.log(`Player 2 has played a ${this.currCards[1].toString()}\n`);
    console.log(`Player 1 has ${this.player1.totalCards()} cards left`);
    console.log(`Player 2 has ${this.player2.totalCards()} cards left`);
  }

  assessCards() {
    let card1 = this.currCards.shift();
    let card2 = this.currCards.shift();

    if (card1.value > card2.value) {
      console.log(`${card1.toString()} beats ${card2.toString()}!\n`);
      console.log('Player 1 wins this round');
      this.victor = this.player1;
    } else if (card1.value < card2.value) {
      console.log(`${card2.toString()} beats ${card1.toString()}!\n`);
      console.log('Player 2 wins this round');
      this.victor = this.player2;
    }
  }

  settleOutcome() {
    // clear out stakes
    // reset victor
    while (this.stakes.length !== 0) {
      this.victor.discardPile.push(this.stakes.pop());
    }

    this.victor = null;
    this.rounds += 1;
  }

  announceWinner() {
    if (this.player1.totalCards() === 0) {
      console.log('Player 2 wins!');
    } else {
      console.log('Player 1 wins!');
    }

    console.log(`This game of WAR was decided over ${this.rounds} rounds`);
  }

  goodbye() {
    console.log('Thanks for playing WAR! Goodbye!');
  }
}

let game = new War();
game.play();