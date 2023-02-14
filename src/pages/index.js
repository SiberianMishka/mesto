import { initialCards, validationConfig } from "../utils/constants.js";
import { FormValidator } from "../components/FormValidator.js";
import { Card } from "../components/Card.js";
import { Popup } from "../components/Popup.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { Section } from "../components/Section.js";
import { UserInfo } from "../components/UserInfo.js";
import './index.css'; // импорт главного файла стилей

// Попапы
const popupProfile = document.querySelector('.popup_edit-profile');
const popupCardAdd = document.querySelector('.popup_add-place');
// Формы
const profileForm = popupProfile.querySelector('.popup__form');
const cardAddForm = popupCardAdd.querySelector('.popup__form');
// Поля ввода попапа профиля
const profileInputName = popupProfile.querySelector('.popup__input-name');
const profileInputAbout = popupProfile.querySelector('.popup__input-about');
// Поля ввода попапа создания карточки
const cardInputPlace = popupCardAdd.querySelector('.popup__input-place');
const cardInputImage = popupCardAdd.querySelector('.popup__input-img');
// Кнопки открытия попапов
const profileOpenButton = document.querySelector('.profile-info__edit-button');
const cardAddOpenButton = document.querySelector('.profile__add-button');
// Селекторы
const popupImageSelector = '.popup-image';
const cardTemplateSelector = '.element-template';
const cardsListSelector = '.elements__grid';

// Открытие попапа изображения
const handleCardClick = (name, link) => {
  popupWithImage.open(name, link);
}

const popupWithImage = new PopupWithImage(popupImageSelector);
popupWithImage.setEventListeners();

// Создание и отрисовка начальных карточек из массива
const createCard = (cardData) => {
  const card = new Card(cardData, cardTemplateSelector, handleCardClick);
  const cardElement = card.generateCard();
  return cardElement;
}

const cardElementList = new Section(
  {
    items: initialCards,
    // Создание и отрисовка элемента
    renderer: (cardData) => {
      const card = createCard(cardData);
      cardElementList.addItem(card);
    },
  },
  cardsListSelector
)

cardElementList.renderElements();

// Создание новой карточки
const handleCardAddFormSubmit = (e, cardData) => {
  e.preventDefault();
  const card = createCard(cardData);
  cardElementList.addItem(card);
}

const popupAddCardForm = new PopupWithForm('.popup_add-place', handleCardAddFormSubmit);

popupAddCardForm.setEventListeners();

// Открытие попапа добавления карточки
cardAddOpenButton.addEventListener('click', () => {
  formAddCardValidation.resetValidation();
  popupAddCardForm.open();
})

// Отражение информации о пользователе
const userInfo = new UserInfo({
  profileNameSelector: '.profile-info__name',
  profileAboutSelector: '.profile-info__about'
})

const handleProfileFormSubmit = (e, inputValues) => {
  e.preventDefault();
  userInfo.setUserInfo(inputValues.name, inputValues.about);
}

const popupProfileForm = new PopupWithForm('.popup_edit-profile', handleProfileFormSubmit);

popupProfileForm.setEventListeners();

// Открытие попапа редактирования профиля
profileOpenButton.addEventListener('click', () => {
  const { name, about } = userInfo.getUserInfo();
  profileInputName.value = name;
  profileInputAbout.value = about;
  profileFormValidation.resetValidation();
  popupProfileForm.open();
})

// Валидация форм
const profileFormValidation = new FormValidator(validationConfig, profileForm);
const formAddCardValidation = new FormValidator(validationConfig, cardAddForm);
profileFormValidation.enableValidation();
formAddCardValidation.enableValidation();



