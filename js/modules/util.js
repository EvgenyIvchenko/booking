const TIMEOUT_DELAY = 500;

export const isEscapeKey = (evt) => evt.key === 'Escape';

export const createLoaderError = (message) => {
  const error = document.createElement('div');
  error.style.position = 'relative';
  error.style.zIndex = 100;
  error.style.padding = '12px';
  error.style.fontSize = '16px';
  error.style.textAlign = 'center';
  error.style.color = 'white';
  error.style.backgroundColor = 'red';
  error.textContent = message;

  document.body.insertAdjacentElement('beforebegin', error);
};

export const debounce = (callback) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), TIMEOUT_DELAY);
  };
};
