/* START TASK 1: Your code goes here */
const table = document.querySelector('table');

document.querySelectorAll('tr').forEach((el, index) => {
  el.id = index + 1;
});

[].forEach.call(table.rows, function (row) {
  [].forEach.call(row.cells, function (cell, j) {
    if (j === 0) {
      cell.classList.add('firstRow');
    }
  });
});

document.querySelector('table').addEventListener('click', function (e) {
  const el = e.target;

  if (el.nodeName !== 'TD') {
    return;
  }

  if (el.classList.contains('firstRow')) {
    [].forEach.call(el.parentNode.cells, function (cell) {
      if (cell.classList.contains('yellow')) {
        return;
      }
      if (!cell.classList.contains('blue')) {
        cell.classList.toggle('blue');
      } 
      
    });
  }

  if (el.classList.contains('blue') && !el.classList.contains('firstRow') && el.id !== 'specialCell') {
    el.classList.toggle('yellow');
  }

  if (el.id === 'specialCell') {
    [].forEach.call(table.rows, function (row) {
      [].forEach.call(row.cells, function (cell) {
        if (cell.classList.contains('blue') && cell.classList.contains('yellow')) {
          return;
        } else {
          cell.classList.toggle('green');
          table.style.background = 'green';
        }
      });
    });
  }
});

/* END TASK 1 */

/* START TASK 2: Your code goes here */
const isValid = document.querySelector('#is-valid');
const isInvalid = document.querySelector('#is-invalid');
const button = document.querySelector('.task2-form__button');
const inpute = document.querySelector('.task2-form__input');

document.querySelector('.task2-form__button').addEventListener('click', function () {
    const numberPhone = document.querySelector('.task2-form__input').value;
    const checkNumber = /\+380\d{9}/g.test(numberPhone);

    if (checkNumber) {
      inpute.style.borderColor = 'black';
      isInvalid.style.display = 'none';
      isValid.style.display = 'block';
    } else {
      isValid.style.display = 'none';
      isInvalid.style.display = 'block';
      inpute.style.borderColor = 'red';
      button.disabled = true;
    }
  });
document.querySelector('.task2-form__input').addEventListener('input', function (e) {
    if (/\+380\d{9}/g.test(e.target.value)) {
      document.querySelector('.task2-form__button').disabled = false;
      inpute.style.borderColor = 'black';
    }
  });
/* END TASK 2 */

/* START TASK 3: Your code goes here */
let scoreTeamA = 0;
let scoreTeamB = 0;
document.querySelector('.team-a').innerHTML = `Team A:${scoreTeamA}`;
document.querySelector('.team-b').innerHTML = `Team A:${scoreTeamB}`;

document.querySelector('.court').addEventListener('click', function (e) {
  const ball = document.querySelector('.ball');
  const courtPosition = e.target.getBoundingClientRect();
  const maxBallX = 577;
  const minBallX = 22;
  const maxBallY = 277;
  const minBallY = 21;
  let span = document.createElement('span');
  span.classList.add('info');
  let ballCoords = {
    x: e.clientX - courtPosition.left,
    y: e.clientY - courtPosition.top
  };

  if (ballCoords.x > maxBallX) {
    ballCoords.x = maxBallX;
  }
  if (ballCoords.x < minBallX) {
    ballCoords.x = minBallX;
  }

  if (ballCoords.y > maxBallY) {
    ballCoords.y = maxBallY;
  }
  if (ballCoords.y < minBallY) {
    ballCoords.y = minBallY;
  }

  ball.style.top = ballCoords.y + 'px';
  ball.style.left = ballCoords.x + 'px';

  if (ballCoords.x >= 36 && ballCoords.x <= 44 && ballCoords.y >= 145 && ballCoords.y <= 153) {
    scoreTeamA += 1;
    document.querySelector('.team-a').innerHTML = `Team A:${scoreTeamA}`;
    span.textContent = 'Team B score!';
    e.target.style.pointerEvents = 'none';

    setTimeout(() => {
      ball.style.top = 50 + '%';
      ball.style.left = 50 + '%';
      e.target.style.pointerEvents = 'auto';
    }, 1000);

    document.querySelector('#task3').appendChild(span);

    setTimeout(() => {
      span.remove();
    }, 3000);
  }

  if (ballCoords.x >= 556 && ballCoords.x <= 563 && ballCoords.y >= 145 && ballCoords.y <= 153) {
    scoreTeamB += 1;
    document.querySelector('.team-b').innerHTML = `Team B:${scoreTeamB}`;
    span.textContent = 'Team A score!';

    e.target.style.pointerEvents = 'none';

    setTimeout(() => {
      ball.style.top = 50 + '%';
      ball.style.left = 50 + '%';
      e.target.style.pointerEvents = 'auto';
    }, 1000);

    document.querySelector('#task3').appendChild(span);
    setTimeout(() => {
      span.remove();
    }, 3000);
  }
});

/* END TASK 3 */
