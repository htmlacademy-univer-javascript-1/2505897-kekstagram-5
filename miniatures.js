import {generatePhotos} from './data.js';

const photos = generatePhotos();
const pictureTemplate = document.querySelector('#picture .picture');
const pictureListElement = document.querySelector('.pictures');
const fragment = document.createDocumentFragment();

photos.forEach(({url, description, likes, comments}) => {
  const pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.querySelector('.picture__img').alt = description;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;
  fragment.appendChild(pictureElement);
});

pictureListElement.appendChild(fragment);
