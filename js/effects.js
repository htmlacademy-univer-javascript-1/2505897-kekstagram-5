const Effects = {
  none: {style: 'none', min: 0, max: 100, step: 1, unit: '' },
  sepia: {style: 'sepia', min: 0, max: 1, step: 0.1, unit: '' },
  chrome: {style: 'grayscale', min: 0, max: 1, step: 0.1, unit: '' },
  marvin: {style: 'invert', min: 0, max: 100, step: 1, unit: '%' },
  phobos: {style: 'blur', min: 0, max: 3, step: 0.1, unit: 'px' },
  heat: {style: 'brightness', min: 1, max: 3, step: 0.1, unit: '' },
};
const DEFAULT_EFFECT = Effects.none;

let currentEffect = DEFAULT_EFFECT;
const uploadImg = document.querySelector('.img-upload__preview img');
const effectsList = document.querySelector('.img-upload__effects');
const slider = document.querySelector('.effect-level__slider');
const effectLevel = document.querySelector('.img-upload__effect-level');
const effectLevelValue = document.querySelector('.effect-level__value');


noUiSlider.create(slider, {
  range: { min: 0, max: 1 },
  start: 0,
  step: 1,
  connect: 'lower',
  format: {
    to: (value) => (Number.isInteger(value) ? value : value.toFixed(1)),
    from: (value) => parseFloat(value),
  },
});

const isDefaultEffect = () => currentEffect === DEFAULT_EFFECT;

const updateSliderOptions = () => {
  slider.noUiSlider.updateOptions({
    range: {min: currentEffect.min, max: currentEffect.max},
    start: currentEffect.max,
    step: currentEffect.step,
  });

  effectLevel.classList.toggle('hidden', isDefaultEffect());
};

slider.noUiSlider.on('update', () => {
  const sliderValue = slider.noUiSlider.get();
  uploadImg.style.filter = isDefaultEffect()
    ? DEFAULT_EFFECT.style
    : `${currentEffect.style}(${sliderValue}${currentEffect.unit})`;
  effectLevelValue.value = sliderValue;
});

const handleEffectsChange = (evt) => {
  if (!evt.target.classList.contains('effects__radio')) {
    return;
  }
  currentEffect = Effects[evt.target.value];
  uploadImg.className = `effects__preview--${evt.target.value}`;
  updateSliderOptions();
};

const resetEffects = () => {
  currentEffect = DEFAULT_EFFECT;
  updateSliderOptions();
};

effectsList.addEventListener('change', handleEffectsChange);

export {resetEffects};
