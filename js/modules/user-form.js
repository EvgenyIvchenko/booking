const adForm = document.querySelector('.ad-form');
const rooms = adForm.querySelector('#room_number');
const capacity = adForm.querySelector('#capacity');

const maxPrice = 100000;

const roomsCapacity = {
  '1': '1',
  '2': ['2', '1'],
  '3': ['3', '2', '1'],
  '100': '0',
};

const pristine = new Pristine (adForm, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  successClass: 'ad-form__element--valid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
  errorTextClass: 'ad-form__error',
}, false);

const validateTitle = (value) => value.length >= 30 && value.length <= 100;

pristine.addValidator(adForm.querySelector('#title'), validateTitle, 'От 30 до 100 символов');

const validatePrice = (value) => value.length && parseInt(value, 10) <= maxPrice;

pristine.addValidator(adForm.querySelector('#price'), validatePrice, 'От 0 до 100000');

const capacityChecker = () => rooms.value === '100' && capacity.value !== '0';

const getRoomsErrorMessage = () => capacityChecker() ? 'Помещение не для гостей' : 'Допустимое количество гостей превышено';

const validateRooms = () => roomsCapacity[rooms.value].includes(capacity.value);

pristine.addValidator(rooms, validateRooms);
pristine.addValidator(capacity, validateRooms, getRoomsErrorMessage);

adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});
