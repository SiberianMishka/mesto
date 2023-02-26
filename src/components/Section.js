export class Section {
  constructor(renderer, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  // Отрисовка всех элементов
  renderElements(items, userId) {
    items.forEach((item) => this._renderer(item, userId));
  }

  // Принимает DOM-элемент и добавляет его в контейнер
  addItem(element) {
    this._container.prepend(element);
  }
}
