const EffectTypes = {
  none: {style: 'none', min: 0, max: 100, step: 1, unit: ''},
  sepia: {style: 'sepia', min: 0, max: 1, step: 0.1, unit: ''},
  chrome: {style: 'grayscale', min: 0, max: 1, step: 0.1, unit: ''},
  marvin: {style: 'invert', min: 0, max: 100, step: 1, unit: '%'},
  phobos: {style: 'blur', min: 0, max: 3, step: 0.1, unit: 'px'},
  heat: {style: 'brightness', min: 1, max: 3, step: 0.1, unit: ''},
};

const INITIAL_EFFECT = EffectTypes.none;

let activeEffect = INITIAL_EFFECT;

const imagePreview = document.querySelector('.img-upload__preview img');
const effectButtons = document.querySelector('.img-upload__effects');
const rangeSlider = document.querySelector('.effect-level__slider');
const effectLevelContainer = document.querySelector('.img-upload__effect-level');
const effectLevelInput = document.querySelector('.effect-level__value');

noUiSlider.create(rangeSlider, {
  range: {min: 0, max: 1},
  start: 0,
  step: 1,
  connect: 'lower',
  format: {
    to: (value) => (Number.isInteger(value) ? value : value.toFixed(1)),
    from: (value) => parseFloat(value),
  },
});

const isEffectDefault = () => activeEffect === INITIAL_EFFECT;

const refreshSliderSettings = () => {
  rangeSlider.noUiSlider.updateOptions({
    range: {min: activeEffect.min, max: activeEffect.max},
    start: activeEffect.max,
    step: activeEffect.step,
  });

  effectLevelContainer.classList.toggle('hidden', isEffectDefault());
};

rangeSlider.noUiSlider.on('update', () => {
  const currentValue = rangeSlider.noUiSlider.get();
  imagePreview.style.filter = isEffectDefault()
    ? INITIAL_EFFECT.style
    : `${activeEffect.style}(${currentValue}${activeEffect.unit})`;
  effectLevelInput.value = currentValue;
});

const onEffectChange = (evt) => {
  if (!evt.target.classList.contains('effects__radio')) {
    return;
  }
  activeEffect = EffectTypes[evt.target.value];
  imagePreview.className = `effects__preview--${evt.target.value}`;
  refreshSliderSettings();
};

const resetEffects = () => {
  activeEffect = INITIAL_EFFECT;
  refreshSliderSettings();
};

effectButtons.addEventListener('change', onEffectChange);

export {resetEffects};
