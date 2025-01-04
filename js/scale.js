const SCALE_INCREMENT = 25;
const MIN_SCALE_LIMIT = 25;
const MAX_SCALE_LIMIT = 100;
const DEFAULT_SCALE = MAX_SCALE_LIMIT;

let scalePercentage = DEFAULT_SCALE;
const previewImage = document.querySelector('.img-upload__preview img');
const scaleValueDisplay = document.querySelector('.scale__control--value');
const decreaseButton = document.querySelector('.scale__control--smaller');
const increaseButton = document.querySelector('.scale__control--bigger');

const updateScale = () => {
  scaleValueDisplay.value = `${scalePercentage}%`;
  previewImage.style.transform = `scale(${scalePercentage / 100})`;
};

decreaseButton.addEventListener('click', () => {
  if (scalePercentage > MIN_SCALE_LIMIT) {
    scalePercentage -= SCALE_INCREMENT;
    updateScale();
  }
});

increaseButton.addEventListener('click', () => {
  if (scalePercentage < MAX_SCALE_LIMIT) {
    scalePercentage += SCALE_INCREMENT;
    updateScale();
  }
});

const resetScale = () => {
  scalePercentage = DEFAULT_SCALE;
  updateScale();
};

export {resetScale};
