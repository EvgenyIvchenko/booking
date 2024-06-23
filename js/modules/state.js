const mapFiltersElement = document.querySelector('.map__filters');
const mapFilterElements = mapFiltersElement.querySelectorAll('.map__filter');
const mapFeaturesElement = mapFiltersElement.querySelector('.map__features');
const adFormElement = document.querySelector('.ad-form');
const adFormHeaderInputElement = adFormElement.querySelector('.ad-form-header__input');
const adFormElementElements = adFormElement.querySelectorAll('.ad-form__element');

export const state = {
  enableState() {
    mapFiltersElement.classList.remove('map__filters--disabled');
    mapFilterElements.forEach((node) => (node.disabled = false));
    mapFeaturesElement.disabled = false;
    adFormElement.classList.remove('ad-form--disabled');
    adFormHeaderInputElement.disabled = false;
    adFormElementElements.forEach((node) => (node.disabled = false));
  },
  disableState() {
    mapFiltersElement.classList.add('map__filters--disabled');
    mapFilterElements.forEach((node) => (node.disabled = true));
    mapFeaturesElement.disabled = true;
    adFormElement.classList.add('ad-form--disabled');
    adFormHeaderInputElement.disabled = true;
    adFormElementElements.forEach((node) => (node.disabled = true));
  }
};
