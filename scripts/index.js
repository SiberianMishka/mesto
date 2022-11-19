let profileName = document.querySelector('.profile-info__name');
let profileAbout = document.querySelector('.profile-info__about');
let formElement = document.querySelector('.popup');
let inputName = formElement.querySelector('.popup__input-name');
let inputAbout = formElement.querySelector('.popup__input-about');

function openPopup () {
  formElement.classList.add('popup_opened');
  inputName.value = profileName.textContent;
  inputAbout.value = profileAbout.textContent;
};

function closePopup () {
  formElement.classList.remove('popup_opened');
};

function formSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileAbout.textContent = inputAbout.value;
  closePopup();
};

let editButton = document.querySelector('.profile-info__edit-button');
editButton.addEventListener('click', openPopup);

let closeButton = formElement.querySelector('.popup__close-button');
closeButton.addEventListener('click', closePopup);

formElement.addEventListener('submit', formSubmitHandler);
