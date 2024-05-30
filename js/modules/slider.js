const sliderElement = document.querySelector('.ad-form__slider');
const valueElement = document.querySelector('#price');


export const slider = () => {
  noUiSlider.create(sliderElement, {
    range: {
      min: 0,
      max: 100000,
    },
    start: 50000,
    step: 1,
    connect: 'lower',
  });

  sliderElement.noUiSlider.on('update', () => {
    valueElement.value = Math.floor(sliderElement.noUiSlider.get());
  });
};

