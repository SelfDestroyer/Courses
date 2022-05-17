/* 
Taks № 1
Implement the getMin(arr) function, which takes an array of numbers arr and returns the smallest number of the array. 
To solve the problem, you must use one of the methods to specify the context of this. It is forbidden to use any cycles.

*/

function getMin(arr) {
  return Math.min.apply(null, arr);
}

/* 
Task № 2
Write a mapCreator(keys, values) function that takes two arrays of equal length. Using these arrays, 
the function must create an object of type Map, the keys of which are the values from the first array keys, and the values of Map - the values from the second array values. 
Moreover, the values of the map elements can be only string values. The function returns this Map object.

*/

function mapCreator(keys, values) {
  let myMap = new Map();

  keys.forEach((key, index) => {
    if (typeof values[index] === "string") myMap.set(key, values[index]);
  });

  return myMap;
}

/* 
Taks № 3
Create a Movie class, the constructor of which accepts 3 parameters: movie name name, movie genre category and start year of startShow.
The class has a watchMovie() method that returns a phrase and adds a movie name name parameter to it at the end. For example, "I watch the movie Titanic!"
Create an instance of the movie1 class with the title of the movie "Titanic", the genre "drama" and 1997 release.
Create an instance of the movie2 class with the title of the movie "Troya", the genre "historical" and the 2004 release.
*/

class Movie {
  constructor(name, category, startShow) {
    this.name = name;
    this.category = category;
    this.startShow = startShow;
  }
  watchMovie() {
    return `I watch the movie ${this.name}!`;
  }
}

/* 
Task № 4
Implement the Student class, the constructor of which accepts 2 parameters fullName - the name and surname of the student, direction - the direction in which he studies.
Create a showFullName() method that returns the student's first and last name.
Create a nameIncludes(data) method that, using the showFullName() method, checks for the text data argument in the student’s name and returns true if a match is found or false if not found.
Create a static studentBuilder() method that returns a new instance of the class named ‘Ihor Kohut’ and the direction ‘qc’.
Create a getter and setter direction() to read and specify the direction field.
Create an instance of class stud1 named 'Ivan Petrenko' and direction 'web'.
Create an instance of class stud2 named 'Sergiy Koval' and direction 'python'.
Create an instance of the stud3 class named ‘Ihor Kohut’ and the direction ‘qc’ using the static studentBuilder() method.

Usage example:
const stud1 = new Student('Ivan Petrenko', 'web');
stud1.nameIncludes('Ivan');   // true
stud1.nameIncludes('Denysenko'); // false
*/

class Student {
  a = 10;
  static b = 10;
  constructor(fullName, direction) {
    this._fullName = fullName;
    this._direction = direction;
  }

  showFullName() {
    return this._fullName;
  }

  nameIncludes(data) {
    return this.showFullName().includes(data);
  }

  static studentBuilder() {
    return new this("Ihor Kohut", "qc");
  }

  set direction(value) {
    this._direction = value;
  }

  get direction() {
    return this._direction;
  }
}

/* 
Task № 5
We have the product() function, you can see it on the snapshot below. 
This product() function finds the product of its arguments and also uses this object for the initial value of the product.
Please, create a new function getProduct()  that, no matter how it is called, will be always bound to a particular this value. 
getProduct() should be created from the original product() function and work with the same logic, but should pass two additional arguments – 2 and 3 – to the original function, every time getProduct() is called.
Object this for getProduct() function you should also define by yourself. Look at snapshot for clues what it should be.
*/

const product = function () {
  return [].reduce.call(
    arguments,
    function (res, elem) {
      return res * elem;
    },
    this.product
  );
};

const contextObj = {
  product: 10,
};

const getProduct = product.bind(contextObj, 2, 3);

class Distributor {
  constructor() {
    this.products = {};
  }

  addProduct(id, name) {
    this.id = id;
    this.name = name;
  }

  removeProduct(id) {
    console.log(id);
  }
}

const localDistributor = new Distributor();

class MyProduct {
  constructor(name) {
    this.name = name;
  }

  distribute(distributor) {
    distributor.addProduct(this.id, this.name);
  }
}

const product1 = new MyProduct("butter");
product1.distribute(localDistributor);
console.log(localDistributor.products);

new MyProduct("bread").distribute(localDistributor);
new MyProduct("bread").distribute(localDistributor);
console.log(localDistributor.products);

localDistributor.removeProduct(product1.id);
console.log(localDistributor.products);
