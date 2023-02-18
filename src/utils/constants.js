export const initialCards = [
  {
    place: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    place: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    place: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    place: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    place: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    place: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

// Попапы
const popupProfile = document.querySelector('.popup_edit-profile');
const popupCardAdd = document.querySelector('.popup_add-place');
// Формы
export const profileForm = popupProfile.querySelector('.popup__form');
export const cardAddForm = popupCardAdd.querySelector('.popup__form');
// Поля ввода попапа профиля
export const profileInputName = popupProfile.querySelector('.popup__input-name');
export const profileInputAbout = popupProfile.querySelector('.popup__input-about');
// Кнопки открытия попапов
export const profileOpenButton = document.querySelector('.profile-info__edit-button');
export const cardAddOpenButton = document.querySelector('.profile__add-button');
// Классы
export const popupImage = '.popup-image';
export const cardTemplate = '.element-template';
export const cardsList = '.elements__grid';
export const profileName = '.profile-info__name';
export const profileAbout = '.profile-info__about';
