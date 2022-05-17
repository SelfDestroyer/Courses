/*
Task № 1
Implement the getPromise(delay, message) function, which takes an integer number delay  (between 0 and 2000) 
and string message and returns a Promise that waits for specified amount of time (using delay argument) and resolves with the message.
*/
function getPromise(delay, message) {
  return new Promise((resovle, reject) =>
    setTimeout(() => resovle(message), delay)
  );
}

/*
Task № 2
Write an add(x, y) function that takes two arguments x and y. 
The function should return a Promise that resolves with the sum of the two arguments if they are Numbers, 
or rejects with the message "Error!" otherwise.
*/

function add(x, y) {
  return new Promise((resolve, reject) => {
    if (typeof x | (typeof y !== "number")) reject("Error!");
    else resolve(x + y);
  });
}

/*
Task № 3
Implement the getAge() function to get user age. 
To find his age you need to call a getUser() async function that return a user object in format {role: "somerole", id: 1}. 
To get the actual user info you need to call another function getUserProfile(id), 
that uses id returned from the previous function and return user info as an object 
*/

const { getUser, getUserProfile } = require("./Helper.js");

async function getAge() {
  return (await getUserProfile((await getUser()).id)).age;
}

/*
Task № 4
Implement the take() function that converts a sequence of iterated values into a sequence of length n.

Example usage:

const arr = ['a', 'b', 'c', 'd'];
for (const x of take(2, arr)) {
console.log(x);
}

Output:
  a
  b
*/

function* take(n, iterable) {
  for (let el = 0; el < n; el++) yield iterable[el];
}
