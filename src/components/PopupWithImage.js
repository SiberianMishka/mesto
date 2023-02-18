import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popup) {
    super(popup);
    this._popupImage = this._popup.querySelector('.popup-image__image');
    this._popupName = this._popup.querySelector('.popup-image__name');
  }

  open(name, link) {
    // Вставляет в попап картинку и атрибут src изображения
    this._popupImage.src = link;
    this._popupImage.alt = name;
    this._popupName.textContent = name;

    super.open();
  }
}
