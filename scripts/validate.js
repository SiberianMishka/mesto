hideError = (error, input, config) => {
  error.textContent = '';
  error.classList.remove(config.errorClass);
  input.classList.remove(config.inputErrorClass);
}

showError = (error, input, config) => {
  error.textContent = input.validationMessage;
  error.classList.add(config.errorClass);
  input.classList.add(config.inputErrorClass);
}

enableButton = (button, config) => {
  button.classList.remove(config.inactiveButtonClass);
  button.disabled = '';
}

disableButton = (button, config) => {
  button.classList.add(config.inactiveButtonClass);
  button.disabled = 'disabled';
}

// Проверка валидности и демонстрация ошибки
const checkInputValidity = (input, config) => {
  const error = document.querySelector(`#${input.id}-error`);

  if (input.validity.valid) {
    hideError(error, input, config);
  } else {
    showError(error, input, config);
  }
}

// Изменение состояния кнопки
const toggleSubmitButton = (inputs, button, config) => {
  const isFormValid = inputs.every(input => input.validity.valid);

  if(isFormValid) {
    enableButton(button, config);
  } else {
    disableButton(button, config);
  }
}

const enableValidation = (config) => {
  const { formSelector, inputSelector, submitButtonSelector, ...restConfig } = config

  const forms = document.querySelectorAll(formSelector);

  forms.forEach(form => {
    const inputs = [...form.querySelectorAll(inputSelector)];
    const button = form.querySelector(submitButtonSelector);

    inputs.forEach(input => {
      input.addEventListener('input', () => {
        // убрать или показать ошибку
        checkInputValidity(input, restConfig);
        // деактивировать или активировать кнопку
        toggleSubmitButton(inputs, button, restConfig);
      })
    })
  })
}

enableValidation(validationConfig);
