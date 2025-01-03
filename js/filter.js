import {renderThumbnails} from './thumbnails.js';
import {debounce} from './util.js';
import {getPhotos} from './fetch.js';
import {showLoadError} from './message.js';

const RANDOM_PHOTOS_LIMIT = 10;
const TIMEOUT = 500;
const Filter = {
  DEFAULT: 'default',
  RANDOM: 'random',
  DISCUSSED: 'discussed',
};

let photos;
const imgFiltersElement = document.querySelector('.img-filters');
const filterButtons = imgFiltersElement.querySelectorAll('.img-filters__button');
const filterDefaultButton = imgFiltersElement.querySelector('#filter-default');
const filterRandomButton = imgFiltersElement.querySelector('#filter-random');
const filterDiscussedButton = imgFiltersElement.querySelector('#filter-discussed');


const showFilters = () => {
  imgFiltersElement.classList.remove('img-filters--inactive');
};

const setActiveFilterButton = (activeButton) => {
  filterButtons.forEach((button) => {
    button.classList.remove('img-filters__button--active');
  });
  activeButton.classList.add('img-filters__button--active');
};

const getRandomPhotos = (pictures) => {
  const randomPhotos = pictures.sort(() => 0.5 - Math.random());
  return randomPhotos.slice(0, RANDOM_PHOTOS_LIMIT);
};

const getDiscussedPhotos = (pictures) => pictures.slice().sort((a, b) => b.comments.length - a.comments.length);

const onFilterChange = debounce((filter, button) => {
  let filteredPhotos;
  switch (filter) {
    case Filter.DEFAULT:
      filteredPhotos = photos;
      break;
    case Filter.RANDOM:
      filteredPhotos = getRandomPhotos(photos);
      break;
    case Filter.DISCUSSED:
      filteredPhotos = getDiscussedPhotos(photos);
      break;
  }
  renderThumbnails(filteredPhotos);
  setActiveFilterButton(button);
}, TIMEOUT);

filterDefaultButton.addEventListener('click', () => onFilterChange('default', filterDefaultButton));
filterRandomButton.addEventListener('click', () => onFilterChange('random', filterRandomButton));
filterDiscussedButton.addEventListener('click', () => onFilterChange('discussed', filterDiscussedButton));

getPhotos((data) => {
  photos = data;
  showFilters();
  renderThumbnails(photos);
}, showLoadError);
