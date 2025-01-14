import {openBigPhoto} from './big-photo.js';

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

const renderThumbnails = (photos) => {
  const existingPhotos = photosListElement.querySelectorAll('.picture'); // Находим все элементы с классом 'picture'
  existingPhotos.forEach((picture) => picture.remove()); // Удаляем только их
  const fragment = document.createDocumentFragment();
  photos.forEach((photo) => {
    const picturesElement = createThumbnail(photo);
    picturesElement.addEventListener('click', (evt) => {
      evt.preventDefault();
      openBigPhoto(photo);
    });
    fragment.appendChild(picturesElement);
  });
  photosListElement.appendChild(fragment);
};

export{renderThumbnails};
