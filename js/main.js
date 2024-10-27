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

const getRandomInteger = function(a,b) {
  const lower = Math.ceil(Math.min(a,b));
  const upper = Math.floor(Math.max(a,b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result)
};

function makeUnique (array, index, count, a, b) {
  while (index < count) {
    const value = getRandomInteger(a, b);
    if (findDublicates(array, value) === 0) {
      array[index] = value;
      index++;
    }
  }
  return array;
}

function findDublicates(array, value) {
  for (let i = 0; i < array.length; i++) {
    if (array[i] === value) {
      return 1;
    }
  }
  return 0;
}

const findRandomId = makeUnique(randomId, 0, 25, 1, 25);
const findRandomIdComments = makeUnique(randomIdComments, 0, 30, 0, 30);
const findRandomUrl = makeUnique(randomUrl, 0, 25, 1, 25);

const getRandomArrayElement = (elements) => elements[getRandomInteger{0, elements.length - 1}];

function generateComments () {
  const comments = [];
  const countComments = getRandomInteger(0,30);
  for (let i = 0; i < countComments; i++) {
    comments.push ({
      id: findRandomIdComments[i],
      avatar: 'img/avatar-${getRandomInteger(1,6)}.svg',
      message: getRandomArrayElement{MESSAGES},
      name: getRandomArrayElement{NAMES},
    });
  }
  return comments;
}

function generatePhotos() {
  const photos = [];

  for (let i = 0; i <= findRandomId.length - 1; i++) {
    photos.push ({
      id: findRandomId[i],
      url: 'photos/${findRandomUrl[i]}.jpg',
      description: getRandomArrayElement(DESCRIPTION),
      likes: getRandomInteger(15, 200),
      comments: generateComments(),
    });
  }
  return photos;
}

console.log(generatePhotos());
