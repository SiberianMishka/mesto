import {
  initialCards,
  validationConfig,
  profileForm,
  cardAddForm,
  profileInputName,
  profileInputAbout,
  profileOpenButton,
  cardAddOpenButton,
  popupImage,
  cardTemplate,
  cardsList,
  profileName,
  profileAbout
} from "../utils/constants.js";
import { FormValidator } from "../components/FormValidator.js";
import { Card } from "../components/Card.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { Section } from "../components/Section.js";
import { UserInfo } from "../components/UserInfo.js";
import './index.css'; // импорт главного файла стилей



// Открытие попапа изображения
const handleCardClick = (name, link) => {
  popupWithImage.open(name, link);
}

const popupWithImage = new PopupWithImage(popupImage);
popupWithImage.setEventListeners();

// Создание и отрисовка начальных карточек из массива
const createCard = (cardData) => {
  const card = new Card(cardData, cardTemplate, handleCardClick);
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
}, cardsList);

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
const userInfo = new UserInfo({ profileName, profileAbout });

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
