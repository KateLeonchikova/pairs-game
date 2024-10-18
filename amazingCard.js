import { Card } from './card.js';

export class AmazingCard extends Card {
  constructor (container, cardNumber, flip) {
    super(container, cardNumber, flip);
    this.cardNumber = cardNumber;
  }

  set cardNumber(value) {
    const cardsImgArray = [];
    for (let i = 1; i <= 50; i++) {
      cardsImgArray.push(`./img/${i}.png`);
    }

    this._cardNumber = value;
    const img = document.createElement('img');
    img.src = cardsImgArray[value - 1];
    img.classList.add('imageCard');
    this.card.innerHTML = '';

    img.onerror = function() {
      img.src = './img/error.png';
      throw new Error('Ошибка загрузки изображения');
    };

    this.card.append(img);
  }

  get cardNumber() {
    return this._cardNumber;
  }
}
