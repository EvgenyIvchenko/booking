import { data } from './data.js';

const filterElement = document.querySelector('.map__filters');
const housingTypeElement = filterElement.querySelector('#housing-type');
const housingPriceElement = filterElement.querySelector('#housing-price');
const housingRoomsElement = filterElement.querySelector('#housing-rooms');
const housingGuestsElement = filterElement.querySelector('#housing-guests');
const housingFeatureElements = filterElement.querySelectorAll('.map__checkbox');

const checkHousingType = (offers) =>
  offers.offer.type === housingTypeElement.value || housingTypeElement.value === 'any';

const checkHousingRooms = (offers) =>
  offers.offer.rooms === Number(housingRoomsElement.value) || housingRoomsElement.value === 'any';

const checkHousingGuests = (offers) =>
  offers.offer.guests  === Number(housingGuestsElement.value)|| housingGuestsElement.value === 'any';

const checkHousingFeatures = (offers, features) => {
  if (!features.length) {
    return true;
  }

  if (!offers.offer.features) {
    return false;
  }

  return features.every((feature) => offers.offer.features.includes(feature));
};

const checkHousingPrice = (offers) => {
  switch (housingPriceElement.value) {
    case 'any':
      return true;
    case 'low':
      return offers.offer.price < data.filter.PRICE.LOW;
    case 'middle':
      return offers.offer.price >= data.filter.PRICE.LOW && offers.offer.price <= data.filter.PRICE.HIGH;
    case 'high':
      return offers.offer.price > data.filter.PRICE.HIGH;
  }
};

export const getFilteredOffers = (offers) => {
  const selectedFeatures = [];
  const filteredOffers = [];

  housingFeatureElements.forEach((checkbox) => {
    if (checkbox.checked) {
      selectedFeatures.push(checkbox.value);
    }
  });

  for (let i = 0; i < offers.length; i++) {
    const offer = offers[i];

    if (
      checkHousingType(offer) &&
      checkHousingRooms(offer) &&
      checkHousingGuests(offer) &&
      checkHousingFeatures(offer, selectedFeatures) &&
      checkHousingPrice(offer)
    ) {
      filteredOffers.push(offer);
    }

    if (filteredOffers.length >= data.filter.OFFER_COUNT) {
      break;
    }
  }

  return filteredOffers;
};

export const setOnFilterChange  = (cb) => {
  filterElement.addEventListener('change', () => cb());
};
