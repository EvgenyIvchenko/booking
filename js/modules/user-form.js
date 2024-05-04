const adForm = document.querySelector('.ad-form');
const title = adForm.querySelector('#title');
const price = adForm.querySelector('#price');
const rooms = adForm.querySelector('#room_number');
const capacity = adForm.querySelector('#capacity');
const houseType = adForm.querySelector('#type');

const PRICE_MAX = 100000;

const titleCount = {
  min: 30,
  max: 100,
};

const ErrorMessage = {
  TITLE: 'От 30 до 100 символов',
  PRICE: 'От 0 до 100000',
  CAPACITY: 'Недопустимое количество гостей',
  NO_GUESTS: 'Помещение не для гостей',
};

const roomsCapacity = {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
  '100': ['0'],
};

const HouseTypePrices = {
  'bungalow' : '0',
  'flat' : '1000',
  'hotel' : '3000',
  'house' : '5000',
  'palace': '10000',
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

  const validateTitle = (value) => value.length >= titleCount.min && value.length <= titleCount.max;
  pristine.addValidator(title, validateTitle, ErrorMessage.TITLE);

  const validatePrice = (value) => value.length && parseInt(value, 10) <= PRICE_MAX;
  pristine.addValidator(price, validatePrice, ErrorMessage.PRICE);

  const validateCapacity = () => roomsCapacity[rooms.value].includes(capacity.value);
  const isNoGuests = () => rooms.value === '100' && capacity.value !== '0';
  const getRoomsErrorMessage = () => isNoGuests() ? ErrorMessage.NO_GUESTS : ErrorMessage.CAPACITY;
  pristine.addValidator(capacity, validateCapacity, getRoomsErrorMessage);

  // нужно менять минимальное значение цены и плейсхолдер с ценой в разметке
  // нужно валидировать значение в поле с ценой, но не менять его

  // houseType.addEventListener('change', (e) => {
  //   houseType.placeholder = HouseTypePrices[e.target.value];
  //   houseType.min = HouseTypePrices[e.target.value];
  // });

  houseType.addEventListener('change', (e) => {
    houseType.placeholder = HouseTypePrices[e.target.value];
    // houseType.min = HouseTypePrices[e.target.value];
  });

  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    pristine.validate();
  });
};
