let popup = document.querySelector('.popup');
let page = document.querySelector('.page');
let name = document.querySelector('.profile__name');
let profession = document.querySelector('.profile__profession');
let popupOpenButton = document.querySelector('.profile__edit');
let popupSaveButton = document.querySelector('.popup__submit');
let popupCloseButton = popup.querySelector('.popup__close');
let form = popup.querySelector('.popup__form');
let nameInput = form.querySelector('.popup__input_name');
let jobInput = form.querySelector('.popup__input_profession');

let popupToggle = function(event) {
  event.preventDefault();
  popup.classList.toggle('popup__opened');
}

let closePopup = function() {
  if(event.target !== event.currentTarget) {
    return;
  }
  popupToggle(event);
}

function ReadValue(evt) {
  evt.preventDefault();
  nameInput.value = document.getElementsByName('name')['0'].textContent;
  jobInput.value = document.getElementsByName('job')['0'].textContent;
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  name.textContent = nameInput.value;
  profession.textContent = jobInput.value;
}

popup.addEventListener('click', closePopup);
popupOpenButton.addEventListener('click', popupToggle);
popupCloseButton.addEventListener('click', popupToggle);
popupSaveButton.addEventListener('click', formSubmitHandler);
popupSaveButton.addEventListener('click', closePopup);
