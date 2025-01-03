import {isEscapeKey} from './util.js';

const COMMENTS_TO_SHOW = 5;

let currentCommentCount = 0;
const bodyElement = document.querySelector('body');
const bigPhotoElement = document.querySelector('.big-picture');
const commentElement = document.querySelector('.social__comment');
const commentListElement = bigPhotoElement.querySelector('.social__comments');
const commentsLoaderElement = bigPhotoElement.querySelector('.comments-loader');
const commentCountElement = bigPhotoElement.querySelector('.social__comment-count');
const bigPhotoCloseElement = bigPhotoElement.querySelector('.big-picture__cancel');


const createComment = ({avatar, name, message}) => {
  const comment = commentElement.cloneNode(true);
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
  commentListElement.appendChild(fragment);
  currentCommentCount = lastIndex;
  commentCountElement.textContent = `${currentCommentCount} из ${comments.length} комментариев`;

  if (currentCommentCount >= comments.length) {
    commentsLoaderElement.classList.add('hidden');
  }
};

const renderPhotoData = ({url, likes, description}) => {
  bigPhotoElement.querySelector('.big-picture__img img').src = url;
  bigPhotoElement.querySelector('.big-picture__img img').alt = description;
  bigPhotoElement.querySelector('.likes-count').textContent = likes;
  bigPhotoElement.querySelector('.social__caption').textContent = description;
};

const openBigPhoto = (data) => {
  bigPhotoElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  commentsLoaderElement.classList.remove('hidden');

  currentCommentCount = 0;
  renderPhotoData(data);
  commentListElement.innerHTML = '';
  renderComments(data.comments);

  commentsLoaderElement.onclick = () => {
    renderComments(data.comments);
  };

  document.addEventListener('keydown', onDocumentKeydown);
};

const closeBigPhoto = () => {
  bigPhotoElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  commentsLoaderElement.onclick = null;
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

bigPhotoCloseElement.addEventListener('click', onCloseBigPhoto);

export {openBigPhoto};
