export class Popup {
  constructor(popupSelector) {
    this._popupSelector = document.querySelector(popupSelector);
  }

  // Открытие попапа
  open() {
    this._popupSelector.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  // Закрытие попапа
  close() {
    this._popupSelector.classList.remove('popup_opened');
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
    this._popupSelector.addEventListener('click', (e) => {
      if (e.target.classList.contains('popup__close-button') || e.target.classList.contains('popup')) {
        this.close();
      }
    })
  }
}

// Cоздайте класс Popup, который отвечает за открытие и закрытие попапа. Этот класс:
// Принимает в конструктор единственный параметр — селектор попапа.
// Содержит публичные методы open и close, которые отвечают за открытие и закрытие попапа.
// Содержит приватный метод _handleEscClose, который содержит логику закрытия попапа клавишей Esc.
// Содержит публичный метод setEventListeners, который добавляет слушатель клика иконке закрытия попапа.
// Модальное окно также закрывается при клике на затемнённую область вокруг формы.
