const adForm = document.querySelector('.ad-form');
const adFormFieldsets = adForm.querySelectorAll('fieldset');
const adFormSlider = adForm.querySelector('.ad-form__slider');
const filtersForm = document.querySelector('.map__filters');
const filtersFieldsets = filtersForm.querySelectorAll('fieldset');
const filtersSelects = filtersForm.querySelectorAll('select');

const formSwitcher = (elements) => {
  let state = true;

  elements.forEach((element) => {
    if (element.disabled) {
      state = false;
    }

    element.disabled = state;
  });
};

export const disableState = () => {
  adForm.classList.add('ad-form--disabled');
  adFormSlider.classList.add('ad-form--disabled');
  filtersForm.classList.add('ad-form--disabled');
  formSwitcher(adFormFieldsets);
  formSwitcher(filtersFieldsets);
  formSwitcher(filtersSelects);
};

export const enableState = () => {
  if (adFormSlider.hasChildNodes()) {
    adForm.classList.remove('ad-form--disabled');
    adFormSlider.classList.remove('ad-form--disabled');
    filtersForm.classList.remove('ad-form--disabled');
    formSwitcher(adFormFieldsets);
    formSwitcher(filtersFieldsets);
    formSwitcher(filtersSelects);
  }
};
