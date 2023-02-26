export class Card {
  constructor(
    data,
    userId,
    templateSelector,
    handleCardClick,
    handleLikeClick,
    handleDeleteButtonClick
  ) {
    this._name = data.name;
    this._link = data.link;
    this._cardId = data._id;
    this._likes = data.likes;
    this._ownerId = data.owner._id;
    this._userId = userId;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteButtonClick = handleDeleteButtonClick;

    this._element = this._getTemplate();
    this._elementImage = this._element.querySelector('.element__image');
    this._elementName = this._element.querySelector('.element__name');
    this._likeButton = this._element.querySelector('.element__like-button');
    this._deleteButton = this._element.querySelector('.element__delete-button');
    this._likeCounter = this._element.querySelector('.element__like-counter');
  }

  // Поиск элемента и клонирование шаблона
  _getTemplate() {
    const element = document
      .querySelector(this._templateSelector)
      .content.querySelector('.element')
      .cloneNode(true);

    return element;
  }

  // Обработка лайков
  checkUserLike() {
    return this._likes.find(item => item._id === this._userId);
  }

  _setLikeColor() {
    if (this.checkUserLike()) {
      this._likeButton.classList.add('element__like-button_active');
    } else {
      this._likeButton.classList.remove('element__like-button_active');
    }
  }

  setLikes(likes) {
    this._likes = likes;
    this._likeCounter.textContent = this._likes.length;
    this._setLikeColor();
  }

  // состояние кнопки удаления
  _checkDeleteButton() {
    if (this._ownerId !== this._userId) {
      this._deleteButton.style.display = 'none';
    }
  }

  // Слушатели попапа добавления элемента
  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      this._handleLikeClick(this._cardId);
    });
    this._elementImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
    this._deleteButton.addEventListener('click', () => {
      this._handleDeleteButtonClick(this._cardId, this._element);
    });
  }

  // Создание и наполнение элемента
  generateCard() {
    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;
    this._elementName.textContent = this._name;
    this._likeCounter.textContent = this._likes.length;

    this._checkDeleteButton();
    this.setLikes(this._likes);
    this._setEventListeners();

    return this._element;
  }
}
