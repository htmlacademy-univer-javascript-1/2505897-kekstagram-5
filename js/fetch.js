const BASE_URL = 'https://29.javascript.htmlacademy.pro/kekstagram';

const getPhotos = (onLoad, onFail) => {
  const handleResponse = (response) => {
    if (!response.ok) {
      throw new Error();
    }
    return response.json();
  };

  const fetchData = fetch(`${BASE_URL}/data`, { method: 'GET' });

  fetchData
    .then(handleResponse)
    .then(onLoad)
    .catch(onFail);
};

const setPhoto = (onLoad, onFail, body) => {
  const postData = fetch(`${BASE_URL}`, {
    method: 'POST',
    body: body,
  });

  postData
    .then(onLoad)
    .catch(onFail);
};

export { getPhotos, setPhoto };
