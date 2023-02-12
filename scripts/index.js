import { initialCards, validationConfig } from "./constants.js";
import { FormValidator } from "./FormValidator.js";
import { Card } from "./Card.js";

// Переменные для редактирования профиля
const profileName = document.querySelector('.profile-info__name');
const profileAbout = document.querySelector('.profile-info__about');
const profileElement = document.querySelector('.popup_edit-profile');
const profileInputName = profileElement.querySelector('.popup__input-name');
const profileInputAbout = profileElement.querySelector('.popup__input-about');
const profileEditButton = document.querySelector('.profile-info__edit-button');
const profileForm = profileElement.querySelector('.profile-form');
// Переменные для попапа изображения
const popupImageElement = document.querySelector('.popup-image');
const popupImage = popupImageElement.querySelector('.popup-image__image');
const popupName = popupImageElement.querySelector('.popup-image__name');
// Переменные для крестиков
const closeButtons = document.querySelectorAll('.popup__close-button');
// Переменные для шаблона элементов
const elementsList = document.querySelector('.elements__grid');
// Переменные для добавления элемента
const cardButton = document.querySelector('.profile__add-button');
const cardElement = document.querySelector('.popup_add-place');
const cardSubmitButton = cardElement.querySelector('.popup__button');
const cardInputPlace = cardElement.querySelector('.popup__input-place');
const cardInputImage = cardElement.querySelector('.popup__input-img');
const cardForm = cardElement.querySelector('.add-form');

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
  profileInputName.value = profileName.textContent;
  profileInputAbout.value = profileAbout.textContent;
  profileValidation.resetValidation();
  openPopup(profileElement);
};

function closeEditPopup() {
  closePopup(profileElement);
};

function handleProfileFormSubmit (e) {
  e.preventDefault();
  profileName.textContent = profileInputName.value;
  profileAbout.textContent = profileInputAbout.value;
  closeEditPopup();
};

// Открытие попапа изображения
function handleElementImageClick(link, name) {
  popupImage.src = link;
  popupImage.alt = name;
  popupName.textContent = name;
  openPopup(popupImageElement);
}

// Слушатели попапа редактирования профиля
profileForm.addEventListener('submit', handleProfileFormSubmit);
profileEditButton.addEventListener('click', openEditPopup);

// Создание элементов по шаблону
function createCard(cardData) {
  const card = new Card(cardData, ".element-template", handleElementImageClick);
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
function openCardPopup() {
  cardForm.reset();
  newCardValidation.resetValidation();
  openPopup(cardElement);
};

function closeCardPopup() {
  closePopup(cardElement);
};

function handleAddFormSubmit(e) {
  e.preventDefault();
  const cardData = {
    name: cardInputPlace.value,
    link: cardInputImage.value
  }
  renderElement(cardData, elementsList);
  closeCardPopup();
};

// Создание объектов валидатора форм
const profileValidation = new FormValidator(validationConfig, profileForm);
const newCardValidation = new FormValidator(validationConfig, cardForm);
profileValidation.enableValidation();
newCardValidation.enableValidation();

// Слушатели попапа добавления элемента
cardButton.addEventListener('click', openCardPopup);
cardForm.addEventListener('submit', handleAddFormSubmit);

