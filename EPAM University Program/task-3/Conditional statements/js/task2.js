let roulettePockets = 8,
  increaseRoulettePockets = 4,
  attempts = 3,
  currentAttemps = attempts,
  totalPrize = 0,
  possiblePrize = 100,
  reductionofThePrize = 2,
  increaseThePrize = 2,
  currentlePrize = possiblePrize,
  massage,
  roulettePocketNumber,
  userNumber;

let userChoise = confirm('Do you want to play a game?');

function nextLevelRoulette(possiblePrize, roulettePockets, attempts) {
  currentAttemps = attempts;
  possiblePrize *= increaseThePrize;
  currentlePrize = possiblePrize;
  roulettePockets += increaseRoulettePockets;
  roulette(possiblePrize, roulettePockets, attempts, nextLevelRoulette);
}

function roulette(possiblePrize, roulettePockets, currentAttemps, callback) {
  for (let attempt = currentAttemps - 1; attempt >= 0; attempt--) {
    roulettePocketNumber = Math.floor(Math.random() * (roulettePockets + 1));
    massage = `Choose a roulette pocket number from 0 to ${roulettePockets} 
Attemps left: ${currentAttemps}
Total prize: ${totalPrize}$ 
Possible prize on current attemp: ${currentlePrize}$`;

    currentAttemps--;
    userNumber = Number(prompt(massage));

    if (userNumber === roulettePocketNumber) {
      totalPrize += currentlePrize;
    } else {
      currentlePrize /= reductionofThePrize;
    }
    if (attempt === 0) {
      alert(`Thank you for your participation. Your prize is: ${totalPrize}$`);
      userChoise = confirm('Do you want to continue?');
      if (userChoise) {
        callback(possiblePrize, roulettePockets, attempts);
      } else {
        alert(
          `Thank you for your participation. Your prize is: ${totalPrize}$`
        );
      }
    }
  }
}

if (userChoise) {
  roulette(possiblePrize, roulettePockets, currentAttemps, nextLevelRoulette);
} else {
  alert('You did not become a billionaire, but can.');
}
