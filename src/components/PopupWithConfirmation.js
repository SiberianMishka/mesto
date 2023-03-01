import { Popup } from "./Popup";

export class PopupWithConfirmation extends Popup {
  constructor(popup, handleDeleteSubmit) {
    super(popup);
    this._handleDeleteSubmit = handleDeleteSubmit;

    this._form = this._popup.querySelector('.popup__form');
  }

  open(card) {
    super.open();
    this._card = card;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (e) => {
      e.preventDefault();
      this._handleDeleteSubmit(this._card);
    })
  }
}
