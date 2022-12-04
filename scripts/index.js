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
const closeButtonEdit = editProfileElement.querySelector('.popup__close-button_edit');
// Переменные для добавления элемента
const addPlaceButton = document.querySelector('.profile__add-button');
const addPlaceElement = document.querySelector('.popup_add-place');
const inputPlace = addPlaceElement.querySelector('.popup__input-place');
const inputImage = addPlaceElement.querySelector('.popup__input-img');
const closeButtonAddPlace = addPlaceElement.querySelector('.popup__close-button_add');
// Переменные для попапа изображения
const popupImageElement = document.querySelector('.popup-image');
const popupImage = popupImageElement.querySelector('.popup-image__image');
const popupName = popupImageElement.querySelector('.popup-image__name');
const closeButtonImage = popupImageElement.querySelector('.popup-image__close-button');
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
  elementName.textContent = item.name;
  return element;
}

const renderElement = (item, wrapElement) => {
  const element = createElement(item);
  wrapElement.prepend(element);
}
// Функции для обработки лайков, удалений и открытия-закрытия попапа изображения
const handleLikeButtonClick = (e) => {
  e.target.classList.toggle('element__like-button_active');
}

const handleDeleteButtonClick = (e) => {
  e.target.closest('.element').remove();
}

const handleElementImageClick = (e) => {
  popupImage.src = e.target.src;
  popupName.textContent = e.target.nextElementSibling.textContent;
  popupImageElement.classList.add('popup_opened');
}

function closeImagePopup() {
  popupImageElement.classList.remove('popup_opened');
}
// Заполнение элементов из массива
initialCards.forEach(function(item) {
  renderElement(item, elementsList);
})
// Функции попапа редактирования профиля
function openEditPopup() {
  editProfileElement.classList.add('popup_opened');
  inputName.value = profileName.textContent;
  inputAbout.value = profileAbout.textContent;
};

function closeEditPopup() {
  editProfileElement.classList.remove('popup_opened');
};

function formEditSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileAbout.textContent = inputAbout.value;
  closeEditPopup();
};
// Функции попапа добавления элемента
function openAddPlacePopup() {
  addPlaceElement.classList.add('popup_opened');
  inputPlace.value = '';
  inputImage.value = '';
};

function closeAddPlacePopup() {
  addPlaceElement.classList.remove('popup_opened');
};

function formAddSubmitHandler(e) {
  e.preventDefault();
  const newElement = {
    name: inputPlace.value,
    link: inputImage.value
  }
  renderElement(newElement, elementsList);
  closeAddPlacePopup();
};
// Слушатели попапа редактирования профиля
editProfileElement.addEventListener('submit', formEditSubmitHandler);
closeButtonEdit.addEventListener('click', closeEditPopup);
editButton.addEventListener('click', openEditPopup);
// Слушатели попапа добавления элемента
addPlaceButton.addEventListener('click', openAddPlacePopup);
closeButtonAddPlace.addEventListener('click', closeAddPlacePopup);
addPlaceElement.addEventListener('submit', formAddSubmitHandler);
// Слушатель попапа изображения
closeButtonImage.addEventListener('click', closeImagePopup);

// TODO: Сделать универсальные функции закрытия и сабмита для попапов, удалить дублирование кнопок
