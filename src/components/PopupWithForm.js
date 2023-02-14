import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;

    this._form = this._popupSelector.querySelector('.popup__form');
    this._inputs = this._form.querySelectorAll('.popup__input');
  }

  // Собирает данные всех полей формы
  _getInputValues() {
    this._formValues = {};

    this._inputs.forEach((input) => {
      this._formValues[input.name] = input.value;
    })
    console.log(this._formValues);
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    // Должен не только добавлять обработчик клика иконке закрытия, но и добавлять обработчик сабмита формы.
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

// Создайте класс PopupWithForm
// Создайте класс PopupWithForm, который наследует от Popup. Этот класс:
// Кроме селектора попапа принимает в конструктор колбэк сабмита формы.
// Содержит приватный метод _getInputValues, который собирает данные всех полей формы.
// Перезаписывает родительский метод setEventListeners.
// Метод setEventListeners класса PopupWithForm должен не только добавлять обработчик клика иконке закрытия, но и добавлять обработчик сабмита формы.
// Перезаписывает родительский метод close, так как при закрытии попапа форма должна ещё и сбрасываться.
// Для каждого попапа создавайте свой экземпляр класса PopupWithForm.
