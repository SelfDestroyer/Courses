// =============================================
// Taks 1
// !Працює
function getAge(date) {
  let now = new Date();
  let today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  let dateOfBirthday = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  let age;

  age = today.getFullYear() - dateOfBirthday.getFullYear();

  if (today.getMonth() === dateOfBirthday.getMonth() && today.getDate() > dateOfBirthday.getDate()) {
    age -= 1;
  }

  return age;
}
getAge(new Date(2001, 9, 11));

// =============================================
// Taks 2
// !Працює
function getWeekDay(date) {
  const someDate = new Date(date);

  return someDate.toLocaleString('eng', { weekday: 'long' });
}

getWeekDay(Date.now());
getWeekDay(new Date(2020, 9, 22));

// =============================================
// Taks 3
// !Працює
function getAmountDaysToNewYear() {
  const dateNow = new Date();
  const setDate = new Date(`Jan 01 ${dateNow.getFullYear() + 1} 00:00:00`);

  let daysFeft = (setDate - dateNow) / 1000 / 60 / 60 / 24;

  return Math.floor(daysFeft) + 1;
}
getAmountDaysToNewYear();

// =============================================
// Taks 4
// !Працює
function getProgrammersDay(year) {
  let leapYear = new Date(year, 8, 12);
  let notLeapYear = new Date(year, 8, 13);

  function isLeapYear(year) {
    return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
  }

  function findingDate(date) {
    let day, month, weekday;

    weekday = date.toLocaleString('eng', { weekday: 'long' });
    day = date.toLocaleString('eng', { day: 'numeric' });
    month = date.toLocaleString('eng', { month: 'long' });

    return `${day} ${month}, ${year} (${weekday})`;
  }

  if (isLeapYear(year)) {
    return findingDate(leapYear);
  } else {
    return findingDate(notLeapYear);
  }
}
getProgrammersDay(2008);
getProgrammersDay(2009);

// =============================================
// Taks 5
// TODO переписати
function howFarIs(dayOfTheWeek) {
  const daysOfTheWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  const day = new Date();
  const dayNow = day.toLocaleString('eng', { weekday: 'long' }).toLowerCase();

  let userDay = dayOfTheWeek.toLowerCase();
  let dayNowPosition = daysOfTheWeek.indexOf(dayNow);
  let userDayPosition = daysOfTheWeek.indexOf(userDay);
  let counter = 0;

  if (dayNowPosition < userDayPosition) {
    for (let index = dayNowPosition + 1; index < daysOfTheWeek.length; index++) {
      counter += 1;
      if (index === userDayPosition) {
        break;
      }
    }
  } else {
    for (let index = dayNowPosition + 1; index < daysOfTheWeek.length; index++) {
      counter += 1;
    }
    for (let index = userDayPosition; index >= 0; index--) {
      counter += 1;
    }
  }

  if (dayOfTheWeek.toLowerCase() === dayNow.toLowerCase()) {
    return `Hey, today is ${dayNow} =)`;
  }

  return `It's ${counter} day(s) left till ${dayOfTheWeek}.`;
}
howFarIs('Tuesday');
// =============================================
// Taks 6
// !Працює
function isValidIdentifier(someStr) {
  return /^(^\D)+[\w$]+$/g.test(someStr);
}
isValidIdentifier('myVar!');
isValidIdentifier('myVar$');
isValidIdentifier('myVar_1');
isValidIdentifier('1_myVar');
// =============================================
// Taks 7
// !Працює
function capitalize(someStr) {
  let inputStr = someStr.replace(/\b([a-z])/g, (letter) => {
    return letter.toUpperCase();
  });

  return inputStr;
}
capitalize('i am so bad boy');
capitalize('My Name Is John Smith. I Am 27.');

// =============================================
// Taks 8
// !Працює
function isValidAudioFile(someStr) {
  return /^[a-z]+\.(flac|mp3|alac|aac)$/i.test(someStr);
}
isValidAudioFile('file.mp4');
isValidAudioFile('my_file.mp3');
isValidAudioFile('file.mp3');
// =============================================
// Taks 9
// !Працює
function getHexadecimalColors(someStr) {
  return someStr.match(/#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})\b/g);
}
getHexadecimalColors('someStrcolor: #3f3; background-color: #AA00ef; and: #abcd');

// =============================================
// Taks 10
// !Працює
function isValidPassword(password) {
  const passwordRequirements = 4;
  let counter = 0;

  counter += /[A-Z]/g.test(password) ? 1 : 0;
  counter += /[a-z]/g.test(password) ? 1 : 0;
  counter += /[0-9]/g.test(password) ? 1 : 0;
  counter += /[\w\s]{8,}/g.test(password) ? 1 : 0;

  if (counter === passwordRequirements) {
    return true;
  } else {
    return false;
  }
}
isValidPassword('Age_007');
// =============================================
// Taks 11
// !Працює
function addThousandsSeparators(someStr) {
  return someStr.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
addThousandsSeparators('1234561231231231237890');

// =============================================
// Taks 12
// !Працює
function getAllUrlsFromText(userURL) {
  let URL = userURL.match(/(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})/g);

  if (URL === null) {
    return [];
  } else {
    return URL;
  }
}
getAllUrlsFromText('We use https://translate.google.com/ to hrases from https://angular.io/ ');
// =============================================
