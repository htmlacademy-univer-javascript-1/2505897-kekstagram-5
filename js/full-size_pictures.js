import {isEscapeKey} from './util.js';

const COMMENTS_TO_SHOW = 5;

let currentCommentCount = 0;
const body = document.querySelector('body');
const bigPhoto = document.querySelector('.big-picture');
const socialCommentList = bigPhoto.querySelector('.social__comments');
const socialComment = document.querySelector('.social__comment');
const socialCommentsLoader = bigPhoto.querySelector('.comments-loader');
const socialCommentCount = bigPhoto.querySelector('.social__comment-count');
const bigPhotoCloseButton = bigPhoto.querySelector('.big-picture__cancel');

const createComment = (commentData) => {
  const comment = socialComment.cloneNode(true);
  const {avatar, name, message} = commentData;

  comment.querySelector('.social__picture').src = avatar;
  comment.querySelector('.social__picture').alt = name;
  comment.querySelector('.social__text').textContent = message;

  return comment;
};

const renderComments = (comments) => {
  const totalComments = comments.length;
  const lastIndex = Math.min(currentCommentCount + COMMENTS_TO_SHOW, totalComments);
  const fragment = document.createDocumentFragment();

  for (let i = currentCommentCount; i < lastIndex; i++) {
    const commentElement = createComment(comments[i]);
    fragment.appendChild(commentElement);
  }

  socialCommentList.appendChild(fragment);
  currentCommentCount = lastIndex;
  socialCommentCount.textContent = `${currentCommentCount} из ${totalComments} комментариев`;

  if (currentCommentCount >= totalComments) {
    socialCommentsLoader.classList.add('hidden');
  }
};

const renderPhotoData = (photoData) => {
  const {url, likes, description} = photoData;

  bigPhoto.querySelector('.big-picture__img img').src = url;
  bigPhoto.querySelector('.big-picture__img img').alt = description;
  bigPhoto.querySelector('.likes-count').textContent = likes;
  bigPhoto.querySelector('.social__caption').textContent = description;
};

const openBigPhoto = (photoData) => {
  bigPhoto.classList.remove('hidden');
  body.classList.add('modal-open');
  socialCommentsLoader.classList.remove('hidden');

  currentCommentCount = 0;
  socialCommentList.innerHTML = '';
  renderPhotoData(photoData);
  renderComments(photoData.comments);

  socialCommentsLoader.onclick = () => renderComments(photoData.comments);

  document.addEventListener('keydown', onDocumentKeydown);
};

const closeBigPhoto = () => {
  bigPhoto.classList.add('hidden');
  body.classList.remove('modal-open');
  socialCommentsLoader.onclick = null;
  document.removeEventListener('keydown', onDocumentKeydown);
};

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPhoto();
  }
}

const onCloseBigPhoto = () => {
  closeBigPhoto();
};

bigPhotoCloseButton.addEventListener('click', onCloseBigPhoto);

export {openBigPhoto};
