import { Popup } from "./Popup";

export class PopupWithConfirmation extends Popup {
  constructor(popup, handleDeleteClick) {
    super(popup);
    this._handleDeleteClick = handleDeleteClick;

    this._form = this._popup.querySelector('.popup__form');
  }

  open(cardId, element) {
    super.open();
    this._cardId = cardId;
    this._element = element;
    console.log(this._element)
  }

  // Удаление элемента
  delete() {
    this._element.remove();
    this._element = null;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (e) => {
      this._handleDeleteClick(e, this._cardId);
    })
  }
}
