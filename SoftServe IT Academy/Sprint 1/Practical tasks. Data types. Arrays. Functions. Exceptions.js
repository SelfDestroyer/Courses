/*
  TODO Task 1
  Implement the getModifiedArray(array) function, which takes an arbitrary array, 
  and returns an array with the value of the first element of the array equal to “Start”, 
  the last element of the array equal to “End” and the rest of elements should be the same as in an initial array. 
  The initial array should stay unchanged.

  Function example:
  getModifiedArray([12, 6, 22, 0, -8])); // [‘Start’, 6, 22, 0, ‘End’]
*/

function getModifiedArray(array) {
  return ["Start", ...array.slice(1, array.length - 1), "End"];
}

/*
  TODO Task 2
  Write a function combineArray(arr1, arr2), which takes 2 arrays, and returns a new array consisting only of numeric elements of arrays arr1 and arr2.

  Function example:
  combineArray([12, "User01", 22, true, -8], ["Index", 6, null, 15]));  // [12, 22, -8, 6, 15]
*/

function combineArray(arr1, arr2) {
  return [
    ...arr1.filter((el) => Number.isInteger(el)),
    ...arr2.filter((el) => Number.isInteger(el)),
  ];
}

/*
  TODO Task 3
  Implement the longestLogin(loginList) function, which takes an array of user logins loginList  and returns the longest login. 
  If the logins of the same length are the longest in the array, the login element with the largest index is returned. Tip: You can use the reduce() method to solve the task.

  Function examples:
  longestLogin(["serg22", "tester_2", "Prokopenko", "guest"]);   //  Prokopenko
  longestLogin(["user1", "user2", "333", "user4", "aa"]);   //  user4
*/

function longestLogin(loginList) {
  return loginList.reduce((a, b) => (a.length <= b.length ? b : a));
}

/*
  TODO Task 4
  Implement the processArray(arr, factorial) function, which takes the first parameter of the array arr, 
  and the second parameter the function factorial and processes each element of the array arr with the function factorial, 
  returning a new array (the source array arr does not change)
  The function factorial(n) calculates and returns the factorial of the number n. For example factorial(4) returns 24.

  Example
  determines the factorial of the number n
  function factorial(n) { // your code}; 
  processArray([1, 2, 3, 4, 5], factorial); // [1, 2, 6, 24, 120]
*/

function factorial(n) {
  if (n === 0) return 1;
  else return n * factorial(n - 1);
}

function processArray(arr, factorial) {
  return arr.map((el) => factorial(el));
}

/*
  TODO Task 5
  Write a checkAdult(age) function whose input parameter is the age of the user age. The function checks whether the set age parameter is set correctly, 
  if it is set incorrectly, the corresponding error should be generated and displayed in the console:

  - if the age value has not been set, you need to create the following error: "Please, enter your age",
  - If you set a negative age value, you need to create the following error: "Please, enter positive number",
  - if a non-numeric value of age was specified, you need to create the following error: "Please, enter number",
  - if the integer value of age was not specified, you need to create the following error: "Please, enter Integer number",
  - If the user is under 18, you need to create the following error: "Access denied - you are too young!".

  If there is no error, the message “Access allowed” is displayed in the console.
  In the function, implement the handling of possible exceptions, providing the output to the console of the name and description of the error.
  Regardless of whether the age parameter was set correctly or incorrectly, the message “Age verification complete” should be displayed at the end of the test.

  Function usage example:
  checkAdult(15);  // Error Access denied - you are too young!
  Age verification complete
  checkAdult(25);  // Access allowed
  Age verification complete
*/

function checkAdult(age) {
  try {
    if (age === undefined || age === null || age.toString().trim().length === 0)
      throw "Please, enter your age";
    if (age < 0) throw "Please, enter positive number";
    if (typeof age === "string") throw "Please, enter number";
    if (/[,.]/g.test(age.toString())) throw "Please, enter Integer number";
    if (age < 18) throw "Access denied - you are too young!";

    console.log("Access allowed");
  } catch (err) {
    console.log(`Error ${err}`);
  } finally {
    console.log("Age verification complete");
  }
}

/*
  TODO Task 6
  Please, implement a function accountPatients that takes a count of free beds in a hospital and returns two functions:
  the first one for adding a patient
  the second one for discharging a patient
  accountPatients should keep track of free beds in a hospital and every time when a patient is admitted or discharged, 
  print the count to the console like in examples:
  A patient was discharged, 54 beds are available
  A patient was admitted, 34 beds are available
  When there are no beds available, 
  Can not admit a patient, no beds available should be printed
  When there is an attempt to discharge a patient when there are no patients,
  There are no patients to discharge should be printed
*/

const accountPatients = (beds) => {
  const patients = beds;

  const admit = () => {
    if (beds === 0) {
      console.log("Can not admit a patient, no beds available");
    } else {
      beds--;
      console.log(`A patient was admitted, ${beds} beds are available`);
    }
  };

  const discharge = () => {
    if (beds === patients) {
      console.log("There are no patients to discharge");
    } else {
      beds++;
      console.log(`A patient was discharged, ${beds} beds are available`);
    }
  };

  return [admit, discharge];
};
