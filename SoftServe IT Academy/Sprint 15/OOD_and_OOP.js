// Task 1
// Using the default parameter technique, overload the overloadedFunc() function, which takes 3 arguments.
// For the 1st argument of the function set the default value [1, 2, 3],
// for the 2nd - the value 2, for the 3rd - the function that returns the product of the first two arguments,
// and the function can multiply both arrays and numbers.
// The overloadedFunc() function returns the result of the default function.

function overloadedFunc(
  arg1 = [1, 2, 3],
  arg2 = 2,
  arg3 = (arg1, arg2) =>
    Array.isArray(arg1) ? arg1.map((el) => el * arg2) : arg1 * arg2
) {
  return arg3(arg1, arg2);
}

// Task 2
// The SpeedLimiter class constructor accepts 2 parameters: the current vehicle speed and an overspeed warning function.
// The current vehicle speed and warning function must be stored in privateSpeed ​​and privateWarning using WeakMap().
// Private variables are initialized in the class constructor.

// The privateWarning function is called when the current privateSpeed ​​vehicle speed exceeds the maximum permissible speed of 200 km / h.
// The warning function displays the message "You are driving too fast! Your speed is reduced."

// The SpeedLimiter class has an accelerate(value) method, which increases the current speed of the car by the value value (the result is written in the private variable privateSpeed), displays the current speed value in the console. If the value of the current speed exceeds the maximum allowable, the function is called, which is contained in privateWarning, which generates a warning message,
// and the value of the speed is reduced to the maximum allowable, and displayed in the console.
const privateSpeed = new WeakMap();
const privateWarning = new WeakMap();

class SpeedLimiter {
  constructor(currentSpeed, warning) {
    privateSpeed.set(this, currentSpeed);
    privateWarning.set(this, warning);
  }

  accelerate(value) {
    const maxSpeed = 200;
    let currentSpeed = privateSpeed.get(this);

    currentSpeed += value;

    console.log(`Current speed: ${currentSpeed} km/h`);
    privateSpeed.set(this, currentSpeed);

    if (currentSpeed >= maxSpeed) {
      privateWarning.get(this)();
      privateSpeed.set(this, maxSpeed);
      console.log(`Current speed: ${privateSpeed.get(this)} km/h`);
    }
  }
}

// Task 3
// Implement 5 functions that take strings of data and process them in a certain way.

// 1) The upperCase() function takes string data as an argument  and returns it to uppercase..
// 2) The tripleExclaim() function takes string data as an argument  and returns it by adding three exclamation marks to it.
// 3) The split() function takes a separator as an argument, returns a function that accepts string data that is split by the separator character into an ordered set of substrings, and returns an array of those substrings.
// 4) The join() function takes separator as an argument, returns a function that takes an array of string data that is concatenated into a string by separator, and returns that string.
// 5) The copy() function takes string data as an argument and returns it repeating 2 times.

// Implement the createComposition() function, which can take any number of functions as arguments, and create a composition from them. The createComposition() function takes our 5 functions as arguments. The createComposition() function returns a function that takes its initial value as an argument. This nested function successively passing through an array of functions with each iteration returns the result of calling the accumulated value of the current function-argument. The reduce() method can be used here.
// The final function result is assigned the function createComposition(), which takes as arguments in the appropriate order our 5 functions.

// Tips.
// Consider that the result of one function can be passed as an argument to another function.
// Pay attention to the order of the function arguments.
// If you are having difficulty implementing the createComposition() function, check out the "Useful links" for the material on function composition.

// Usage example:
// implementation of 5 atomic functions
// implementation of createComposition function
// const result = createComposition( // 5 function-arguments )
// console.log(result("by_ticket_now"));  //  BY TICKET NOW!!! BY TICKET NOW!!!
// console.log(result("total sale")); //  TOTAL SALE!!! TOTAL SALE!!!

const upperCase = (str) => str.toUpperCase();
const split = (pattern) => (str) => str.split(pattern);
const join = (separator) => (str) => str.join(separator);
const tripleExclaim = (str) => `${str}!!!`;
const copy = (str) => `${str} `.repeat(2);

const createComposition =
  (...funcs) =>
  (initial) =>
    funcs.reduceRight((sum, curFunc) => curFunc(sum), initial);

const result = createComposition(
  copy,
  tripleExclaim,
  join(" "),
  split("_"),
  upperCase
);

