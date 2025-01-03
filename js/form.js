import {isEscapeKey} from './util.js';
import {resetScale} from './scale.js';
import {resetFilters} from './filters.js';
import {showError, showSuccess} from './messages.js';
import {setPhoto} from './fetch.js';


const VALID_HASHTAG = /^#[a-zа-я0-9]{1,19}|^$/i;
const HASHTAGS_MAX_COUNT = 5;
const HASHTAG_ERROR_MESSAGE = {
  invalidHashtag: 'Содержит недопустимые символы или неверный формат',
  hashtagsMaxCount:`Максимальное количество хеш-тегов - ${HASHTAGS_MAX_COUNT}`,
  replayHashtag: 'Хэш-теги не должны повторяться',
};
const CHARACTERS_MAX_COUNT = 175;

const body = document.querySelector('body');
const formUpload = document.querySelector('.img-upload__form');
const uploadInput = document.querySelector('.img-upload__input');
const closeUploadFormButton = document.querySelector('.img-upload__cancel');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const hashtagInput = document.querySelector('.text__hashtags');
const descriptionInput = document.querySelector('.text__description');
const submitFormButton = document.querySelector('.img-upload__submit');


const pristine = new Pristine(formUpload, {
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

function onSubmite(evt) {
  evt.preventDefault();
  submitFormButton.disabled = true;

  if (pristine.validate()) {
    setPhoto(
      () => {
        showSuccess();
        openUploadForm();
        submitFormButton.disabled = false;
      },
      () => {
        showError();
        submitFormButton.disabled = false;
      },
      new FormData(formUpload)
    );
  }
}
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
  formUpload.reset();
  pristine.reset();
  imgUploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
}

function onCloseUploadForm() {
  closeUploadForm();
}

uploadInput.addEventListener('change', onOpenUploadForm);
submitFormButton.addEventListener('click', onSubmite);
closeUploadFormButton.addEventListener('click', onCloseUploadForm);
