export class FormValidator {
  constructor(
    { formSelector,
      inputSelector,
      submitButtonSelector,
      inactiveButtonClass,
      inputErrorClass,
      errorClass
    },
    form) {
    this._formSelector = formSelector;
    this._inputSelector = inputSelector;
    this._submitButtonSelector = submitButtonSelector;
    this._inactiveButtonClass = inactiveButtonClass;
    this._inputErrorClass = inputErrorClass;
    this._errorClass = errorClass;

    this._form = form;

    this._inputs = Array.from(this._form.querySelectorAll(this._inputSelector));
    this._button = this._form.querySelector(this._submitButtonSelector);
  }

  _hideError(input) {
    const error = this._form.querySelector(`#${input.id}-error`);

    error.textContent = '';
    error.classList.remove(this._errorClass);
    input.classList.remove(this._inputErrorClass);
  }

  _showError(input) {
    const error = this._form.querySelector(`#${input.id}-error`);

    error.textContent = input.validationMessage;
    error.classList.add(this._errorClass);
    input.classList.add(this._inputErrorClass);
  }

  _enableButton() {
    this._button.classList.remove(this._inactiveButtonClass);
    this._button.disabled = false;
  }

  _disableButton() {
    this._button.classList.add(this._inactiveButtonClass);
    this._button.disabled = true;
  }

  // Проверка валидности и демонстрация ошибки
  _checkInputValidity(input) {
    if (input.validity.valid) {
      this._hideError(input);
    } else {
      this._showError(input);
    }
  }

  // Изменение состояния кнопки
  _toggleSubmitButton() {
    const isFormValid = this._inputs.every(input => input.validity.valid);

    if (isFormValid) {
      this._enableButton();
    } else {
      this._disableButton();
    }
  }

  // Очистка полей формы от ошибок
  resetValidation() {
    this._toggleSubmitButton();

    this._inputs.forEach((input) => {
      this._hideError(input);
    });
  }

  enableValidation() {
    this._inputs.forEach(input => {
      input.addEventListener('input', () => {
        // убрать или показать ошибку
        this._checkInputValidity(input);
        // деактивировать или активировать кнопку
        this._toggleSubmitButton();
      })
    })
  }
}
