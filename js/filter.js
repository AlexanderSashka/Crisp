document.addEventListener('DOMContentLoaded', function () {
  //========================================================================================================================================================
  const slideValueMin = document.querySelector('.price-filter__value');
  const inputSlider = document.querySelector('.price-filter__input');

  inputSlider.oninput = (() => {
    let value = inputSlider.value;
    slideValueMin.textContent = `${value} .00 EUR`;
    slideValueMin.style.left = (value / 2) + '%';
  });
});