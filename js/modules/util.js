import { startCoordinates } from './map.js';

const successAlertTemplate = document.querySelector('#success').content.querySelector('.success');
const failAlertTemplate = document.querySelector('#error').content.querySelector('.error');

export const getRandomInteger = (min, max) => {
  if (min < 0) {
    throw new Error('Минимальное число не может быть меньше 0');
  } else if (min > max) {
    throw new Error('Максимальное число не может быть меньше минимального');
  }

  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const getRandomFractional = (min, max, fix) => {
  if (min < 0) {
    throw new Error('Минимальное число не может быть меньше 0');
  } else if (min > max) {
    throw new Error('Максимальное число не может быть меньше минимального');
  } else if (fix < 0) {
    throw new Error('Значение не может быть ниже 0');
  }

  const randomNumber = Math.random() * (max - min) + min;
  return +randomNumber.toFixed(fix);
};

export const getRandomArrayElement = (array) => array[getRandomInteger(0, array.length - 1)];

export const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
};

export const createUniqueNumber = (min, max) => {
  const array = [];

  return function() {
    if (array.length >= max) {
      throw new Error('Числа закончились');
    }

    let value = getRandomInteger(min, max);

    if (!array.includes(value)) {
      array.push(value);
    } else {
      while (array.includes(value)) {
        value = getRandomInteger(min, max);

        if (!array.includes(value)) {
          array.push(value);
          break;
        }
      }
    }

    return value;
  };
};

export const formReset = () => {
  const formToReset = document.querySelector('.ad-form');
  const sliderElement = document.querySelector('.ad-form__slider');

  formToReset.reset();
  formToReset.querySelector('#price').value = '50000';
  formToReset.querySelector('#address').value = `${startCoordinates.lat.toFixed(5)}, ${startCoordinates.lng.toFixed(5)}`;
  sliderElement.noUiSlider.set('50000');
};

export const showSuccess = () => {
  const successAlertContainer = successAlertTemplate.cloneNode(true);
  document.body.append(successAlertContainer);
  formReset();

  document.addEventListener('click', () => {
    successAlertContainer.remove();
  }, { once: true });

  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      successAlertContainer.remove();
    }
  }, { once: true });
};

export const showFail = () => {
  const failAlertContainer = failAlertTemplate.cloneNode(true);
  const tryAgainButton = failAlertContainer.querySelector('.error__button');
  document.body.append(failAlertContainer);

  document.addEventListener('click', () => {
    failAlertContainer.remove();
  }, { once: true });

  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      failAlertContainer.remove();
    }
  }, { once: true });

  tryAgainButton.addEventListener('click', () => {
    failAlertContainer.remove();
  }, { once: true });
};

export const showAlert = () => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '50%';
  alertContainer.style.top = '50%';
  alertContainer.style.backgroundColor = 'white';
  alertContainer.style.padding = '15px';
  alertContainer.style.fontSize = '24px';
  alertContainer.style.textAlign = 'center';
  alertContainer.textContent = 'Упс :( что-то пошло не так';

  document.body.append(alertContainer);
};
