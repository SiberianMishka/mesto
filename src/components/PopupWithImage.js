import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popupSelector.querySelector('.popup-image__image');
    this._popupName = this._popupSelector.querySelector('.popup-image__name');
  }

  open(name, link) {
    // Вставляет в попап картинку и атрибут src изображения
    this._popupImage.src = link;
    this._popupImage.alt = name;
    this._popupName.textContent = name;

    super.open();
  }
}

// Создайте класс PopupWithImage, который наследует от Popup. Этот класс должен перезаписывать родительский метод open.
// В методе open класса PopupWithImage нужно вставлять в попап картинку с src изображения и подписью к картинке.
