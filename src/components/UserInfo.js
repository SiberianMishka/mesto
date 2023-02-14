export class UserInfo {
  constructor({ profileNameSelector, profileAboutSelector }) {
    this._profileName = document.querySelector(profileNameSelector);
    this._profileAbout = document.querySelector(profileAboutSelector);
  }

  // Возвращает объект с данными пользователя
  getUserInfo() {
    return {
      name: this._profileName.textContent,
      about: this._profileAbout.textContent
    }
  }

  // Принимает новые данные пользователя и добавляет их на страницу
  setUserInfo(name, about) {
    this._profileName.textContent = name;
    this._profileAbout.textContent = about;
  }
}

// Создайте класс UserInfo
// Класс UserInfo отвечает за управление отображением информации о пользователе на странице. Этот класс:
// Принимает в конструктор объект с селекторами двух элементов: элемента имени пользователя и элемента информации о себе.
// Содержит публичный метод getUserInfo, который возвращает объект с данными пользователя.
// Этот метод пригодится когда данные пользователя нужно будет подставить в форму при открытии.
// Содержит публичный метод setUserInfo, который принимает новые данные пользователя и добавляет их на страницу.
