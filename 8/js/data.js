import {getRandomInteger, getRandomArrayElement} from './util.js';

const NAMES = [
  'Владислав',
  'Мария',
  'Николай',
  'Михаил',
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const DESCRIPTIONS = [
  'Отличная работа!',
  'Прекрасно!',
  'Это просто шедевр!',
  'Восхитительно!',
];


function generateComments () {
  const comments = [];
  const countComments = getRandomInteger(0,30);
  for (let i = 0; i < countComments; i++) {
    comments.push ({
      id: i,
      avatar: `img/avatar-${getRandomInteger(1,6)}.svg`,
      message: getRandomArrayElement(MESSAGES),
      name: getRandomArrayElement(NAMES),
    });
  }
  return comments;
}

function generatePhotos() {
  const photos = [];

  for (let i = 1; i <= 25; i++) {
    photos.push ({
      id: i,
      url: `photos/${i}.jpg`,
      description: getRandomArrayElement(DESCRIPTIONS),
      likes: getRandomInteger(15, 200),
      comments: generateComments(),
    });
  }
  return photos;
}

export{generatePhotos};
