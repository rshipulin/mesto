const initialCards = [
  {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const accountPopUp = document.querySelector('.popup[data-type="account"]');
const accountEditButton = document.querySelector('.profile__edit');
const accountCloseButton = accountPopUp.querySelector('.popup__close');
const accountSaveButton = accountPopUp.querySelector('.popup__container');
const accountInputName = accountPopUp.querySelector('.popup__form-item_input_name');
const accountInputDesc = accountPopUp.querySelector('.popup__form-item_input_profession');

const accountName = document.querySelector('.profile__name');
const accountDescription = document.querySelector('.profile__profession');

const placePopUp = document.querySelector('.popup[data-type="place"]');
const placeAddButton = document.querySelector('.profile__add');
const placeCloseButton = placePopUp.querySelector('.popup__close');
const placeSaveButton = placePopUp.querySelector('.popup__container');
const placeInputTitle = placePopUp.querySelector('.popup__form-item_input_name');
const placeInputLink = placePopUp.querySelector('.popup__form-item_input_profession');

const imagePopUp = document.querySelector('.popup[data-type="image"]');
const imageCloseButton = imagePopUp.querySelector('.popup__close');
const imageSaveButton = imagePopUp.querySelector('.popup__container');


function popUpToggle(obj) {
  obj.classList.toggle('popup_opened')
}

function showAccountPopUp() {
  accountInputName.value = accountName.textContent;
  accountInputDesc.value = accountDescription.textContent;

  popUpToggle(accountPopUp);
}

function closeAccountPopUp() {
  popUpToggle(accountPopUp);
}

function accountFormSubmitHandler (evt) {
  evt.preventDefault();
  accountName.textContent = accountInputName.value;
  accountDescription.textContent = accountInputDesc.value;
  popUpToggle(accountPopUp);
}

accountEditButton.addEventListener('click', showAccountPopUp);
accountCloseButton.addEventListener('click', closeAccountPopUp);
accountSaveButton.addEventListener('submit', accountFormSubmitHandler);



function showPlacePopUp() {
  popUpToggle(placePopUp);
}

function closePlacePopUp() {
  popUpToggle(placePopUp);
}

function placeFormSubmitHandler (evt) {
  evt.preventDefault();
  const newCard = {};
  newCard.name = placeInputTitle.value;
  newCard.link = placeInputLink.value;
  console.log(createCard(newCard))
  renderCard(createCard(newCard));
  popUpToggle(placePopUp);

}

placeAddButton.addEventListener('click', showPlacePopUp);
placeCloseButton.addEventListener('click', closePlacePopUp);
placeSaveButton.addEventListener('submit', placeFormSubmitHandler);

// Попап с изображением
function showImagePopUp() {
  popUpToggle(imagePopUp);
}

function closeImagePopUp() {
  popUpToggle(imagePopUp);
}

imageCloseButton.addEventListener('click', closeImagePopUp);

function addPopupImage(card) {
  const cardImage = card.querySelector('.card__image');
  cardImage.addEventListener('click',function (event) {
    const caption = event.target.parentElement.querySelector('.card__name').textContent;
    const imgSrc = event.target.src
    let popupCaption = imagePopUp.querySelector('.popup__caption');
    const popupImage = imagePopUp.querySelector('.popup__image');
    popupCaption.textContent = caption;
    popupImage.src = imgSrc;
    popupImage.alt = caption;
    showImagePopUp();
  });
}

// карточки

const cardsContainer = document.querySelector('.cards__items');
const cardTemplate = document.querySelector('#card').content;

function createCard(array) {
  const card = cardTemplate.cloneNode(true);
  card.querySelector('.card__name').textContent = array.name;
  card.querySelector('.card__image').src = array.link;
  card.querySelector('.card__image').alt = array.name;
  card.querySelector('.card__like').addEventListener('click', function (event) {
    event.target.classList.toggle('card__like_active');
  })
  card.querySelector('.card__delete').addEventListener('click', function (event) {
    event.target.parentElement.remove();
  })
  addPopupImage(card);
  return card;
}

function renderCard(card, method = 'prepend') {
  if (method === 'prepend') {
    cardsContainer.prepend(card);
  } else {
    cardsContainer.append(card);
  }
}

initialCards.forEach(function(element) {
  renderCard(createCard(element), 'append');
});
