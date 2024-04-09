import {createAnnouncements} from './data.js';

const cardList = document.querySelector('#map-canvas');
const cardTemplate = document.querySelector('#card').content.querySelector('.popup');

const similarCards = createAnnouncements(3);
const similarListFragment = document.createDocumentFragment();

const offerType = (type) => {
  switch (type) {
    case 'flat':
      return 'Квартира';

    case 'bungalow':
      return 'Бунгало';

    case 'house':
      return 'Дом';

    case 'palace':
      return 'Дворец';

    default:
      return 'Отель';
  }
};

// const addPhotos = (link) => {
//   const photosList = cardTemplate.querySelector('.popup__photos');
//   const photosItem = photosList.querySelector('.popup__photo');

//   if (link.length > 0) {
//     photosItem.cloneNode(true);
//     photosList.innerHTML = '';

//     for (let i = 0; i < link.length; i++) {
//       photosItem[i].setAttribute('src', link);
//       photosList.appendChild(photosItem[i]);
//     }
//   } else {
//     photosList.remove();
//   }
// };

const addPhotos = (link) => {
  const photosList = cardTemplate.querySelector('.popup__photos');
  const photosItem = photosList.querySelector('.popup__photo');

  photosItem.setAttribute('src', link[0]);

  if (link.length > 1) {
    for (let i = 0; i < link.length; i++) {
      const photosItemCopy = photosItem.cloneNode(true);

      photosItemCopy.setAttribute('src', link[i + 1]);
      photosList.appendChild(photosItemCopy);
    }
  }
};

similarCards.forEach(({author, offer, location}) => {
  const {avatar} = author;
  const {title, address, price, type, rooms, guests, checkin, checkout, features, description, photos} = offer;
  const {lat, lng} = location;
  const cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector('.popup__avatar').setAttribute('src', avatar);
  cardElement.querySelector('.popup__title').textContent = title;
  cardElement.querySelector('.popup__text--address').textContent = address;
  cardElement.querySelector('.popup__text--price ').textContent = `${price} ₽/ночь`;
  cardElement.querySelector('.popup__type').textContent = offerType(type);
  cardElement.querySelector('.popup__text--capacity').textContent = `${rooms} комнаты для ${guests} гостей`;
  cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${checkin}, выезд до ${checkout}`;
  // features-удобства
  // cardElement.querySelector('.popup__features').textContent = title;
  cardElement.querySelector('.popup__description').textContent = description;
  addPhotos(photos);
});
