const mapFilters = document.querySelector('.map__filters');
const mapFilterNodes = mapFilters.querySelectorAll('.map__filter');
const mapFeatures = mapFilters.querySelector('.map__features');
const adForm = document.querySelector('.ad-form');
const adFormHeaderInput = adForm.querySelector('.ad-form-header__input');
const adFormElementNodes = adForm.querySelectorAll('.ad-form__element');

export const disableState = () => {
  mapFilters.classList.add('map__filters--disabled');
  mapFilterNodes.forEach((node) => (node.disabled = true));
  mapFeatures.disabled = true;
  adForm.classList.add('ad-form--disabled');
  adFormHeaderInput.disabled = true;
  adFormElementNodes.forEach((node) => (node.disabled = true));
};

export const enableState = () => {
  mapFilters.classList.remove('map__filters--disabled');
  mapFilterNodes.forEach((node) => (node.disabled = false));
  mapFeatures.disabled = false;
  adForm.classList.remove('ad-form--disabled');
  adFormHeaderInput.disabled = false;
  adFormElementNodes.forEach((node) => (node.disabled = false));
};
