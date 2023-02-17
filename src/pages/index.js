import { initialCards, validationConfig } from "../utils/constants.js";
import { FormValidator } from "../components/FormValidator.js";
import { Card } from "../components/Card.js";
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
// Кнопки открытия попапов
const profileOpenButton = document.querySelector('.profile-info__edit-button');
const cardAddOpenButton = document.querySelector('.profile__add-button');
// Селекторы
const popupImageSelector = '.popup-image';
const cardTemplateSelector = '.element-template';
const cardsListSelector = '.elements__grid';
const profileNameSelector = '.profile-info__name';
const profileAboutSelector = '.profile-info__about';

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

const cardElementList = new Section({
  items: initialCards,
  // Создание и отрисовка элемента
  renderer: (cardData) => {
    const card = createCard(cardData);
    cardElementList.addItem(card);
  },
}, cardsListSelector);

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
const userInfo = new UserInfo({ profileNameSelector, profileAboutSelector });

const handleProfileFormSubmit = (e, inputValues) => {
  e.preventDefault();
  userInfo.setUserInfo(inputValues);
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
