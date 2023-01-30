export class FormValidator {
  constructor(config, form) {
    this._formSelector = config.formSelector;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;

    this._form = form;

    this._inputs = Array.from(this._form.querySelectorAll(this._inputSelector));
    this._button = this._form.querySelector(this._submitButtonSelector);
  }

  _hideError(error, input) {
    error.textContent = '';
    error.classList.remove(this._errorClass);
    input.classList.remove(this._inputErrorClass);
  }

  _showError(error, input) {
    error.textContent = input.validationMessage;
    error.classList.add(this._errorClass);
    input.classList.add(this._inputErrorClass);
  }

  _enableButton(button) {
    button.classList.remove(this._inactiveButtonClass);
    button.disabled = false;
  }

  _disableButton(button) {
    button.classList.add(this._inactiveButtonClass);
    button.disabled = true;
  }

  // Проверка валидности и демонстрация ошибки
  _checkInputValidity(input) {
    const error = this._form.querySelector(`#${input.id}-error`);

    if (input.validity.valid) {
      this._hideError(error, input);
    } else {
      this._showError(error, input);
    }
  }

  // Изменение состояния кнопки
  _toggleSubmitButton() {
    const isFormValid = this._inputs.every(input => input.validity.valid);

    if(isFormValid) {
      this._enableButton(this._button);
    } else {
      this._disableButton(this._button);
    }
  }

  // Очистка полей формы от ошибок
  resetValidation() {
    this._toggleSubmitButton();

    this._inputs.forEach((inputElement) => {
      this._hideError(inputElement);
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
