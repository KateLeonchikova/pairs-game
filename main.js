import { Card } from './card.js';
import { AmazingCard } from './amazingCard.js';

let firstCard = null;
let secondCard = null;
let isTimerRunning = true;

// спрашиваем у пользователя размер поля для игры
const container = document.querySelector('.container');
const title = document.createElement('h1');
const fieldset = document.createElement('fieldset');
const rule = document.createElement('p');
const verticalSize = document.createElement('input');
const horizontalSize = document.createElement('input');
const buttonStart = document.createElement('button');
title.textContent = 'Игра в пары';
rule.textContent = 'Введите четное количество карточек по вертикали и горизонтали (максимум 10). У Вас будет 60 секунд для прохождения игры. Как только Вы откроете первую карточку, запустится обратный отсчет.'
verticalSize.placeholder = 'Введите количество карточек по вертикали';
horizontalSize.placeholder = 'Введите количество карточек по горизонтали';
buttonStart.textContent = 'Начать игру';
title.classList.add('fs-1', 'text-center');
fieldset.classList.add('startGame');
rule.classList.add('fst-italic', 'm-0');
verticalSize.classList.add('form-control');
horizontalSize.classList.add('form-control');
buttonStart.classList.add('btn', 'btn-warning');
container.append(title, fieldset);
fieldset.append(rule, verticalSize, horizontalSize, buttonStart);

// нажимаем на кнопку начала игры
buttonStart.addEventListener('click', function() {
  fieldset.remove();
  // проверяем введенные данные и вычисляем размеры игрового поля
  const playField = document.createElement('div');
  playField.classList.add('field');
  container.append(playField);

  playField.before(createTimer());

  let intervalId = setInterval(tiktak, 1000);

  let verticalCount = verticalSize.value;
  let horizontalCount = horizontalSize.value;

  switch (horizontalCount) {
    case '2':
      playField.classList.add('fieldTwo');
      break;
    case '6':
      playField.classList.add('fieldSix');
      break;
    case '8':
      playField.classList.add('fieldEight');
      break;
    case '10':
      playField.classList.add('fieldTen');
      break;
  }

  verticalCount = validateCount(verticalCount);
  horizontalCount = validateCount(horizontalCount);

  const count = (verticalCount * horizontalCount) / 2;

  const cardsNumberArray = createCardNumbers(count);

  for (const cardNumber of cardsNumberArray) {
    let card = new AmazingCard(playField, cardNumber, function(card) {
      flip(card, intervalId, cardsNumberArray);
    });
  }
})

// основная логика игры
function flip(card, intervalId, cardsNumberArray) {
  if (card.open || card.success) return;
  card.open = true;

  if (firstCard !== null && secondCard !== null) {
    firstCard.open = false;
    secondCard.open = false;
    firstCard = null;
    secondCard = null;
  }

  if (firstCard === null) {
    firstCard = card;
  } else if (secondCard === null && firstCard !== null) {
    secondCard = card;
  }

  if (firstCard !== null && secondCard !== null && firstCard.cardNumber == secondCard.cardNumber) {
    firstCard.success = true;
    secondCard.success = true;
  }

  // выводим сообщение о победе и создаем кнопку для повторной игры
  winGame(intervalId, cardsNumberArray);
}

// функция, для создания массива с перемешанными номерами для начала игры
function createCardNumbers(count) {
  // создаем массив парных чисел
  const arr = [];
  for (let i = 1; i <= count; i++) {
    arr.push(i, i);
  }

  // перемешиваем элементы в массиве
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  return arr;
}

// функция для вывода сообщения о победе
function winGame(intervalId, cardsNumberArray) {
  if (cardsNumberArray.length === document.querySelectorAll('.winCard').length) {
    setTimeout(function() {
      const seconds = document.querySelector('.seconds');
      const timeLeft = 60 - parseInt(seconds.textContent);
      const secondsWord = timeLeft % 10 === 1 ? 'секунду' : (timeLeft % 10 > 1 && timeLeft  % 10 < 5 ? 'секунды' : 'секунд');
      alert(`ПОБЕДА!!! Вы справились за ${timeLeft} ${secondsWord}!`);
      clearInterval(intervalId);
      createBtnPlayAgain(container);
    }, 300);
  }
}

// функция для создания кнопки для повторной игры
function createBtnPlayAgain(container) {
  const playAgain = document.createElement('button');
  playAgain.classList.add('btn', 'btn-success', 'mb-3');
  playAgain.textContent = 'Сыграть ещё раз';
  playAgain.addEventListener('click', () => location.reload());
  container.append(playAgain);
}

// создаем таймер на 60 секунд
function createTimer() {
  let timer = document.createElement('div');
  timer.classList.add('timer');

  let seconds = document.createElement('span');
  seconds.classList.add('seconds');
  seconds.textContent = '60';

  let unit = document.createElement('span');
  unit.textContent = ' сек.';

  timer.append(seconds, unit);

  return timer;
}

// функция для обратного отсчета
function tiktak() {
  if (!isTimerRunning) return;
  let seconds = document.querySelector('.seconds');
  let secs = parseInt(seconds.textContent, 10);
  --secs;
  seconds.textContent = secs;

  if (secs < 0 ) {
    isTimerRunning = false;
    alert('Вы не успели! Попробуйте еще раз!'),
    location.reload();
  }
}

// функция, для проверки и корректировки значений для вертикального и горизонтального количества карточек
function validateCount(count) {
  if (count % 2 !== 0 || count < 2 || count > 10) {
    return 4;
  }
  return count;
}

