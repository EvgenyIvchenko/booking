const popupTemplate = document.querySelector('#card').content.querySelector('.popup');

const cardPhoto = {
  width: '40',
  height: '40',
  alt: 'Фотография жилья',
};

const PopupType = {
  FLAT: 'Квартира',
  BUNGALOW: 'Бунгало',
  HOUSE: 'Дом',
  PALACE: 'Дворец',
  HOTEL: 'Отель',
};

function createAvatar(popup, avatar) {
  const popupAvatarElement = popup.querySelector('.popup__avatar');

  if (!avatar) {
    return popupAvatarElement.remove();
  }

  popupAvatarElement.setAttribute('src', avatar);
}

function createPopupElement(popup, className, string, data1, data2 = true) {
  const popupElement = popup.querySelector(className);

  if (!data1 || !data2) {
    return popupElement.remove();
  }

  popupElement.textContent = string;
}

function createFeatures(popup, features) {
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
}

function createPhotos(popup, photos) {
  const popupPhotosElement = popup.querySelector('.popup__photos');

  if (!photos) {
    return popupPhotosElement.remove();
  }

  popupPhotosElement.innerHTML = '';

  photos.forEach((photo) => {
    const popupPhoto = document.createElement('img');
    popupPhoto.classList.add('popup__photo');
    popupPhoto.src = photo;
    popupPhoto.width = cardPhoto.width;
    popupPhoto.height = cardPhoto.height;
    popupPhoto.alt = cardPhoto.alt;

    popupPhotosElement.appendChild(popupPhoto);
  });
}

function renderCard({author, offer}) {
  const popupElement = popupTemplate.cloneNode(true);

  const priceString = `${offer.price} ₽/ночь`;
  const capacityString = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  const timeString = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;

  createAvatar(popupElement, author.avatar);
  createPopupElement(popupElement, '.popup__title', offer.title, offer.title);
  createPopupElement(popupElement, '.popup__text--address', offer.address, offer.address);
  createPopupElement(popupElement, '.popup__text--price', priceString, offer.price);
  createPopupElement(popupElement, '.popup__type', PopupType[offer.type], offer.type);
  createPopupElement(popupElement, '.popup__text--capacity', capacityString, offer.rooms, offer.guests);
  createPopupElement(popupElement, '.popup__text--time', timeString, offer.checkin, offer.checkout);
  createPopupElement(popupElement, '.popup__description', offer.description, offer.description);
  createFeatures(popupElement, offer.features);
  createPhotos(popupElement, offer.photos);

  return popupElement;
}

export {renderCard};
