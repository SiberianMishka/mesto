import { Popup } from "./Popup";

export class PopupWithConfirmation extends Popup {
  constructor(popup, handleDeleteSubmit) {
    super(popup);
    this._handleDeleteSubmit = handleDeleteSubmit;

    this._form = this._popup.querySelector('.popup__form');
  }

  open(cardId, element) {
    super.open();
    this._cardId = cardId;
    this._element = element;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (e) => {
      this._handleDeleteSubmit(e, this._cardId, this._element);
    })
  }
}
