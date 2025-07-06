/* eslint-disable no-unused-vars */
// This exercise re-examines exercise 2 from the previous chapter. In that
// exercise, you wrote an object factory to instantiate objects that represent
// smartphones. In this exercise, we'll rewrite that factory using a class.

// Write a class that can be used to instantiate objects that represent
// smartphones. Each smartphone should have a brand, model, and release
// year. Add methods to check the battery level and to display the
// smartphone's information. Create objects that represent the following
// 2 smartphones:

// Brand Model Release Year
// Apple iPhone 12 2020
// Samsung Galaxy S21 2021

class Smartphone {
  constructor(brand, model, releaseYear) {
    this.brand = brand;
    this.model = model;
    this.releaseYear = releaseYear;
  }

  checkBatter() {}

  displayInfo() {}
}

let iphone = new Smartphone('Apple', 'iphone 12', '2020');
let galaxy = new Smartphone('Samsung', 'Galaxy S21', '2021');


// If you have a Dog class and an object assigned to a variable named boo,
// how can you tell whether the object is an instance of the Dog class?

/*
ANSWER:
boo instance of Dog
*/

// Create a class hierarchy consisting of vehicles, including cars, boats,
// and planes, as specific kinds of vehicles. All vehicles should be able
// to accelerate and decelerate. Cars should be able to honk, boats should
// be able to drop anchor, and planes should be able to take off and land.
// Test your code.

// All vehicles should have a color and weight. Cars have a license number,
// boats have a home port, and planes have an airline name.

class Vehicle {
  constructor(color, weight) {
    this.color = color;
    this.weight = weight;
  }

  accelerate() {}

  decelerate() {}
}

class Car extends Vehicle {
  constructor(color, weight, licenseNumber) {
    super(color, weight);
    this.licenseNumber = licenseNumber;
  }

  honk() {}
}

class Boat extends Vehicle {
  constructor(color, weight, homePort) {
    super(color, weight);
    this.homePort = homePort;
  }

  dropAnchor() {}
}

class Plane extends Vehicle {
  constructor(color, weight, airline) {
    super(color, weight);
    this.airline = airline;
  }

  takeOff() {}

  land() {}
}

// Using the solution to the previous exercise, demonstrate that cars and
// boats are both instance objects of the Vehicle class, that cars are
// instance objects of the Car class, but boats are not instance objects
// of the Car class.

let car = new Car();
let boat = new Boat();

console.log(car instanceof Vehicle); // true
console.log(boat instanceof Vehicle); // true
console.log(car instanceof Car); // true
console.log(boat instanceof Car); // false