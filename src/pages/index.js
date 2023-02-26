import {
  validationConfig,
  profileForm,
  cardAddForm,
  avatarForm,
  profileInputName,
  profileInputAbout,
  profileOpenButton,
  cardAddOpenButton,
  avatarOpenButton,
  popupAddPlace,
  popupEditProfile,
  popupEditAvatar,
  popupDeleteConfirm,
  popupImage,
  cardTemplate,
  cardsList,
  profileName,
  profileAbout,
  profileAvatar
} from "../utils/constants.js";
import { FormValidator } from "../components/FormValidator.js";
import { Card } from "../components/Card.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithConfirmation } from "../components/PopupWithConfirmation.js";
import { Section } from "../components/Section.js";
import { UserInfo } from "../components/UserInfo.js";
import { api } from "../components/Api.js"
import './index.css'; // импорт главного файла стилей

Promise.all([api.getInitialCards(), api.getUserInfo()])
  .then(res => {
    userInfo.setUserInfo(res[1]);
    userInfo.setUserAvatar(res[1]);
    let cards = res[0].reverse();
    cardElementList.renderElements(cards, res[1]._id);
  })
  .catch(err => console.log(err))

// Открытие попапа изображения
const handleCardClick = (name, link) => {
  popupWithImage.open(name, link);
}

const popupWithImage = new PopupWithImage(popupImage);
popupWithImage.setEventListeners();

// Попап удаления карточки
const popupWithConfirmation = new PopupWithConfirmation(
  popupDeleteConfirm,
  function handleDeleteClick(e, cardId) {
    e.preventDefault();
    api.deleteCard(cardId)
      .then(res => {
        popupWithConfirmation.delete();
        popupWithConfirmation.close();
      })
      .catch(err => console.log(err))
  },
)

popupWithConfirmation.setEventListeners();

// Создание и отрисовка начальных карточек из массива
const createCard = (cardData, userId) => {
  const card = new Card(
    cardData,
    userId,
    cardTemplate,
    handleCardClick,
    function handleLikeClick(cardId) {
      card.checkUserLike()
        ? api.deleteLike(cardId)
          .then(res => {
            card.setLikes(res.likes);
          })
          .catch(err => console.log(err))
        : api.addLike(cardId)
          .then(res => {
            card.setLikes(res.likes);
          })
          .catch(err => console.log(err))
    },
    function handleDeleteButtonClick(cardId, card) {
      popupWithConfirmation.open(cardId, card);
    }
  );
  const cardElement = card.generateCard();
  return cardElement;
}

// Создание элемента
const renderer = (cardData, userId) => {
  const card = createCard(cardData, userId);

  cardElementList.addItem(card);
}

const cardElementList = new Section(renderer, cardsList);

// Создание новой карточки и поведение попапа
const popupAddCardForm = new PopupWithForm(
  popupAddPlace,
  function handleCardAddFormSubmit(e, inputValues) {
    popupAddCardForm.setButtonText('Сохранение...');
    e.preventDefault();
    api.addCard(inputValues)
      .then((res) => {
        renderer(res, res._id);
      })
      .catch(err => console.log(err))
      .finally(() => {
        popupAddCardForm.setButtonText('Создать');
      })
  }
);

popupAddCardForm.setEventListeners();

// Открытие попапа добавления карточки
cardAddOpenButton.addEventListener('click', () => {
  formAddCardValidation.resetValidation();
  popupAddCardForm.open();
})

// Отражение информации о пользователе
const userInfo = new UserInfo({ profileName, profileAbout, profileAvatar });

const popupProfileForm = new PopupWithForm(
  popupEditProfile,
  function handleProfileFormSubmit(e, inputValues) {
    popupProfileForm.setButtonText('Сохранение...');
    e.preventDefault();
    api.setUser(inputValues)
      .then((res) => {
        userInfo.setUserInfo(res);
      })
      .finally(() => {
        popupProfileForm.setButtonText('Сохранить');
      })
  }
);

popupProfileForm.setEventListeners();

// Открытие попапа редактирования профиля
profileOpenButton.addEventListener('click', () => {
  const { name, about } = userInfo.getUserInfo();
  profileInputName.value = name;
  profileInputAbout.value = about;
  profileFormValidation.resetValidation();
  popupProfileForm.open();
})

// Попап изменения аватара
const popupAvatarForm = new PopupWithForm(
  popupEditAvatar,
  function handleEditAvatar(e, inputValues) {
    popupAvatarForm.setButtonText('Сохранение...');
    e.preventDefault();
    api.setAvatar(inputValues)
      .then((res) => {
        userInfo.setUserAvatar(res);
      })
      .finally(() => {
        popupAvatarForm.setButtonText('Сохранить');
      })
  }
)

popupAvatarForm.setEventListeners();

// Открытие попапа изменения аватара
avatarOpenButton.addEventListener('click', () => {
  AvatarFormValidation.resetValidation();
  popupAvatarForm.open();
})

// Валидация форм
const profileFormValidation = new FormValidator(validationConfig, profileForm);
const formAddCardValidation = new FormValidator(validationConfig, cardAddForm);
const AvatarFormValidation = new FormValidator(validationConfig, avatarForm);
profileFormValidation.enableValidation();
formAddCardValidation.enableValidation();
AvatarFormValidation.enableValidation();
