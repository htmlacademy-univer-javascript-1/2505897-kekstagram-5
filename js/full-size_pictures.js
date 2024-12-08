import {isEscapeKey} from './util.js';

const COMMENTS_TO_SHOW = 5;

const body = document.querySelector('body');
const bigPictureElement = document.querySelector('.big-picture');
const commentElement = document.querySelector('.social__comment');
const commentListElement = bigPictureElement.querySelector('.social__comments');
const commentsLoaderElement = bigPictureElement.querySelector('.comments-loader');
const commentCountElement = bigPictureElement.querySelector('.social__comment-count');
const bigPictureCloseElement = bigPictureElement.querySelector('.big-picture__cancel');
let currentCommentCount = 0;


const createComment = ({avatar, name, message}) => {
  const comment = commentElement.cloneNode(true);
  comment.querySelector('.social__picture').src = avatar;
  comment.querySelector('.social__picture').alt = name;
  comment.querySelector('.social__text').textContent = message;

  return comment;
};

const renderingComments = (comments) => {
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

const renderingPictureData = ({url, likes, description}) => {
  bigPictureElement.querySelector('.big-picture__img img').src = url;
  bigPictureElement.querySelector('.big-picture__img img').alt = description;
  bigPictureElement.querySelector('.likes-count').textContent = likes;
  bigPictureElement.querySelector('.social__caption').textContent = description;
};

const openBigPicture = (data) => {
  bigPictureElement.classList.remove('hidden');
  body.classList.add('modal-open');
  commentsLoaderElement.classList.remove('hidden');

  currentCommentCount = 0;
  renderingPictureData(data);
  commentListElement.innerHTML = '';
  renderingComments(data.comments);

  commentsLoaderElement.onclick = () => {
    renderingComments(data.comments);
  };

  document.addEventListener('keydown', onDocumentKeydown);
};

const closeBigPicture = () => {
  bigPictureElement.classList.add('hidden');
  body.classList.remove('modal-open');
  commentsLoaderElement.onclick = null;
  document.removeEventListener('keydown', onDocumentKeydown);
};

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
}

const onCloseBigPicture = () => {
  closeBigPicture();
};

bigPictureCloseElement.addEventListener('click', onCloseBigPicture);


export {openBigPicture};
