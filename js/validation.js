const adFormElement = document.querySelector('.ad-form');
const titleElement = adFormElement.querySelector('#title');
const priceElement = adFormElement.querySelector('#price');
const capacityElement = adFormElement.querySelector('#capacity');
const roomsElement = adFormElement.querySelector('#room_number');
const typeElement = adFormElement.querySelector('#type');
const sliderElement = adFormElement.querySelector('.ad-form__slider');
const timeinElement = adFormElement.querySelector('#timein');
const timeoutElement = adFormElement.querySelector('#timeout');
const resetElement = adFormElement.querySelector('.ad-form__reset');

const title = {
  min: 30,
  max: 100,
};

const houseType = {
  'bungalow' : 0,
  'flat' : 1000,
  'hotel' : 3000,
  'house' : 5000,
  'palace': 10000,
};

const PRICE_MAX = 100000;

const capacity = {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
  '100': ['0'],
  error: (value) => value === '100' ? 'Не для гостей' : `Допустимое количество гостей: ${value}`,
};

const ErrorMessage = {
  REQUIRED: 'Обязательное поле',
  TITLE_MIN: `Минимум ${title.min} символов`,
  TITLE_MAX: `Максимум ${title.max} символов`,
  PRICE: `От ${houseType['flat']} до ${PRICE_MAX}`,
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

function validateTitle(value) {
  return value.length >= title.min && value.length <= title.max;
}

function validatePrice(value) {
  return +value >= +priceElement.placeholder && +value <= PRICE_MAX;
}

function validateCapacity() {
  return capacity[roomsElement.value].includes(capacityElement.value);
}

function showErrorTitle(value) {
  if (value.length === 0) {
    return ErrorMessage.REQUIRED;
  } else if (value.length < title.min) {
    return ErrorMessage.TITLE_MIN;
  } else {
    return ErrorMessage.TITLE_MAX;
  }
}

function showErrorPrice(value) {
  if (value === '') {
    return ErrorMessage.REQUIRED;
  } else {
    return ErrorMessage.PRICE;
  }
}

function showErrorCapacity() {
  const capacityValue = capacityElement.value;
  const roomsValue = roomsElement.value;

  if (!capacity[roomsValue].includes(capacityValue)) {
    return capacity.error(roomsValue);
  }
}

pristine.addValidator(titleElement, validateTitle, showErrorTitle);
pristine.addValidator(priceElement, validatePrice, showErrorPrice);
pristine.addValidator(capacityElement, validateCapacity, showErrorCapacity);

function onTypeChange(e) {
  e.preventDefault();
  priceElement.placeholder = houseType[typeElement.value];
  ErrorMessage.PRICE = `От ${houseType[typeElement.value]} до ${PRICE_MAX}`;
  sliderElement.noUiSlider.set(houseType[typeElement.value]);
}

function onTimeInChange(e) {
  e.preventDefault();
  timeoutElement.querySelector(`option[value="${timeinElement.value}"]`).selected = true;
}

function onTimeOutChange(e) {
  e.preventDefault();
  timeinElement.querySelector(`option[value="${timeoutElement.value}"]`).selected = true;
}

function onResetClick() {
  adFormElement.reset();
  sliderElement.noUiSlider.set(houseType[typeElement.value]);
  pristine.reset();
}

typeElement.addEventListener('change', onTypeChange);
timeinElement.addEventListener('change', onTimeInChange);
timeoutElement.addEventListener('change', onTimeOutChange);
resetElement.addEventListener('click', onResetClick);

function validateForm() {
  return pristine.validate();
}

export {validateForm};
