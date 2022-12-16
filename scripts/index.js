const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// Переменные для шаблона элементов
const elementsList = document.querySelector('.elements__grid');
const elementTemplate = document.querySelector('#element-template').content.querySelector('.element');
// Переменные для редактирования профиля
const profileName = document.querySelector('.profile-info__name');
const profileAbout = document.querySelector('.profile-info__about');
const editProfileElement = document.querySelector('.popup_edit-profile');
const inputName = editProfileElement.querySelector('.popup__input-name');
const inputAbout = editProfileElement.querySelector('.popup__input-about');
const editButton = document.querySelector('.profile-info__edit-button');
const profileForm = editProfileElement.querySelector('.profile-form');
// Переменные для добавления элемента
const addPlaceButton = document.querySelector('.profile__add-button');
const addPlaceElement = document.querySelector('.popup_add-place');
const inputPlace = addPlaceElement.querySelector('.popup__input-place');
const inputImage = addPlaceElement.querySelector('.popup__input-img');
const addForm = addPlaceElement.querySelector('.add-form');
// Переменные для попапа изображения
const popupImageElement = document.querySelector('.popup-image');
const popupImage = popupImageElement.querySelector('.popup-image__image');
const popupName = popupImageElement.querySelector('.popup-image__name');
// Переменные для крестиков
const closeButtons = document.querySelectorAll('.popup__close-button');
// Создание элементов по шаблону
function createElement(item) {
  const element = elementTemplate.cloneNode(true);
  const elementImage = element.querySelector('.element__image');
  const elementName = element.querySelector('.element__name');
  const likeButton = element.querySelector('.element__like-button');
  const deleteButton = element.querySelector('.element__delete-button');
  likeButton.addEventListener('click', handleLikeButtonClick);
  deleteButton.addEventListener('click', handleDeleteButtonClick);
  elementImage.addEventListener('click', handleElementImageClick);
  elementImage.src = item.link;
  elementImage.alt = item.name;
  elementName.textContent = item.name;
  return element;
}

const renderElement = (item, wrapElement) => {
  const element = createElement(item);
  wrapElement.prepend(element);
}

// Действия при нажатии Esc
const handleEscClick = (e) => {
  const openedPopup = document.querySelector('.popup_opened');
  if (e.key === "Escape") {
    closePopup(openedPopup);
  }
}

// Закрытие по оверлею
const handleOverlayClick = (e) => {
  const openedPopup = document.querySelector('.popup_opened');
  if (!e.target.closest('.popup__container') && !e.target.closest('.popup-image__container')) {
    closePopup(openedPopup);
  }
}

// Универсальные функции открытия и закрытия попапа
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleEscClick);
  popup.addEventListener('click', handleOverlayClick);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleEscClick);
}

// Универсальная функция обработки крестиков
closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

// Функции для обработки лайков, удалений и открытия-закрытия попапа изображения
const handleLikeButtonClick = (e) => {
  e.target.classList.toggle('element__like-button_active');
}

const handleDeleteButtonClick = (e) => {
  e.target.closest('.element').remove();
}

const handleElementImageClick = (e) => {
  popupImage.src = e.target.src;
  popupImage.alt = e.target.alt;
  popupName.textContent = e.target.alt;
  openPopup(popupImageElement);
}

function closeImagePopup() {
  closePopup(popupImageElement);
}
// Заполнение элементов из массива
initialCards.forEach(function(item) {
  renderElement(item, elementsList);
})
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
// Функции попапа добавления элемента
function openAddPlacePopup() {
  addForm.reset();
  button = addPlaceElement.querySelector('.popup__button');
  button.classList.add('popup__button_disabled');
  button.disabled = 'disabled';
  openPopup(addPlaceElement);
};

function closeAddPlacePopup() {
  closePopup(addPlaceElement);
};

function handleAddFormSubmit(e) {
  e.preventDefault();
  const newElement = {
    name: inputPlace.value,
    link: inputImage.value
  }
  renderElement(newElement, elementsList);
  closeAddPlacePopup();
};
// Слушатели попапа редактирования профиля
profileForm.addEventListener('submit', handleProfileFormSubmit);
editButton.addEventListener('click', openEditPopup);
// Слушатели попапа добавления элемента
addPlaceButton.addEventListener('click', openAddPlacePopup);
addForm.addEventListener('submit', handleAddFormSubmit);
