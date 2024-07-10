import './slider.js';

const adFormElement = document.querySelector('.ad-form');
const resetElement = document.querySelector('.ad-form__reset');

function initForm(validate, sendData, path, modalSuccess, modalError) {
  function onAdFormSubmit(e) {
    e.preventDefault();

    const isValid = validate();
    if (isValid) {
      sendData(
        path,
        new FormData(e.target),
        () => {
          resetElement.click();
          modalSuccess();
        },
        modalError,
      );
    }
  }

  adFormElement.addEventListener('submit', onAdFormSubmit);
}

export {initForm};
