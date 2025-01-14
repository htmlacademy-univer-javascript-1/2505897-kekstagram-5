import {isEscapeKey} from './util.js';
import {resetScale} from './scale.js';
import {resetEffects} from './effects.js';
import {setPhoto} from './fetch.js';
import {showError, showSuccess, showLoadFormError} from './message.js';
import './new-photo.js';

const HASHTAGS_MAX_COUNT = 5;
const CHARACTERS_MAX_COUNT = 140;
const VALID_HASHTAG = /^#[a-zа-яё0-9]{1,19}$/i;
const HashtagErrorMessage = {
  INVALID_HASHTAG: 'Содержит недопустимые символы или неверный формат',
  REPLAY_HASHTAG: 'Хэш-теги не должны повторяться',
  HASHTAGS_MAX_COUNT:`Максимальное количество хеш-тегов - ${HASHTAGS_MAX_COUNT}`,
  MAX_COMMENT_LENGTH: `Максимальная длина ${CHARACTERS_MAX_COUNT} символов`
};

const body = document.querySelector('body');
const form = document.querySelector('.img-upload__form');
const uploadInput = document.querySelector('.img-upload__input');
const closeUploadFormButton = document.querySelector('.img-upload__cancel');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const hashtagInput = document.querySelector('.text__hashtags');
const descriptionInput = document.querySelector('.text__description');
const submitFormButton = document.querySelector('.img-upload__submit');


const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
});

const shareHashtags = (input) => input.toLowerCase().trim().split(' ').filter((tag) => Boolean(tag.length));
const isHashtagsValid = (input) => shareHashtags(input).every((tag) => VALID_HASHTAG.test(tag));
const isHashtagsUnique = (input) => shareHashtags(input).length === new Set(shareHashtags(input)).size;
const isHashtagsLimited = (input) => shareHashtags(input).length <= HASHTAGS_MAX_COUNT;

pristine.addValidator(hashtagInput, isHashtagsValid, HashtagErrorMessage.INVALID_HASHTAG);
pristine.addValidator(hashtagInput, isHashtagsUnique, HashtagErrorMessage.REPLAY_HASHTAG);
pristine.addValidator(hashtagInput, isHashtagsLimited, HashtagErrorMessage.HASHTAGS_MAX_COUNT);
pristine.addValidator(descriptionInput, (value) => value.length <= CHARACTERS_MAX_COUNT, HashtagErrorMessage.MAX_COMMENT_LENGTH);

const onValidatePristine = () => pristine.validate();

const openUploadForm = () => {
  imgUploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  resetScale();
  resetEffects();
  document.addEventListener('keydown', onDocumentKeydown);
};

const onOpenUploadForm = () => {
  openUploadForm();
};

const closeUploadForm = () => {
  form.reset();
  pristine.reset();
  imgUploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

const onCloseUploadForm = () => {
  closeUploadForm();
};

const onSubmit = (evt) => {
  evt.preventDefault();
  submitFormButton.disabled = true;

  if (pristine.validate()) {
    setPhoto(
      () => {
        showSuccess();
        closeUploadForm();
        submitFormButton.disabled = false;
      },
      () => {
        showError();
        submitFormButton.disabled = false;
      },
      new FormData(form)
    );
  } else {
    showLoadFormError();
    submitFormButton.disabled = false;
  }
};

function onDocumentKeydown (evt) {
  if (isEscapeKey(evt) && !(document.activeElement === hashtagInput || document.activeElement === descriptionInput)) {
    evt.preventDefault();
    closeUploadForm();
  }
}

hashtagInput.addEventListener('change', onValidatePristine);
descriptionInput.addEventListener('change', onValidatePristine);
uploadInput.addEventListener('change', onOpenUploadForm);
submitFormButton.addEventListener('click', onSubmit);
closeUploadFormButton.addEventListener('click', onCloseUploadForm);
