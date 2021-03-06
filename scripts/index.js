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

const popupProfileEdit = document.querySelector('.popup_edit');

const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');

const profileNameInput = document.querySelector('.popup__input_data_name');
const profileAboutInput = document.querySelector('.popup__input_data_about');

const popupProfileEditButtonOpen = document.querySelector('.profile__button-edit');
const popupProfileEditButtonClose = document.querySelector('.popup__button-close-edit');

const popupFormEdit = document.querySelector('.popup__form_form-edit');

const popupAddForm = document.querySelector('.popup_add');
const popupAddFormButtonOpen = document.querySelector('.profile__button-add');
const popupAddFormButtonClose = document.querySelector('.popup__button-close-add');

const popupZoomImageCloseButton = document.querySelector('.popup__button-close_zoom-image');
const popupZoomImage = document.querySelector('.popup_zoom-image');


//общая функция открытия окна

const openModalWindow = (modalWindow) => {
  modalWindow.classList.add('popup_open');
};

//общая функция закрытия окна

const closeModalWindow = (modalWindow) => {
  modalWindow.classList.remove('popup_open');
};

function submitFormProfileEdit (evt) {
  evt.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileAbout.textContent = profileAboutInput.value;
  closeModalWindow (popupProfileEdit);
}

function fillFormProfileEdit () {
  profileNameInput.value = profileName.textContent;
  profileAboutInput.value = profileAbout.textContent;
};

popupProfileEditButtonOpen.addEventListener('click', function () {
  fillFormProfileEdit();
  openModalWindow(popupProfileEdit);
});
popupProfileEditButtonClose.addEventListener('click', () => closeModalWindow(popupProfileEdit));
popupFormEdit.addEventListener('submit', submitFormProfileEdit);

//реализовываем открытие и закрытие кнопки "добавить место"

popupAddFormButtonOpen.addEventListener('click', () => openModalWindow(popupAddForm));
popupAddFormButtonClose.addEventListener('click', () => closeModalWindow(popupAddForm));



const elementsContainer = document.querySelector('.elements__list');
const cardAddForm = document.querySelector('.popup__form_form-add');
const cardTemplate = document.querySelector('#card-template');


function createElement (data) {
  const cardElement = cardTemplate.content.cloneNode(true);

  const cardTitle = cardElement.querySelector('.element__title');
  cardTitle.textContent = data.name;
  
  const cardImage = cardElement.querySelector('.element__image');
  cardImage.alt = data.name;
  cardImage.src = data.link;

  const deleteButton = cardElement.querySelector('.element__delete');
  deleteButton.addEventListener('click', deleteCardHandler);

  const likeButton = cardElement.querySelector('.element__like');
  likeButton.addEventListener('click',likeCardHandler);
  
  cardImage.addEventListener('click', () => {
    openPopupWithImage(data);
  });
  
  return cardElement;  
};

popupZoomImageCloseButton.addEventListener('click', () => closeModalWindow(popupZoomImage));

const popupSignature = document.querySelector('.popup__signature-image');
const popupImage = document.querySelector('.popup__image');

function openPopupWithImage (data) {
  
  popupSignature.textContent = data.name;

  popupImage.src = data.link;
  popupImage.alt = data.name;

  openModalWindow(popupZoomImage);
}

function deleteCardHandler (evt) {
  evt.target.closest('.element').remove();
}

function likeCardHandler (evt) {
  evt.target.classList.toggle('elements__like-button_active');
}

function renderCard () {
  const card = initialCards.map(function (item) {
  const newCard = createElement(item);
    
  return newCard;
  });

  elementsContainer.append(...card);
}

function cardAdd (event) {
  event.preventDefault();

  const placeName = document.querySelector('.popup__input_place_name');
  const placeUrl = document.querySelector('.popup__input_place_url');

  const newPlaceName = placeName.value;
  const newPlaceUrl = placeUrl.value;

  const newCard = createElement({name: newPlaceName, link: newPlaceUrl});

  elementsContainer.prepend(newCard);

  cardAddForm.reset();
  closeModalWindow(popupAddForm);
}

renderCard();
cardAddForm.addEventListener('submit', cardAdd);