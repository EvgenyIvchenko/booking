import { data } from './data.js';

const popupTemplate = document.querySelector('#card').content.querySelector('.popup');

const createAvatar = (popup, avatar) => {
  const popupAvatarElement = popup.querySelector('.popup__avatar');

  if (!avatar) {
    return popupAvatarElement.remove();
  }

  popupAvatarElement.setAttribute('src', avatar);
};

const createTextContent = (popup, className, string, data1, data2 = true) => {
  const popupElement = popup.querySelector(className);

  if (!data1 || !data2) {
    return popupElement.remove();
  }

  popupElement.textContent = string;
};

const createFeatures = (popup, features) => {
  const popupFeaturesElement = popup.querySelector('.popup__features');

  if (!features) {
    return popupFeaturesElement.remove();
  }

  popupFeaturesElement.innerHTML = '';

  features.forEach((feature) => {
    const popupFeature = document.createElement('li');
    popupFeature.classList.add('popup__feature', `popup__feature--${feature}`);

    popupFeaturesElement.appendChild(popupFeature);
  });
};

const createPhotos = (popup, photos) => {
  const popupPhotosElement = popup.querySelector('.popup__photos');

  if (!photos) {
    return popupPhotosElement.remove();
  }

  popupPhotosElement.innerHTML = '';

  photos.forEach((photo) => {
    const popupPhoto = document.createElement('img');
    popupPhoto.classList.add('popup__photo');
    popupPhoto.src = photo;
    popupPhoto.width = data.card.photo.width;
    popupPhoto.height = data.card.photo.height;
    popupPhoto.alt = data.card.photo.alt;

    popupPhotosElement.appendChild(popupPhoto);
  });
};

export const createCard = ({ author, offer }) => {
  const { avatar } = author;
  const { title, address, price, type, rooms, guests, checkin, checkout, features, description, photos } = offer;
  const popup = popupTemplate.cloneNode(true);

  createAvatar(popup, avatar);
  createTextContent(popup, '.popup__title', title, title);
  createTextContent(popup, '.popup__text--address', address, address);
  createTextContent(popup, '.popup__text--price', `${price} ₽/ночь`, price);
  createTextContent(popup, '.popup__type', data.card.PopupType[type], type);
  createTextContent(popup, '.popup__text--capacity', `${rooms} комнаты для ${guests} гостей`, rooms, guests);
  createTextContent(popup, '.popup__text--time', `Заезд после ${checkin}, выезд до ${checkout}`, checkin, checkout);
  createTextContent(popup, '.popup__description', description, description);
  createFeatures(popup, features);
  createPhotos(popup, photos);

  return popup;
};
