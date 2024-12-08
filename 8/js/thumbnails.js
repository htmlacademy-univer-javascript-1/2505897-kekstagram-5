import {generatePhotos} from './data.js';
import {openBigPicture} from './full-size_pictures.js';

const photos = generatePhotos();
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesListElement = document.querySelector('.pictures');


const createThumbnail = ({url, description, likes, comments}) => {
  const picturesElement = pictureTemplate.cloneNode(true);
  picturesElement.querySelector('.picture__img').src = url;
  picturesElement.querySelector('.picture__img').alt = description;
  picturesElement.querySelector('.picture__likes').textContent = likes;
  picturesElement.querySelector('.picture__comments').textContent = comments.length;

  return picturesElement;
};

const renderingThumbnails = () => {
  const fragment = document.createDocumentFragment();
  photos.forEach((photo) => {
    const picturesElement = createThumbnail(photo);

    picturesElement.addEventListener('click', (evt) => {
      evt.preventDefault();
      openBigPicture(photo);
    });

    fragment.appendChild(picturesElement);
  });

  picturesListElement.appendChild(fragment);
};

export {renderingThumbnails};
