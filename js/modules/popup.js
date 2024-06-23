import { isEscapeKey } from './util.js';

const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');

const successElement = successTemplate.cloneNode(true);
successElement.classList.add('hidden');
document.body.append(successElement);

const openPopupSuccess = () => {
  successElement.classList.remove('hidden');
  document.addEventListener('click', onPopupSuccessClick);
  document.addEventListener('keydown', onPopupSuccessEscKeydown);
};

const closePopupSuccess = () => {
  successElement.classList.add('hidden');
  document.removeEventListener('click', onPopupSuccessClick);
  document.removeEventListener('keydown', onPopupSuccessEscKeydown);
};

function onPopupSuccessClick(e) {
  e.preventDefault();
  closePopupSuccess();
}

function onPopupSuccessEscKeydown(e) {
  if (isEscapeKey(e)) {
    e.preventDefault();
    closePopupSuccess();
  }
}

const errorElement = errorTemplate.cloneNode(true);
errorElement.classList.add('hidden');
document.body.append(errorElement);

const openPopupError = () => {
  errorElement.classList.remove('hidden');
  document.addEventListener('click', onPopupErrorClick);
  document.addEventListener('keydown', onPopupErrorEscKeydown);
};

const closePopupError = () => {
  errorElement.classList.add('hidden');
  document.removeEventListener('click', onPopupErrorClick);
  document.removeEventListener('keydown', onPopupErrorEscKeydown);
};

function onPopupErrorClick(e) {
  e.preventDefault();
  closePopupError();
}

function onPopupErrorEscKeydown(e) {
  if (isEscapeKey(e)) {
    e.preventDefault();
    closePopupError();
  }
}

export const popup = {
  openPopupSuccess() {
    openPopupSuccess();
  },
  openPopupError() {
    openPopupError();
  },
};
