let profit = 0,
  outputMassage,
  perСent = 100,
  numbersAfterTheComma = 2,
  minAmountOfMoney = 1000,
  maxPercentageOfaYear = 100,
  minYear = 1,
  boolean = true;

function calculateTheProfitOfTheDepositAccount(amountOfMoney, years, percentageOfYear) {
  for (let index = 0; index < years; index++) {
    profit += amountOfMoney * (percentageOfYear / perСent);
  }

  outputMassage = `Initial amount: ${amountOfMoney} 
Number of years: ${years}
Percentage of year: ${percentageOfYear}

Total profit: ${profit.toFixed(numbersAfterTheComma)}
Total amount ${(amountOfMoney + profit).toFixed(numbersAfterTheComma)}`;

  return alert(outputMassage);
}

while (boolean) {
  let amountOfMoney = Number(prompt('Input initial amount of money'));
  let years = Number(prompt('Input number of years'));
  let percentageOfaYear = Number(prompt('Input percentage of a year'));

  if (Number.isInteger(amountOfMoney, years, percentageOfaYear)) {
    if (amountOfMoney > minAmountOfMoney && years > minYear && percentageOfaYear < maxPercentageOfaYear) {
      calculateTheProfitOfTheDepositAccount( amountOfMoney, years, percentageOfaYear);
      break;
    } else {
      alert('Invalid input data');
    }
  } else {
    alert('Invalid input data');
  }
}
