import { handleElementImageClick } from "./handleElementImageClick.js";

export class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
  }

  // Поиск элемента и клонирование шаблона
  _getTemplate() {
    const element = document
      .querySelector(this._templateSelector)
      .content.querySelector(".element")
      .cloneNode(true);
    return element;
  }

  // Создание и наполнение элемента
  generateCard() {
    this._element = this._getTemplate();
    const elementImage = this._element.querySelector('.element__image');
    const elementName = this._element.querySelector('.element__name');
    elementImage.src = this._link;
    elementImage.alt = this._name;
    elementName.textContent = this._name;
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
  }

  // Слушатели попапа добавления элемента
  _setEventListeners() {
    this._likeButton = this._element.querySelector(".element__like-button");
    this._deleteButton = this._element.querySelector(".element__delete-button");
    this._elementImage = this._element.querySelector(".element__image");

    this._likeButton.addEventListener("click", () => {
      this._handleLikeButtonClick();
    });
    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteButtonClick();
    });
    this._elementImage.addEventListener("click", () => {
      handleElementImageClick(this._link, this._name);
    });
  }
}
