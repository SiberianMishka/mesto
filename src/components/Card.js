export class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._place = data.place;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  // Поиск элемента и клонирование шаблона
  _getTemplate() {
    const element = document
      .querySelector(this._templateSelector)
      .content.querySelector('.element')
      .cloneNode(true);

    return element;
  }

  // Создание и наполнение элемента
  generateCard() {
    this._element = this._getTemplate();
    this._elementImage = this._element.querySelector('.element__image');
    this._elementName = this._element.querySelector('.element__name');
    this._likeButton = this._element.querySelector('.element__like-button');
    this._deleteButton = this._element.querySelector('.element__delete-button');

    this._elementImage.src = this._link;
    this._elementImage.alt = this._place;
    this._elementName.textContent = this._place;

    this._setEventListeners();

    return this._element;
  }

  // Обработка лайков
  _handleLikeButtonClick() {
    this._likeButton.classList.toggle('element__like-button_active');
  }

  // Удаление элемента
  _handleDeleteButtonClick() {
    this._element.remove();
    this._element = null;
  }

  // Слушатели попапа добавления элемента
  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      this._handleLikeButtonClick();
    });
    this._deleteButton.addEventListener('click', () => {
      this._handleDeleteButtonClick();
    });
    this._elementImage.addEventListener('click', () => {
      this._handleCardClick(this._place, this._link);
    });
  }
}
