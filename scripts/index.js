import { initialCards, validationConfig } from "./constants.js";
import { FormValidator } from "./FormValidator.js";
import { Card } from "./Card.js";

// Переменные для редактирования профиля
const profileName = document.querySelector('.profile-info__name');
const profileAbout = document.querySelector('.profile-info__about');
const editProfileElement = document.querySelector('.popup_edit-profile');
const inputName = editProfileElement.querySelector('.popup__input-name');
const inputAbout = editProfileElement.querySelector('.popup__input-about');
const editButton = document.querySelector('.profile-info__edit-button');
const profileForm = editProfileElement.querySelector('.profile-form');
// Переменные для попапа изображения
const popupImageElement = document.querySelector('.popup-image');
// Переменные для крестиков
const closeButtons = document.querySelectorAll('.popup__close-button');
// Переменные для шаблона элементов
const elementsList = document.querySelector('.elements__grid');
// Переменные для добавления элемента
const addPlaceButton = document.querySelector('.profile__add-button');
const addPlaceElement = document.querySelector('.popup_add-place');
const addPlaceSubmitButton = addPlaceElement.querySelector('.popup__button');
const inputPlace = addPlaceElement.querySelector('.popup__input-place');
const inputImage = addPlaceElement.querySelector('.popup__input-img');
const addForm = addPlaceElement.querySelector('.add-form');

// Действия при нажатии Esc
const handleEscClick = (e) => {
  if (e.key === "Escape") {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

// Закрытие по оверлею
const handleOverlayClick = (e) => {
  if (e.target.classList.contains('popup')) {
    closePopup(e.target);
  }
}

// Универсальные функции открытия и закрытия попапа
export function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleEscClick);
  popup.addEventListener('click', handleOverlayClick);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleEscClick);
  popup.removeEventListener('click', handleOverlayClick);
}

// Универсальная функция обработки крестиков
closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

// Функция закрытия попапа изображения
function closeImagePopup() {
  closePopup(popupImageElement);
}

// Функции попапа редактирования профиля
function openEditPopup() {
  inputName.value = profileName.textContent;
  inputAbout.value = profileAbout.textContent;
  openPopup(editProfileElement);
};

function closeEditPopup() {
  closePopup(editProfileElement);
};

function handleProfileFormSubmit (e) {
  e.preventDefault();
  profileName.textContent = inputName.value;
  profileAbout.textContent = inputAbout.value;
  closeEditPopup();
};

// Слушатели попапа редактирования профиля
profileForm.addEventListener('submit', handleProfileFormSubmit);
editButton.addEventListener('click', openEditPopup);

// Создание элементов по шаблону
function createCard(cardData) {
  const card = new Card(cardData, ".element-template");
  const element = card.generateCard();
  return element;
}

function renderElement(cardData, wrapElement) {
  const element = createCard(cardData);
  wrapElement.prepend(element);
}

// Заполнение элементов из массива
initialCards.forEach((cardData) => {
  renderElement(cardData, elementsList);
})

// Функции попапа добавления элемента
function openAddPlacePopup() {
  addForm.reset();
  openPopup(addPlaceElement);
};

function closeAddPlacePopup() {
  closePopup(addPlaceElement);
};

function handleAddFormSubmit(e) {
  e.preventDefault();
  const cardData = {
    name: inputPlace.value,
    link: inputImage.value
  }
  renderElement(cardData, elementsList);
  closeAddPlacePopup();
};

// Создание объектов валидатора форм
[...document.forms].forEach((form) => {
  const formValidator = new FormValidator(validationConfig, form);
  formValidator.enableValidation();
});

// Слушатели попапа добавления элемента
addPlaceButton.addEventListener('click', openAddPlacePopup);
addForm.addEventListener('submit', handleAddFormSubmit);

