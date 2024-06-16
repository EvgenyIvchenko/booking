import { showFail, showSuccess} from './util.js';
import { formReset } from './util.js';

const adForm = document.querySelector('.ad-form');
const title = adForm.querySelector('#title');
const price = adForm.querySelector('#price');
const rooms = adForm.querySelector('#room_number');
const capacity = adForm.querySelector('#capacity');
const type = adForm.querySelector('#type');
const timein = adForm.querySelector('#timein');
const timeout = adForm.querySelector('#timeout');
const resetButton = adForm.querySelector('.ad-form__reset');

const titleCount = {
  min: 30,
  max: 100,
};

const PRICE_MAX = 100000;

const roomsCapacity = {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
  '100': ['0'],
};

const houseType = {
  'bungalow' : '0',
  'flat' : '1000',
  'hotel' : '3000',
  'house' : '5000',
  'palace': '10000',
};

const ErrorMessage = {
  REQUIRED: 'Обязательное поле',
  TITLE_MIN: `Минимум ${titleCount.min} символов`,
  TITLE_MAX: `Максимум ${titleCount.max} символов`,
  PRICE: `От ${houseType['flat']} до ${PRICE_MAX}`,
  CAPACITY: 'Недопустимое количество гостей',
  NO_GUESTS: 'Помещение не для гостей',
};

export const validateForm = () => {
  const pristine = new Pristine(adForm, {
    classTo: 'ad-form__element',
    errorClass: 'ad-form__element--invalid',
    successClass: 'ad-form__element--valid',
    errorTextParent: 'ad-form__element',
    errorTextTag: 'span',
    errorTextClass: 'ad-form__error',
  });

  const createTitleError = (value) => {
    if (value.length === 0) {
      return ErrorMessage.REQUIRED;
    } else if (value.length < titleCount.min) {
      return ErrorMessage.TITLE_MIN;
    } else {
      return ErrorMessage.TITLE_MAX;
    }
  };

  const validateTitle = (value) => value.length >= titleCount.min && value.length <= titleCount.max;
  pristine.addValidator(title, validateTitle, createTitleError);

  const createPriceError = (value) => {
    if (value === '') {
      return ErrorMessage.REQUIRED;
    } else {
      return ErrorMessage.PRICE;
    }
  };

  const validatePrice = (value) => +value >= +price.placeholder && +value <= PRICE_MAX;
  pristine.addValidator(price, validatePrice, createPriceError);

  const validateCapacity = () => roomsCapacity[rooms.value].includes(capacity.value);
  const isNoGuests = () => rooms.value === '100' && capacity.value !== '0';
  const getRoomsErrorMessage = () => isNoGuests() ? ErrorMessage.NO_GUESTS : ErrorMessage.CAPACITY;
  pristine.addValidator(capacity, validateCapacity, getRoomsErrorMessage);

  type.addEventListener('change', () => {
    price.placeholder = houseType[type.value];
    ErrorMessage.PRICE = `От ${houseType[type.value]} до ${PRICE_MAX}`;
  });

  timein.addEventListener('change', () => {timeout
    .querySelector(`option[value="${timein.value}"]`)
    .selected = true;
  });

  timeout.addEventListener('change', () => {timein
    .querySelector(`option[value="${timeout.value}"]`)
    .selected = true;
  });

  resetButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    formReset();
  });

  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      const formData = new FormData(evt.target);

      fetch('https://25.javascript.htmlacademy.pro/keksobooking1',
        {
          method: 'POST',
          body: formData,
        },
      )
        .then((response) => {
          if (response.ok) {
            showSuccess();
          } else {
            showFail();
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  });
};
