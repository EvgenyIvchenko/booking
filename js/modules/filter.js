import { data } from './data.js';

const filterElement = document.querySelector('.map__filters');
const housingTypeElement = filterElement.querySelector('#housing-type');
const housingPriceElement = filterElement.querySelector('#housing-price');
const housingRoomsElement = filterElement.querySelector('#housing-rooms');
const housingGuestsElement = filterElement.querySelector('#housing-guests');
const housingFeatureElements = filterElement.querySelectorAll('.map__checkbox');

const checkHousingType = (offers) =>
  housingTypeElement.value === offers.offer.type || housingTypeElement.value === 'any';

const checkHousingRooms = (offers) =>
  Number(housingRoomsElement.value) === offers.offer.rooms || housingRoomsElement.value === 'any';

const checkHousingGuests = (offers) =>
  Number(housingGuestsElement.value) === offers.offer.guests || housingGuestsElement.value === 'any';

// const checkHousingPrice = (offers, price) =>
//   offers.offer.price

const getFilteredOffers = () => {

  return filteredOffers;
};
