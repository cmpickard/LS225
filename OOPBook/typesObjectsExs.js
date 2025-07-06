/* eslint-disable no-unused-vars */
/* eslint-disable no-tabs */
// Create an object that represents a Cessna 152 aircraft. The aircraft should
// include information that shows its fuel capacity of 24.5 gallons and a
// cruising speed of 111 knots. The aircraft should be able to take off and
// land.
// Identify the state and behavior items in this object.

let cessna = {
  fuelCapacity: 24.5,
  cruisingSpeed: 111,

  takeOff() {
    console.log('I am taking off');
  },

  land() {
    console.log('I am landing');
  },
};

// Write a simple constructor function that creates objects that represent books
// Each book should have a title, author, and the year published. Create
// objects that represent the following books:

// Title	Author	Year Published
// Neuromancer	William Gibson	1984
// Doomsday Book	Connie Willis	1992
// When you are done, identify the type of the objects created, the constructor
// function, and the instance objects.

function Book(title, author, yearPub) {
  this.title = title;
  this.author = author;
  this.yearPub = yearPub;
}

let neuro = new Book('Neuromancer', 'William Gibson', 1994);
let dooms = new Book('Doomsday Book', 'Connie Willis', 1992);
console.log(neuro, dooms);

// Write a simple constructor function that creates objects that represent
// musical albums. Each album should have a title, artist, and release year.
// Create objects that represent the following 2 albums:

// Title	Artist	Release Year
// Thriller	Michael Jackson	1982
// The Dark Side of the Moon	Pink Floyd	1973

// When you are done, identify the type of the objects created, the constructor
// function, and the instance objects.

function Album(title, author, releaseYear) {
  this.title = title;
  this.author = author;
  this.releaseYear = releaseYear;
}

let thriller = new Album('Thriller', 'Michael Jackson', 1982);
let darkSide = new Album('The Dark Side of the Moon', 'Pink Floyd', '1973');

// Write a constructor function that creates objects that represent smartphones
// Each smartphones should have a brand, model, and release year. Add methods to
// check the battery level and to display the smartphones's information. Create
// objects that represent the following two smartphones:
// Brand	Model	Release Year
// Apple	iPhone 12	2020
// Samsung	Galaxy S21	2021

function Smartphone(brand, model, releaseYear) {
  this.brand = brand;
  this.model = model;
  this.releaseYear = releaseYear;

  this.checkBatteryLevel = function() {
    let level = Math.floor(100 * Math.random());
    console.log(`Battery is at ${level}%.`);
  };

  this.displayInfo = function() {
    console.log(`This is a ${releaseYear} ${brand} ${model}`);
  };
}

let apple = new Smartphone('Apple', 'iphone 12', 2020);
let samsung = new Smartphone('Samsung', 'Galaxy S21', 2021);
apple.checkBatteryLevel();
apple.displayInfo();
samsung.checkBatteryLevel();
samsung.displayInfo();