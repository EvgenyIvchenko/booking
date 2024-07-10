const mapFiltersElement = document.querySelector('.map__filters');
const housingTypeElement = mapFiltersElement.querySelector('#housing-type');
const housingPriceElement = mapFiltersElement.querySelector('#housing-price');
const housingRoomsElement = mapFiltersElement.querySelector('#housing-rooms');
const housingGuestsElement = mapFiltersElement.querySelector('#housing-guests');
const mapCheckboxElements = mapFiltersElement.querySelectorAll('.map__checkbox');
const resetElement = document.querySelector('.ad-form__reset');
const RERENDER_DELAY = 2000;

const price = {
  low: {
    from: 0,
    to: 10000
  },
  middle: {
    from: 10000,
    to: 50000,
  },
  high: {
    from: 50000,
    to: Infinity,
  },
};

function filterHousingType(announcement) {
  if (housingTypeElement.value !== 'any') {
    return announcement.offer.type === housingTypeElement.value;
  }

  return announcement;
}

function filterPrice(announcement) {
  if (housingPriceElement.value !== 'any') {
    return announcement.offer.price >= price[housingPriceElement.value].from &&
      announcement.offer.price < price[housingPriceElement.value].to;
  }

  return announcement;
}

function filterHousingRooms(announcement) {
  if (housingRoomsElement.value !== 'any') {
    return announcement.offer.rooms === Number(housingRoomsElement.value);
  }

  return announcement;
}

function filterHousingGuests(announcement) {
  if (housingGuestsElement.value !== 'any') {
    return announcement.offer.guests === Number(housingGuestsElement.value);
  }

  return announcement;
}

function filterCheckbox(announcement) {
  return Array.from(mapCheckboxElements).every((checkbox) => {
    if (!checkbox.checked) {
      return true;
    }

    if (!announcement.offer.features) {
      return false;
    }

    return announcement.offer.features.includes(checkbox.value);
  });
}

function onResetClick() {
  mapFiltersElement.reset();
}

function initFilter(data, render) {
  resetElement.addEventListener('click', onResetClick);

  mapFiltersElement.addEventListener('change', () => {
    let announcements = data.slice(0);

    announcements = announcements.filter((announcement) => (
      filterHousingType(announcement) &&
      filterPrice(announcement) &&
      filterHousingRooms(announcement) &&
      filterHousingGuests(announcement) &&
      filterCheckbox(announcement)
    ));

    render(announcements);
  });
}

export {initFilter};
