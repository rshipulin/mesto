let accountPopUp = document.querySelector('.popup');
let accountEdit = document.querySelector('.profile__edit');
let accountClose = accountPopUp.querySelector('.popup__close');
let accountSave = accountPopUp.querySelector('.popup__container');
let accountInputName = accountPopUp.querySelector('.popup__form-item_input_name');
let accountInputProf = accountPopUp.querySelector('.popup__form-item_input_profession');
let accountName = document.querySelector('.profile__name');
let accountProfession = document.querySelector('.profile__profession');

function showPopup() {
  accountInputName.value = accountName.textContent;
  accountInputProf.value = accountProfession.textContent;
  accountPopUp.classList.toggle('popup_opened');
}

function closePopup() {
  accountPopUp.classList.toggle('popup_opened');
}

function accountFormSubmit (evt) {
  evt.preventDefault();
  accountName.textContent = accountInputName.value;
  accountProfession.textContent = accountInputProf.value;
  accountPopUp.classList.toggle('popup_opened');
}

accountEdit.addEventListener('click', showPopup);
accountClose.addEventListener('click', closePopup);
accountSave.addEventListener('submit', accountFormSubmit);
