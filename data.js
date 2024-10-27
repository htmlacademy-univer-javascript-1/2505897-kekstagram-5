import {getRandomInteger, makeUniqueId, getRandomArrayElement} from './util.js';

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

const DESCRIPTION = [
  'Отличная работа!',
  'Прекрасно!',
  'Это просто шедевр!',
  'Восхитительно!',
];

const randomId = [];
const randomIdComments = [];
const randomUrl = [];

function generateComments () {
  const comments = [];
  const countComments = getRandomInteger(0,30);
  for (let i = 0; i < countComments; i++) {
    comments.push ({
      id: makeUniqueId(randomIdComments, 0, 30, 0, 30)[i],
      avatar: 'img/avatar-${getRandomInteger(1,6)}.svg',
      message: getRandomArrayElement(MESSAGES),
      name: getRandomArrayElement(NAMES),
    });
  }
  return comments;
}

function generatePhotos() {
  const photos = [];

  for (let i = 0; i <= makeUniqueId(randomId, 0, 25, 1, 25).length - 1; i++) {
    photos.push ({
      id: makeUniqueId(randomId, 0, 25, 1, 25)[i],
      url: 'photos/${makeUniqueId(randomUrl, 0, 25, 1, 25)[i]}.jpg',
      description: getRandomArrayElement(DESCRIPTION),
      likes: getRandomInteger(15, 200),
      comments: generateComments(),
    });
  }
  return photos;
}

console.log(generatePhotos());
