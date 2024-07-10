const sliderElement = document.querySelector('.ad-form__slider');
const priceElement = document.querySelector('#price');

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100000,
  },
  start: 1000,
  step: 1,
  connect: 'lower',
});

function onSliderUpdate() {
  priceElement.value = Math.floor(sliderElement.noUiSlider.get());
}

function onSliderInput() {
  sliderElement.noUiSlider.set(priceElement.value);
}

sliderElement.noUiSlider.on('update', onSliderUpdate);
priceElement.addEventListener('input', onSliderInput);
