export class UserInfo {
  constructor({ profileName, profileAbout, profileAvatar }) {
    this._profileName = document.querySelector(profileName);
    this._profileAbout = document.querySelector(profileAbout);
    this._profileAvatar = document.querySelector(profileAvatar);
  }

  // Возвращает объект с данными пользователя
  getUserInfo() {
    return {
      name: this._profileName.textContent,
      about: this._profileAbout.textContent,
      avatar: this._profileAvatar.src,
    }
  }

  // Принимает новые данные пользователя и добавляет их на страницу
  setUserInfo({ name, about }) {
    this._profileName.textContent = name;
    this._profileAbout.textContent = about;
  }
  // Добавляет новый аватар
  setUserAvatar({ avatar }) {
    this._profileAvatar.src = avatar;
  }
}
