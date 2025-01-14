import {isEscapeKey} from './util.js';

const COMMENTS_TO_SHOW = 5;

let currentCommentCount = 0;
const body = document.querySelector('body');
const bigPhoto = document.querySelector('.big-picture');
const socialComment = document.querySelector('.social__comment');
const socialCommentList = bigPhoto.querySelector('.social__comments');
const socialCommentsLoader = bigPhoto.querySelector('.comments-loader');
const socialCommentCount = bigPhoto.querySelector('.social__comment-count');
const bigPhotoCloseButton = bigPhoto.querySelector('.big-picture__cancel');


const createComment = ({avatar, name, message}) => {
  const comment = socialComment.cloneNode(true);
  comment.querySelector('.social__picture').src = avatar;
  comment.querySelector('.social__picture').alt = name;
  comment.querySelector('.social__text').textContent = message;

  return comment;
};

const renderComments = (comments) => {
  const lastIndex = Math.min(currentCommentCount + COMMENTS_TO_SHOW, comments.length);

  const fragment = document.createDocumentFragment();
  for (let i = currentCommentCount; i < lastIndex; i++) {
    fragment.appendChild(createComment(comments[i]));
  }
  socialCommentList.appendChild(fragment);
  currentCommentCount = lastIndex;
  socialCommentCount.textContent = `${currentCommentCount} из ${comments.length} комментариев`;

  if (currentCommentCount >= comments.length) {
    socialCommentsLoader.classList.add('hidden');
  }
};

const renderPhotoData = ({url, likes, description}) => {
  bigPhoto.querySelector('.big-picture__img img').src = url;
  bigPhoto.querySelector('.big-picture__img img').alt = description;
  bigPhoto.querySelector('.likes-count').textContent = likes;
  bigPhoto.querySelector('.social__caption').textContent = description;
};

const openBigPhoto = (data) => {
  bigPhoto.classList.remove('hidden');
  body.classList.add('modal-open');
  socialCommentsLoader.classList.remove('hidden');

  currentCommentCount = 0;
  renderPhotoData(data);
  socialCommentList.innerHTML = '';
  renderComments(data.comments);

  socialCommentsLoader.onclick = () => {
    renderComments(data.comments);
  };

  document.addEventListener('keydown', onDocumentKeydown);
};

const closeBigPhoto = () => {
  bigPhoto.classList.add('hidden');
  body.classList.remove('modal-open');
  socialCommentsLoader.onclick = null;
  document.removeEventListener('keydown', onDocumentKeydown);
};

const onCloseBigPhoto = () => {
  closeBigPhoto();
};

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPhoto();
  }
}

bigPhotoCloseButton.addEventListener('click', onCloseBigPhoto);

export {openBigPhoto};
