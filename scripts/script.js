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

// профиль
const accountPopUp = document.querySelector('.popup[data-type="account"]');
const accountEditButton = document.querySelector('.profile__edit');
const accountSaveButton = accountPopUp.querySelector('.popup__container');
const accountForm = document.forms.account;
const accountInputName = accountForm.elements.username;
const accountInputDesc = accountForm.elements.description;

// место
const placePopUp = document.querySelector('.popup[data-type="place"]');
const placeAddButton = document.querySelector('.profile__add');
const placeSaveButton = placePopUp.querySelector('.popup__container');
const placeForm = document.forms.place;
const placeInputTitle = placeForm.elements.title;
const placeInputLink = placeForm.elements.link;

// имя и профессия
const accountName = document.querySelector('.profile__name');
const accountProfession = document.querySelector('.profile__profession');

// лайтбокс
const lightbox = document.querySelector('.popup[data-type="lightbox"]');

accountInputName.value = accountName
accountInputDesc.value = accountProfession


function closeOverlay(evt) {
  if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')){
    const currentPopUp = document.querySelector('.popup_opened');
    closePopUp(currentPopUp);
  }
};

function handleEsc(evt) {
  if (evt.key === 'Escape') {
    const currentPopUp = document.querySelector('.popup_opened');
    closePopUp(currentPopUp);
  }
}


const showPopUp = (popup) => {
  popup.classList.add('popup_opened');
  popup.addEventListener('click', closeOverlay);
  document.addEventListener('keyup', handleEsc);
}


const closePopUp = (popup) => {
  popup.classList.remove('popup_opened');
  popup.removeEventListener('click', closeOverlay);
  document.removeEventListener('keyup', handleEsc);
}


function handleAccountFormSubmit (evt) {
  evt.preventDefault();
  accountName.textContent = accountInputName.value;
  accountProfession.textContent = accountInputDesc.value;
  closePopUp(accountPopUp);
}

accountEditButton.addEventListener('click', () => {
  accountInputName.value = accountName.textContent;
  accountInputDesc.value = accountProfession.textContent;
  showPopUp(accountPopUp);
});

accountSaveButton.addEventListener('submit', handleAccountFormSubmit);






function handlePlaceFormSubmit (evt) {
  evt.preventDefault();
  const newCard = {};
  newCard.name = placeInputTitle.value;
  newCard.link = placeInputLink.value;
  renderCard(createCard(newCard));
  closePopUp(placePopUp);
  placeForm.reset();
}

placeAddButton.addEventListener('click', () => {
  showPopUp(placePopUp);
});

placeSaveButton.addEventListener('submit', handlePlaceFormSubmit); // 4.3




function addLightbox(title, link, cardImage) {
  cardImage.addEventListener('click', (evt) => {
    const lightboxCaption = lightbox.querySelector('.popup__caption');
    const lightboxImage = lightbox.querySelector('.popup__image');
    lightboxCaption.textContent = title;
    lightboxImage.src = link;
    lightboxImage.alt = title;
    showPopUp(lightbox);
  })
}



function createCard(newCard) {
  const cardTemplate = document.querySelector('#card').content;
  const card = cardTemplate.cloneNode(true);
  let cardTitle = card.querySelector('.card__name');
  const cardImage = card.querySelector('.card__image');
  const cardLikeBtn = card.querySelector('.card__like');
  cardTitle.textContent = newCard.name;
  cardImage.src = newCard.link;
  cardImage.alt = newCard.name;
  cardLikeBtn.addEventListener('click', function (event) {
    event.target.classList.toggle('card__like_active');
  })
  card.querySelector('.card__delete').addEventListener('click', function (event) {
    event.target.parentElement.remove();
  })
  addLightbox(newCard.name, newCard.link, cardImage);
  return card;
}

function renderCard(card, method = 'prepend') {
  const cardsContainer = document.querySelector('.cards__items');
  if (method === 'prepend') {
    cardsContainer.prepend(card);
  } else {
    cardsContainer.append(card);
  }
}

initialCards.forEach(function(element) {
  renderCard(createCard(element), 'append');
});

