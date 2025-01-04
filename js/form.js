import {isEscapeKey} from './util.js';
import {resetScale} from './scale.js';
import {resetEffects} from './effects.js';
import {setPhoto} from './fetch.js';
import {showError, showSuccess, showLoadFormError} from './message.js';
import './new-photo.js';

const MAX_HASHTAGS = 5;
const MAX_COMMENT_LENGTH = 110;
const HASHTAG_PATTERN = /^#[a-zа-яё0-9]{1,19}$/i;
const HashtagErrorMessage = {
  INVALID_HASHTAG: 'Хештег содержит недопустимые символы или неправильный формат',
  REPLAY_HASHTAG: 'Хештеги не могут повторяться',
  MAX_HASHTAGS: `Максимально разрешенное количество хештегов — ${MAX_HASHTAGS}`,
  MAX_COMMENT_LENGTH: `Максимальная длина комментария — ${MAX_COMMENT_LENGTH} символов`
};

const body = document.querySelector('body');
const form = document.querySelector('.img-upload__form');
const uploadInput = document.querySelector('.img-upload__input');
const closeButton = document.querySelector('.img-upload__cancel');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const hashtagInput = document.querySelector('.text__hashtags');
const descriptionInput = document.querySelector('.text__description');
const submitFormButton = document.querySelector('.img-upload__submit');

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
});

const parseHashtags = (input) => input.toLowerCase().trim().split(' ').filter((tag) => tag.length > 0);
const isHashtagsValid = (input) => parseHashtags(input).every((tag) => HASHTAG_PATTERN.test(tag));
const isHashtagsUnique = (input) => parseHashtags(input).length === new Set(parseHashtags(input)).size;
const isHashtagsLimited = (input) => parseHashtags(input).length <= MAX_HASHTAGS;

pristine.addValidator(hashtagInput, isHashtagsValid, HashtagErrorMessage.INVALID_HASHTAG);
pristine.addValidator(hashtagInput, isHashtagsUnique, HashtagErrorMessage.REPLAY_HASHTAG);
pristine.addValidator(hashtagInput, isHashtagsLimited, HashtagErrorMessage.MAX_HASHTAGS);
pristine.addValidator(descriptionInput, (value) => value.length <= MAX_COMMENT_LENGTH, HashtagErrorMessage.MAX_COMMENT_LENGTH);

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

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt) && !(document.activeElement === hashtagInput || document.activeElement === descriptionInput)) {
    evt.preventDefault();
    closeUploadForm();
  }
}

hashtagInput.addEventListener('change', onValidatePristine);
descriptionInput.addEventListener('change', onValidatePristine);
uploadInput.addEventListener('change', onOpenUploadForm);
submitFormButton.addEventListener('click', onSubmit);
closeButton.addEventListener('click', onCloseUploadForm);
