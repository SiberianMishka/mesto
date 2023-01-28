import { openPopup } from "./index.js";

// Переменные для попапа изображения
const popupImageElement = document.querySelector('.popup-image');
const popupImage = popupImageElement.querySelector('.popup-image__image');
const popupName = popupImageElement.querySelector('.popup-image__name');

// Открытие попапа изображения
export function handleElementImageClick(link, name) {
  popupImage.src = link;
  popupImage.alt = name;
  popupName.textContent = name;
  openPopup(popupImageElement);
}