// // Переменные для редактирования профиля
// const profileName = document.querySelector('.profile-info__name');
// const profileAbout = document.querySelector('.profile-info__about');
// const profileElement = document.querySelector('.popup_edit-profile');
// const profileInputName = profileElement.querySelector('.popup__input-name');
// const profileInputAbout = profileElement.querySelector('.popup__input-about');
// const profileEditButton = document.querySelector('.profile-info__edit-button');
// const profileForm = profileElement.querySelector('.profile-form');
// // Переменные для попапа изображения
// const popupImageElement = document.querySelector('.popup-image');
// const popupImage = popupImageElement.querySelector('.popup-image__image');
// const popupName = popupImageElement.querySelector('.popup-image__name');
// // Переменные для крестиков
// const closeButtons = document.querySelectorAll('.popup__close-button');
// // Переменные для шаблона элементов
// const elementsList = document.querySelector('.elements__grid');
// // Переменные для добавления элемента
// const cardButton = document.querySelector('.profile__add-button');
// const cardElement = document.querySelector('.popup_add-place');
// const cardSubmitButton = cardElement.querySelector('.popup__button');
// const cardInputPlace = cardElement.querySelector('.popup__input-place');
// const cardInputImage = cardElement.querySelector('.popup__input-img');
// const cardForm = cardElement.querySelector('.add-form');

// // Действия при нажатии Esc
// const handleEscClick = (e) => {
//   if (e.key === "Escape") {
//     const openedPopup = document.querySelector('.popup_opened');
//     closePopup(openedPopup);
//   }
// }

// // Закрытие по оверлею
// const handleOverlayClick = (e) => {
//   if (e.target.classList.contains('popup')) {
//     closePopup(e.target);
//   }
// }

// // Универсальные функции открытия и закрытия попапа
// export function openPopup(popup) {
//   popup.classList.add('popup_opened');
//   document.addEventListener('keydown', handleEscClick);
//   popup.addEventListener('click', handleOverlayClick);
// }

// function closePopup(popup) {
//   popup.classList.remove('popup_opened');
//   document.removeEventListener('keydown', handleEscClick);
//   popup.removeEventListener('click', handleOverlayClick);
// }

// // Универсальная функция обработки крестиков
// closeButtons.forEach((button) => {
//   const popup = button.closest('.popup');
//   button.addEventListener('click', () => closePopup(popup));
// });

// // Функция закрытия попапа изображения
// function closeImagePopup() {
//   closePopup(popupImageElement);
// }

// // Функции попапа редактирования профиля
// function openEditPopup() {
//   profileInputName.value = profileName.textContent;
//   profileInputAbout.value = profileAbout.textContent;
//   profileValidation.resetValidation();
//   openPopup(profileElement);
// };

// function closeEditPopup() {
//   closePopup(profileElement);
// };

// function handleProfileFormSubmit(e) {
//   e.preventDefault();
//   profileName.textContent = profileInputName.value;
//   profileAbout.textContent = profileInputAbout.value;
//   closeEditPopup();
// };

// // Открытие попапа изображения
// function handleCardClick(name, link) {
//   popupImage.src = link;
//   popupImage.alt = name;
//   popupName.textContent = name;
//   openPopup(popupImageElement);
// }

// // Слушатели попапа редактирования профиля
// profileForm.addEventListener('submit', handleProfileFormSubmit);
// profileEditButton.addEventListener('click', openEditPopup);

// // Создание элементов по шаблону
// function createCard(cardData) {
//   const card = new Card(cardData, ".element-template", handleCardClick);
//   const element = card.generateCard();
//   return element;
// }

// function renderElement(cardData, wrapElement) {
//   const element = createCard(cardData);
//   wrapElement.prepend(element);
// }

// // Заполнение элементов из массива
// initialCards.forEach((cardData) => {
//   renderElement(cardData, elementsList);
// })

// // Функции попапа добавления элемента
// function openCardPopup() {
//   cardForm.reset();
//   newCardValidation.resetValidation();
//   openPopup(cardElement);
// };

// function closeCardPopup() {
//   closePopup(cardElement);
// };

// function handleAddFormSubmit(e) {
//   e.preventDefault();
//   const cardData = {
//     name: cardInputPlace.value,
//     link: cardInputImage.value
//   }
//   renderElement(cardData, elementsList);
//   closeCardPopup();
// };

// // Создание объектов валидатора форм
// const profileValidation = new FormValidator(validationConfig, profileForm);
// const newCardValidation = new FormValidator(validationConfig, cardForm);
// profileValidation.enableValidation();
// newCardValidation.enableValidation();

// // Слушатели попапа добавления элемента
// cardButton.addEventListener('click', openCardPopup);
// cardForm.addEventListener('submit', handleAddFormSubmit);

