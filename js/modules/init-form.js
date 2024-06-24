import { data } from './data.js';
import { createSendler } from './create-sendler.js';
import { popup } from './popup.js';
import { resetFilters } from './util.js';

const adFormElement = document.querySelector('.ad-form');
const titleElement = adFormElement.querySelector('#title');
const typeElement = adFormElement.querySelector('#type');
const priceElement = adFormElement.querySelector('#price');
const sliderElement = adFormElement.querySelector('.ad-form__slider');
const roomsElement = adFormElement.querySelector('#room_number');
const capacityElement = adFormElement.querySelector('#capacity');
const timeInElement = adFormElement.querySelector('#timein');
const timeOutElement = adFormElement.querySelector('#timeout');
const resetElement = adFormElement.querySelector('.ad-form__reset');
const submitElement = adFormElement.querySelector('.ad-form__submit');

const ErrorMessage = {
  REQUIRED: 'Обязательное поле',
  TITLE_MIN: `Минимум ${data.form.titleCount.min} символов`,
  TITLE_MAX: `Максимум ${data.form.titleCount.max} символов`,
  PRICE: `От ${data.form.houseType['flat']} до ${data.form.PRICE_MAX}`,
  CAPACITY: 'Недопустимое количество гостей',
  NO_GUESTS: 'Помещение не для гостей',
};

const pristine = new Pristine(adFormElement, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  successClass: 'ad-form__element--valid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
  errorTextClass: 'ad-form__error',
});

const validateTitle = (value) =>
  value.length >= data.form.titleCount.min &&
  value.length <= data.form.titleCount.max;

const createTitleError = (value) => {
  if (value.length === 0) {
    return ErrorMessage.REQUIRED;
  } else if (value.length < data.form.titleCount.min) {
    return ErrorMessage.TITLE_MIN;
  } else {
    return ErrorMessage.TITLE_MAX;
  }
};

const validatePrice = (value) => +value >= +priceElement.placeholder && +value <= data.form.PRICE_MAX;

const createPriceError = (value) => {
  if (value === '') {
    return ErrorMessage.REQUIRED;
  } else {
    return ErrorMessage.PRICE;
  }
};

const validateCapacity = () => data.form.roomsCapacity[roomsElement.value].includes(capacityElement.value);
const isNoGuests = () => roomsElement.value === '100' && capacityElement.value !== '0';

const getRoomsError = () => isNoGuests() ? ErrorMessage.NO_GUESTS : ErrorMessage.CAPACITY;

const onTypeChange = (e) => {
  e.preventDefault();
  priceElement.placeholder = data.form.houseType[typeElement.value];
  ErrorMessage.PRICE = `От ${data.form.houseType[typeElement.value]} до ${data.form.PRICE_MAX}`;
  sliderElement.noUiSlider.set(data.form.houseType[typeElement.value]);
};

const onTimeInChange = (e) => {
  e.preventDefault();
  timeOutElement.querySelector(`option[value="${timeInElement.value}"]`).selected = true;
};

const onTimeOutChange = (e) => {
  e.preventDefault();
  timeInElement.querySelector(`option[value="${timeOutElement.value}"]`).selected = true;
};

const onResetClick = (e) => {
  e.preventDefault();
  adFormElement.reset();
  resetFilters();
  priceElement.placeholder = data.form.houseType[typeElement.value];
  ErrorMessage.PRICE = `От ${data.form.houseType[typeElement.value]} до ${data.form.PRICE_MAX}`;
  sliderElement.noUiSlider.set(1000);
};

const disableSubmit = () => {
  submitElement.disabled = true;
  submitElement.textContent = 'Публикую...';
};

const enableSubmit = () => {
  submitElement.disabled = false;
  submitElement.textContent = 'Опубликовать';
};

const onAdFormSubmit = (e) => {
  e.preventDefault();
  const isValid = pristine.validate();

  if (isValid) {
    disableSubmit();

    const sendForm = createSendler(
      data.RequestPath.AD_FORM,
      new FormData(adFormElement),
      () => {
        resetElement.click();
        popup.openPopupSuccess();
        enableSubmit();
      },
      () => {
        popup.openPopupError();
        enableSubmit();
      },
    );

    sendForm();
  }
};

export const initForm = () => {
  pristine.addValidator(titleElement, validateTitle, createTitleError);
  pristine.addValidator(priceElement, validatePrice, createPriceError);
  pristine.addValidator(capacityElement, validateCapacity, getRoomsError);

  typeElement.addEventListener('change', onTypeChange);
  timeInElement.addEventListener('change', onTimeInChange);
  timeOutElement.addEventListener('change', onTimeOutChange);
  resetElement.addEventListener('click', onResetClick);

  adFormElement.addEventListener('submit', onAdFormSubmit);
};
