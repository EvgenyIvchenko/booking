const filtersForm = document.querySelector('.map__filters');
const filterElements = filtersForm.querySelectorAll('.map__filter');
const filterCheckboxes = filtersForm.querySelectorAll('.map__checkbox');

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

export const resetFilters = () => {
  for (let i = 0; i < filterElements.length; i++) {
    filterElements[i].selectedIndex = filterElements[i].querySelector('[selected]').index;
  }

  for (let i = 0; i < filterCheckboxes.length; i++) {
    filterCheckboxes[i].checked = false;
  }
};
