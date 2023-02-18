export class Popup {
  constructor(popup) {
    this._popup = document.querySelector(popup);
  }

  // Открытие попапа
  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  // Закрытие попапа
  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  // Закрытие попапа клавишей Esc
  _handleEscClose = (e) => {
    if (e.key === "Escape") {
      this.close();
    }
  }

  // Слушатель клика иконки закрытия попапа или клика по оверлею
  setEventListeners() {
    this._popup.addEventListener('mousedown', (e) => {
      if (e.target.classList.contains('popup__close-button') || e.target.classList.contains('popup')) {
        this.close();
      }
    })
  }
}