// Task 4
// Implement the Plane class, the constructor of which accepts 3 parameters model - model of the plane,
// fuelSupply - capacity of a stock of fuel of the plane, fuelConsumption - average fuel consumption in liters on 100 km of flight.
// Create a method of class calcFlightRange(), which determines the range of the plane
// by the formula fuelSupply / fuelConsumption * 100 and returns it.
// Create a static method of class sortFlightRange(planesArray),
// which takes an array of instances of class planesArray, sorts the flight range of plane in ascending order and outputs the
// result to the console in the format plane_model: range.
// Create a TransportPlane class, which is inherited from the Plane class,
// the constructor of which takes 5 parameters model - plane model, fuelSupply - the amount of fuel,
// fuelConsumption - the average fuel consumption in liters per 100 km, cargo - maximum tonnage,
// addTank - about additional tanks of the plane  In this class, you need to override the calcFlightRange()
// method to take into account that the fuelSupply has increased the amount of fuel added by the addTank.
// Create a class PassengerPlane, which is inherited from the class Plane,
// whose constructor accepts 5 parameters model, fuelSupply, fuelConsumption,
// passengers - the maximum number of passengers, refueling - the amount of additional fuel received in the refueling.
//  In this class, you need to override the calcFlightRange() method to take into account that the fuelSupply has increased refueling.
// Create a WarPlane class, which is inherited from the Plane class,
// the constructor of which accepts 5 parameters model, fuelSupply, fuelConsumption,
// missiles - the number of missile weapons, aerodynamicsKoef - the coefficient of aerodynamics of the plane. In this class,
//  you need to override the calcFlightRange() method in such a way as to take into account that the flight range of the plane
//  increases in proportion to the value of the aerodynamics coefficient of aerodynamicsKoef.

// Usage example:
// console.log("Unsorted range of planes:");
// const plane1 = new TransportPlane("An-225 Mriya", 105000, 5000, 500, 300000);
// console.log("An-225 Mriya: ", plane1.calcFlightRange());
// const plane2 = new PassengerPlane("Boeing-747", 193000, 2500, 410, 90000);
// console.log("Boeing-747:", plane2.calcFlightRange());
// const plane3 = new WarPlane("F-22 Raptor", 8200, 320, 20, 1.2);
// console.log("F-22 Raptor:", plane3.calcFlightRange());
// console.log("Sorted range of planes:");
// const planesArray = [plane1, plane2, plane3];
// Plane.sortFlightRange(planesArray);

// Output in console:
// Unsorted range of planes:
// An-225 Mriya:  8100
// Boeing-747:  11320
// F-22 Raptor:  3075
// Sorted range of planes:
// F-22 Raptor: 3075
// An-225 Mriya: 8100
// Boeing-747: 11320

class Plane {
  constructor(model, fuelSupply, fuelConsumption) {
    this.model = model;
    this.fuelSupply = fuelSupply;
    this.fuelConsumption = fuelConsumption;
  }

  calcFlightRange() {
    return (this.fuelSupply / this.fuelConsumption) * 100;
  }

  static sortFlightRange(planesArray) {
    let sortedRange = planesArray.sort(
      (a, b) => a.calcFlightRange() - b.calcFlightRange()
    );

    sortedRange.forEach((el) =>
      console.log(`${el.model}: ${el.calcFlightRange()}`)
    );
  }
}

class TransportPlane extends Plane {
  constructor(model, fuelSupply, fuelConsumption, cargo, addTank) {
    super(model, fuelSupply, fuelConsumption);
    this.cargo = cargo;
    this.addTank = addTank;
  }

  calcFlightRange() {
    return ((this.fuelSupply + this.addTank) / this.fuelConsumption) * 100;
  }
}

class PassengerPlane extends Plane {
  constructor(model, fuelSupply, fuelConsumption, passengers, refueling) {
    super(model, fuelSupply, fuelConsumption);
    this.passengers = passengers;
    this.refueling = refueling;
  }

  calcFlightRange() {
    return ((this.fuelSupply + this.refueling) / this.fuelConsumption) * 100;
  }
}

class WarPlane extends Plane {
  constructor(model, fuelSupply, fuelConsumption, missiles, aerodinamiscKoef) {
    super(model, fuelSupply, fuelConsumption);
    this.missiles = missiles;
    this.aerodinamiscKoef = aerodinamiscKoef;
  }

  calcFlightRange() {
    return super.calcFlightRange() * this.aerodinamiscKoef;
  }
}
