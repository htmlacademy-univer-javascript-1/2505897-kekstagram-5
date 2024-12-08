import {isEscapeKey} from './util.js';
import {resetScale} from './scale.js';
import {resetFilters} from './filters.js';

const HASHTAGS_MAX_COUNT = 5;
const VALID_HASHTAG = /^#[a-zа-я0-9]{1,19}|^$/i;
const HASHTAG_ERROR_MESSAGE = {
  invalidHashtag: 'Содержит недопустимые символы или неверный формат',
  replayHashtag: 'Хэш-теги не должны повторяться',
  hashtagsMaxCount:`Максимальное количество хеш-тегов - ${HASHTAGS_MAX_COUNT}`
};
const CHARACTERS_MAX_COUNT = 140;

const body = document.querySelector('body');
const form = document.querySelector('.img-upload__form');
const uploadInput = document.querySelector('.img-upload__input');
const closeUploadFormButton = document.querySelector('.img-upload__cancel');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const hashtagInput = document.querySelector('.text__hashtags');
const descriptionInput = document.querySelector('.text__description');


const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
});

const shareHashtags = (input) => input.toLowerCase().trim().split(' ');
const isHashtagsValid = (input) => shareHashtags(input).every((tag) => VALID_HASHTAG.test(tag));
const isHashtagsUnique = (input) => shareHashtags(input).length === new Set(shareHashtags(input)).size;
const isHashtagsLimited = (input) => shareHashtags(input).length <= HASHTAGS_MAX_COUNT;

pristine.addValidator(hashtagInput, isHashtagsValid, HASHTAG_ERROR_MESSAGE.invalidHashtag);
pristine.addValidator(hashtagInput, isHashtagsUnique, HASHTAG_ERROR_MESSAGE.replayHashtag);
pristine.addValidator(hashtagInput, isHashtagsLimited, HASHTAG_ERROR_MESSAGE.hashtagsMaxCount);
pristine.addValidator(descriptionInput, (value) => value.length <= CHARACTERS_MAX_COUNT, `Максимальная длина ${CHARACTERS_MAX_COUNT} символов`);

hashtagInput.addEventListener('change', () => {
  pristine.validate();
});

descriptionInput.addEventListener('change', () => {
  pristine.validate();
});

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt) && !(document.activeElement === hashtagInput || document.activeElement === descriptionInput)) {
    evt.preventDefault();
    closeUploadForm();
  }
};

function openUploadForm() {
  imgUploadOverlay.classList.remove('hidden');
  body.classList.remove('modal-open');
  resetScale();
  resetFilters();
  document.addEventListener('keydown', onDocumentKeydown);
}

function onOpenUploadForm() {
  openUploadForm();
}

function closeUploadForm() {
  form.reset();
  pristine.reset();
  imgUploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
}

function onCloseUploadForm() {
  closeUploadForm();
}

uploadInput.addEventListener('change', onOpenUploadForm);
closeUploadFormButton.addEventListener('click', onCloseUploadForm);
