import {isEscapeKey} from './util.js';

const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');

function createElement(template) {
  const element = template.cloneNode(true);
  element.classList.add('hidden');
  document.body.append(element);

  return element;
}

function openModal(modal) {
  modal.classList.remove('hidden');
  document.addEventListener('click', onModalClick);
  document.addEventListener('keydown', onModalEscKeydown);

  function closeModal() {
    modal.classList.add('hidden');
    document.removeEventListener('click', onModalClick);
    document.removeEventListener('keydown', onModalEscKeydown);
  }

  function onModalClick(e) {
    e.preventDefault();
    closeModal();
  }

  function onModalEscKeydown(e) {
    if (isEscapeKey(e)) {
      e.preventDefault();
      closeModal();
    }
  }
}

function openModalSuccess() {
  openModal(createElement(successTemplate));
}

function openModalError() {
  openModal(createElement(errorTemplate));
}

export {openModalSuccess, openModalError};
