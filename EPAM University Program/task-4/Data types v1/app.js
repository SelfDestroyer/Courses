// =================================================
// Вхідні дані
const inputData = [
  {
    _id: "5b5e3168c6bf40f2c1235cd6",
    index: 0,
    age: 39,
    eyeColor: "green",
    name: "Stein",
    favoriteFruit: "apple",
  },
  {
    _id: "5b5e3168e328c0d72e4f27d8",
    index: 1,
    age: 38,
    eyeColor: "blue",
    name: "Cortez",
    favoriteFruit: "strawberry",
  },
  {
    _id: "5b5e3168cc79132b631c666a",
    index: 2,
    age: 2,
    eyeColor: "blue",
    name: "Suzette",
    favoriteFruit: "apple",
  },
  {
    _id: "5b5e31682093adcc6cd0dde5",
    index: 3,
    age: 17,
    eyeColor: "green",
    name: "Weiss",
    favoriteFruit: "banana",
  },
];
const number = 54321;
const arr = [2, 3, 12, 6];
const testObj = { keyOne: 1, keyTwo: 2, keyThree: 3 };
// =================================================
// Task 1
function reverseNumber(num) {
  let newNumber = 0;
  const decade = 10;

  if ((num === null) | (num === undefined)) {
    throw new Error("invalid value");
  }

  if (!Number.isInteger(num)) {
    throw new Error("invalid value");
  }

  while (num) {
    newNumber = newNumber * decade + (num % decade);
    num = ~~(num / decade);
  }

  return newNumber;
}
console.log("Завдання № 1");
console.log(reverseNumber(number));
console.log(reverseNumber(-number));

// =================================================

// Task 2
function forEach(arr, func) {
  if ((arr === null) | (arr === undefined)) {
    throw new Error("Cant itarate over undefined or null");
  }
  if (typeof func !== "function") {
    throw new Error("Callback is not a function");
  }

  for (let index = 0; index < arr.length; index++) {
    func(arr[index]);
  }
}
console.log("\nЗавдання № 2");
console.log(
  forEach(arr, (el) => {
    console.log(el);
  })
);
// =================================================

// Task 3
function map(arr, func) {
  let result = [];

  forEach(arr, (el) => {
    result.push(func(el));
  });

  return result;
}
console.log("\nЗавдання № 3");
console.log(
  map(arr, (el) => {
    return el * 2;
  })
);
// =================================================

// Task 4
function filter(arr, func) {
  let result = [];

  forEach(arr, (el) => {
    if (func(el)) {
      result.push(el);
    }
  });
  return result;
}
console.log("\nЗавдання № 4");
console.log(
  filter(arr, (el) => {
    return el < 3;
  })
);
// =================================================

// Task 5
function getAdultAppleLovers(data) {
  let result = [];
  const minYear = 18;
  filter(data, (el) => {
    if (el.age > minYear && el.favoriteFruit === "apple") {
      result.push(el.name);
    }
  });

  return result;
}
console.log("\nЗавдання № 5");
console.log(getAdultAppleLovers(inputData));

// =================================================

// Task 6
function getKeys(Obj) {
  let result = [];
  for (const key in Obj) {
    result.push(key);
  }

  return result;
}
console.log("\nЗавдання № 6");
console.log(getKeys(testObj));

// =================================================

// Task 7
function getValues(Obj) {
  let result = [];
  for (const key in Obj) {
    result.push(Obj[key]);
  }

  return result;
}
console.log("\nЗавдання № 7");
console.log(getValues(testObj));
// =================================================

// Task 8
function showFormattedDate(date) {
  const month = date.toLocaleString("en", { month: "short" });
  const day = date.toLocaleString("en", { day: "numeric" });
  const year = date.toLocaleString("en", { year: "numeric" });

  return `It is ${day} of ${month}, ${year}`;
}
console.log("\nЗавдання № 8");
console.log(showFormattedDate(new Date("2018-08-27T01:10:00")));
// =================================================
