const BASE_URL = 'https://29.javascript.htmlacademy.pro/kekstagram';


const getPhotos = (onLoad, onFail) => {
  fetch(`${BASE_URL}/data`, {
    method: 'GET',
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    })
    .then(onLoad)
    .catch(onFail);
};

const setPhoto = (onLoad, onFail, body) => {
  fetch(`${BASE_URL}`, {
    method: 'POST',
    body: body,
  })
    .then(onLoad)
    .catch(onFail);
};

export {getPhotos, setPhoto};
