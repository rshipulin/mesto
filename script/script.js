let accountPopUp = document.querySelector('.popup');
let accountEdit = document.querySelector('.profile__edit');
let accountClose = accountPopUp.querySelector('.popup__close');
let accountSave = accountPopUp.querySelector('.popup__container');
let accountInputName = accountPopUp.querySelector('.popup__input_name');
let accountInputProf = accountPopUp.querySelector('.popup__input_profession');
let accountName = document.querySelector('.profile__name');
let accountProfession = document.querySelector('.profile__profession');

function popUpToggle(obj) {
  obj.classList.toggle('popup_opened')
}

function showPopup() {
  accountInputName.value = accountName.textContent;
  accountInputProf.value = accountProfession.textContent;
  popUpToggle(accountPopUp);
}

function closePopup() {
  popUpToggle(accountPopUp);
}

function accountFormSubmit (evt) {
  evt.preventDefault();
  accountName.textContent = accountInputName.value;
  accountProfession.textContent = accountInputProf.value;
  popUpToggle(accountPopUp);
}

accountEdit.addEventListener('click', showPopup); // открытие попапа
accountClose.addEventListener('click', closePopup); // закрытие попапа
accountSave.addEventListener('submit', accountFormSubmit); // отправка формы
