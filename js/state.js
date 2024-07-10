const mapFiltersElement = document.querySelector('.map__filters');
const mapFilterElements = mapFiltersElement.querySelectorAll('map__filter');
const mapFeaturesElement = mapFiltersElement.querySelector('.map__features');
const adFormElement = document.querySelector('.ad-form');
const adFormHeaderElement = adFormElement.querySelector('.ad-form-header');
const adFormElementElements = adFormElement.querySelectorAll('.ad-form__element');

function switchInactiveState() {
  mapFiltersElement.classList.add('map__filters--disabled');
  mapFilterElements.forEach((element) => (element.disabled = true));
  mapFeaturesElement.disabled = true;
  adFormElement.classList.add('ad-form--disabled');
  adFormHeaderElement.disabled = true;
  adFormElementElements.forEach((element) => (element.disabled = true));
}

function switchActiveState() {
  mapFiltersElement.classList.remove('map__filters--disabled');
  mapFilterElements.forEach((element) => (element.disabled = false));
  mapFeaturesElement.disabled = false;
  adFormElement.classList.remove('ad-form--disabled');
  adFormHeaderElement.disabled = false;
  adFormElementElements.forEach((element) => (element.disabled = false));
}

export {switchInactiveState, switchActiveState};
