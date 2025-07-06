/* eslint-disable no-unused-vars */
// Given the following three objects, create an object factory that can
// eliminate the code duplication:

// let apple = {
//   name: 'Apple',
//   color: 'Red',

//   isRipe: function() {
//     return `This ${this.name} is ripe.`;
//   },

//   describe: function() {
//     return `This ${this.name} is ${this.color}.`;
//   },
// };

// let banana = {
//   name: 'Banana',
//   color: 'Yellow',

//   isRipe: function() {
//     return `This ${this.name} is ripe.`;
//   },

//   describe: function() {
//     return `This ${this.name} is ${this.color}.`;
//   },
// };

// let blackberry = {
//   name: 'Blackberry',
//   color: 'Black',

//   isRipe: function() {
//     return `This ${this.name} is ripe.`;
//   },

//   describe: function() {
//     return `This ${this.name} is ${this.color}.`;
//   },
// };

function createFruit(name, color) {
  return {
    name,
    color,
    isRipe() {
      return `This ${this.name} is ripe.`;
    },
    describe() {
      return `This ${this.name} is ${this.color}.`;
    },

  };
}

let blackberry = createFruit('Blackberr', 'Black');
let banana = createFruit('Banana', "Yellow");
let apple = createFruit('Apple', 'Red');


// This exercise re-examines exercise 4 from the previous chapter. In that
// exercise, you wrote a constructor function to instantiate smartphone objects
// In this exercise, we'll rewrite that constructor as an object factory.

// Write a factory function that creates objects that represent smartphones.
// Each smartphone should have a brand, model, and release year. Add methods
// to check the battery level and to display the smartphones's information.
// Create objects that represent the following two smartphones:

// Brand Model Release Year
// Apple iPhone 12 2020
// Samsung Galaxy S21 2021

function createPhone(brand, model, releaseYear) {
  return {
    brand,
    model,
    releaseYear,
    checkBattery() {},
    info() {},
  };
}

let iphone = createPhone('Apple', 'iphone 12', '2020');
let galaxy = createPhone('Samsung', 'Galaxy S21', '2021');

// Create an object factory that returns objects representing musical
// instruments. Each instrument should have a name and a type. Users of
// these objects should be able to play the instrument and show its type.
// Use the factory function to create three instruments:

// A cello is a string instrument.
// A flute is a wind instrument.
// A drum is a percussion instrument.
// let violin = createInstrument('violin', 'string');
// violin.play();     // We are playing a tune on this violin
// violin.showType(); // This violin is a string instrument

// let flute = createInstrument('flute', 'wind');
// flute.play();      // We are playing a tune on this flute
// flute.showType();  // This flute is a wind instrument

// let drum = createInstrument('drum', 'percussion');
// drum.play();       // We are playing a tune on this drum
// drum.showType();   // This drum is a percussion instrument

function createInstrument(name, type) {
  return {
    name,
    type,
    play() { return `we are playing a tune on this ${name}`},
    showType() { return `this ${name} is a ${type} instrument`},
  };
}

let cello = createInstrument('cello', 'string');
let flute = createInstrument('flute', 'wind');
let drum = createInstrument('drum', 'percussion');