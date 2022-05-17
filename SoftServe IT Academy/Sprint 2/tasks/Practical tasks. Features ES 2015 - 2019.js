/* 
    TODO: Task 1
    The function filterByN receives an array of integers, a number and a parameter (greater, less). 
    Print a new array, where all elements will be greater/less than this number
    By default, the number is 0, the parameter is greater.
    
    Example:
    filterNums([-1, 2, 4, 0, 55, -12, 3], 11, 'greater');  //[ 55]
    filterNums([-2, 2, 3, 0, 43, -13, 6], 6, 'less'); // [-2, 2, 3, 0, -13]
    filterNums([-2, 2, 3, 0, 43, -13, 6], -33, 'less'); //  []
    filterNums([-2, 2, 3, 0, 43, -13, 6]); // [2, 3, 43, 6]
    filterNums([-2, 2, 3, 0, 43, -13, 6], 23);  // [43]
*/

const filterNums = (arr, userNumber = 0, parameter = "greater") => {
  switch (parameter) {
    case "greater":
      return arr.filter((el) => userNumber < el);
    case "less":
      return arr.filter((el) => userNumber > el);
  }
};

/* 
    TODO: Task 2
    The user enters as arguments the number of seconds, minutes, hours, days, weeks, months, years. 
    Output how many seconds are in all this.
    All parameters are optional. Consider 30 days in a month

    Example:
    howMuchSec(12, 3); //192
    howMuchSec(1, 33, 22); //81181
    howMuchSec(); //0
*/

const howMuchSec = (...data) => {
  let [seconds, minutes, hours, days, weeks, months, years] = data;
  let result = 0;

  if (seconds) result += seconds;

  if (minutes) result += minutes * 60;

  if (hours) result += hours * 60 * 60;

  if (days) result += days * 24 * 60 * 60;

  if (weeks) result += weeks * 7 * 24 * 60 * 60;

  if (months) result += months * 30 * 24 * 60 * 60;

  if (years) result += years * 365 * 30 * 24 * 60 * 60;

  return result;
};

/* 
  TODO: Task 3 
  Find the maximum interval between two consecutive numbers. Numbers are entered as arguments

  Example:

  maxInterv(3, 5, 2, 7); //5
  maxInterv(3, 5, 2, 7, 11, 0, -2); //11
  maxInterv(3, 5); //2
  maxInterv(3); //0
*/

const maxInterv = (...numbers) => {
  let res = [];
  if (numbers.length === 1) return 0;

  for (let index = 0; index < numbers.length - 1; index++)
    res.push(Math.abs(numbers[index] - numbers[index + 1]));

  return Math.max(...res);
};

/* 
  TODO: Task 4
  The function takes any number of strings and returns the sum of their lengths.

  Example:
  console.log(sumOfLen('hello', 'hi')); //7
  console.log(sumOfLen('hi')); //2
  console.log(sumOfLen()); //0
  console.log(sumOfLen('hello', 'hi', 'my name', 'is')); //16
*/

const sumOfLen = (...userStr) => {
  return userStr.length !== 0
    ? userStr.map((el) => el.length).reduce((a, b) => a + b)
    : 0;
};

/* 
  TODO: Task 5
  Please, implement a function combineFunctions that takes any 
  number of functions as an argument and returns a function that is a composition of the arguments.

  For example:
  negate = function(x){ return -x; };
  halve = function(x){ return x / 2; };
  square = function(x){ return x * x; };
  double = function(x){ return 2 * x; };
  combineFunctions(negate, halve, square) should return a function
  square(halve(negate(x)))

  combineFunctions(negate, double) should return a function
  double(negate(x)))
*/

const combineFunctions =
  (...funcs) =>
  (initialArg) =>
    funcs.reduce((acc, func) => func(acc), initialArg);

/*
 TODO: Task 6
Suppose, you have an array of students:

let students = [{
  name: 'Anna',
  languages: ['English', 'Ukrainian'],
  age: 21
}, {
  name: 'Bob',
  languages: ['Polish', 'Spanish'], 
  age: 26 
}, { 
  name: 'Alice', 
  languages: ['Italian', 'Russian'], 
  age: 18 
}]

Please, implement a function getLanguages.
The function takes an array of students as a first parameter
and a condition on a student (function)
getLanguages should return an array of languages from students that satisfy a condition.

For example:
getLanguages(students, student => student.age < 26) should return
['English', 'Ukrainian',  'Italian', 'Russian']

getLanguages(students, student => student.name === 'Alice') should return
['Italian', 'Russian']

getLanguages(students) should return
['English', 'Ukrainian','Polish', 'Spanish', 'Italian', 'Russian']

Try to use reduce and not use loops to solve this task. 
*/

const getLanguages = (data, func) => {
  if ((data === null) | (data === undefined))
    throw new Error("Cant itarate over undefined or null");

  if (typeof func !== "function")
    return data.map((student) => student.languages).flat();

  return data
    .filter(func)
    .map((student) => student.languages)
    .flat();
};
