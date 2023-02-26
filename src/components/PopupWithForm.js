import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popup, handleFormSubmit) {
    super(popup);
    this._handleFormSubmit = handleFormSubmit;

    this._form = this._popup.querySelector('.popup__form');
    this._inputs = this._form.querySelectorAll('.popup__input');
    this._SubmitButton = this._popup.querySelector('.popup__button')
  }

  // Меняет подпись кнопки
  setButtonText(text) {
    this._SubmitButton.textContent = text;
  }

  // Собирает данные всех полей формы
  _getInputValues() {
    this._inputValues = {};

    this._inputs.forEach((input) => { this._inputValues[input.name] = input.value; });
    return this._inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (e) => {
      this._handleFormSubmit(e, this._getInputValues());
      this.close();
    })
  }

  close() {
    super.close();
    // При закрытии попапа форма должна ещё и сбрасываться.
    this._form.reset();
  }
}
