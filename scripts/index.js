let popup = document.querySelector('.popup');
let openPopupButton = document.querySelector('.profile__button-edit');
let closePopupButton = document.querySelector('.popup__button-close');
let inputName = document.querySelector('[name="userName"]');
let inputAbout = document.querySelector('[name="userAbout"]');
let profileName = document.querySelector('.profile__name');
let profileAbout = document.querySelector('.profile__about');
let popupForm = popup.querySelector('.popup__container')


function openPopup() {
  popup.classList.add('popup_open');
  inputName.value = profileName.textContent;
  inputAbout.value = profileAbout.textContent;;
}

function closePopup() {
  popup.classList.remove('popup_open');
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileAbout.textContent = inputAbout.value;
  closePopup();
}


openPopupButton.addEventListener('click', openPopup);
closePopupButton.addEventListener('click', closePopup);
popupForm.addEventListener('submit', formSubmitHandler);