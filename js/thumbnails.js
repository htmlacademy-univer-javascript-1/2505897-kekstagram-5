import {openBigPhoto} from './full-size_pictures.js';

const photoTemplate = document.querySelector('#picture').content.querySelector('.picture');
const photosListElement = document.querySelector('.pictures');

const createThumbnail = ({url, description, likes, comments}) => {
  const photosElement = photoTemplate.cloneNode(true);
  photosElement.querySelector('.picture__img').src = url;
  photosElement.querySelector('.picture__img').alt = description;
  photosElement.querySelector('.picture__likes').textContent = likes;
  photosElement.querySelector('.picture__comments').textContent = comments.length;

  return photosElement;
};

const createThumbnailsFragment = (photos) => {
  const fragment = document.createDocumentFragment();
  photos.forEach((photo) => {
    const picturesElement = createThumbnail(photo);
    picturesElement.addEventListener('click', (evt) => {
      evt.preventDefault();
      openBigPhoto(photo);
    });
    fragment.appendChild(picturesElement);
  });
  return fragment;
};

const renderThumbnails = (photos) => {
  const existingPhotos = photosListElement.querySelectorAll('.picture');
  existingPhotos.forEach((picture) => picture.remove());

  const fragment = createThumbnailsFragment(photos);
  photosListElement.appendChild(fragment);
};

export {renderThumbnails};