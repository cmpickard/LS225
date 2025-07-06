// This exercise re-examines exercise 1 from the previous chapter. In that
// exercise, you wrote a class to instantiate smartphone objects. In this
// exercise, we'll rewrite that solution using the constructor/prototype pattern

// Using the constructor/prototype pattern, create a type that represents
// smartphones. Each smartphone should have a brand, model, and release
// year. Add methods that display the smartphone's information and check
// its battery level. Create objects that represent the following two
// smartphones:

// Brand Model Release Year
// Apple iPhone 12 2020
// Samsung Galaxy S21 2021

function Smartphone(brand, model, releaseYear) {
  this.brand = brand;
  this.model = model;
  this.releaseYear = releaseYear;
}

Smartphone.prototype.displayInfo = function() {
  console.log(`${this.releaseYear} ${this.brand} ${this.model}`);
};

Smartphone.prototype.checkBattery = function() {
  console.log('Dead');
};

let iphone12 = new Smartphone('Apple', 'iphone 12', '2020');
let galaxyS21 = new Smartphone('Samsung', 'Galaxy S21', '2021');

iphone12.checkBattery();
// Apple iPhone 12 has 75% battery remaining.

iphone12.displayInfo();
// 2020 Apple iPhone 12

galaxyS21.checkBattery();
// Samsung Galaxy S21 has 75% battery remaining.

galaxyS21.displayInfo();
// 2021 Samsung Galaxy S21


// This exercise re-examines exercise 3 from the previous chapter. In that
// exercise, you wrote a class hierarchy to represent vehicles of various
// types. In this exercise, we'll rewrite that solution using the
// constructor/prototype pattern.

// Using the constructor/prototype pattern, create some types that represent
// vehicles, including cars, boats, and planes as specific kinds of vehicles
// All vehicles should be able to accelerate and decelerate. Cars should be
// able to honk, boats should be able to drop anchor, and planes should be
// able to take off and land. Test your code.

function Vehicle(color, weight) {
  this.color = color;
  this.weight = weight;
}

Vehicle.prototype.accelerate = function() {};
Vehicle.prototype.decelerate = function() {};

function Car(color, weight, licenseNumber) {
  Vehicle.call(this, color, weight);
  this.licenseNumber = licenseNumber;
}

Car.prototype = Object.create(Vehicle.prototype);
Car.prototype.constructor = Car;
Car.prototype.honk = function() {};

function Boat(color, weight, homePort) {
  Vehicle.call(this, color, weight);
  this.homePort = homePort;
}

Boat.prototype = Object.create(Vehicle.prototype);
Boat.prototype.constructor = Boat;
Boat.prototype.dropAnchor = function() {};

function Plane(color, weight, airline) {
  Vehicle.call(this, color, weight);
  this.airline = airline;
}

Plane.prototype = Object.create(Vehicle.prototype);
Plane.prototype.constructor = Plane;
Plane.prototype.takeOff = function() {};
Plane.prototype.land = function() {};

let car = new Car('red', 3300, 'BXY334');
console.log(car.color, car.weight, car.licenseNumber);
// red 3300 BXY334

let boat = new Boat('yellow', 12000, 'Bahamas');
console.log(boat.color, boat.weight, boat.homePort);
// yellow 12000 Bahamas

let plane = new Plane('blue', 83000, 'Southwest');
console.log(plane.color, plane.weight, plane.airline);
// blue 83000 Southwest