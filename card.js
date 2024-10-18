export class Card {
  constructor(container, cardNumber, flip) {
    this.container = container;
    this.card = this.createElement();
    this.cardNumber = cardNumber;
    this.flip = flip;
    this.open = false;
    this.success = false;
  }

  createElement() {
    if (this.cardElement) return this.cardElement;
    const card = document.createElement('div');
    card.classList.add('card');

    this.container.append(card);
    this.cardElement = card;

    card.addEventListener('click', () => this.flip(this));

    return card;
  }

  set cardNumber(value) {
    this._cardNumber = value;
    if (this.card) this.card.textContent = value;
  }

  get cardNumber() {
    return this._cardNumber;
  }

  set open(value) {
    if (value) {
      this.card.classList.add('openCard');
    } else {
      this.card.classList.remove('openCard');
    }
  }

  get open() {
    return this.card.classList.contains('openCard');
  }

  set success(value) {
    if (value) {
      this.card.classList.add('winCard');
    } else {
      this.card.classList.remove('winCard');
    }
  }

  get success() {
    return this.card.classList.contains('winCard');
  }
}
