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
const popupAvatar = document.querySelector('.popup_edit-avatar');
// Формы
export const profileForm = popupProfile.querySelector('.popup__form');
export const cardAddForm = popupCardAdd.querySelector('.popup__form');
export const avatarForm = popupAvatar.querySelector('.popup__form');

// Поля ввода попапа профиля
export const profileInputName = popupProfile.querySelector('.popup__input-name');
export const profileInputAbout = popupProfile.querySelector('.popup__input-about');
// Кнопки открытия попапов
export const profileOpenButton = document.querySelector('.profile-info__edit-button');
export const cardAddOpenButton = document.querySelector('.profile__add-button');
export const avatarOpenButton = document.querySelector('.profile__edit-avatar-button');
// Классы
export const popupAddPlace = '.popup_add-place';
export const popupEditProfile = '.popup_edit-profile';
export const popupEditAvatar = '.popup_edit-avatar';
export const popupDeleteConfirm = '.popup_delete-confirm';
export const popupImage = '.popup-image';
export const cardTemplate = '.element-template';
export const cardsList = '.elements__grid';
export const profileName = '.profile-info__name';
export const profileAbout = '.profile-info__about';
export const profileAvatar = '.profile__avatar';
