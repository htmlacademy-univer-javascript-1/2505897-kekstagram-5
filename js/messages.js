import {isEscapeKey} from './util.js';

const body = document.querySelector('body');

function closeMessage(evt, messageClass) {
  const isClick = evt.type === 'click';
  const isKeydown = evt.type === 'keydown' && isEscapeKey(evt);

  if (isClick || isKeydown) {
    const message = document.querySelector(messageClass);

    if (isClick && (evt.target.classList.contains(`${messageClass.slice(1)}__button`) || !evt.target.classList.contains(`${messageClass.slice(1)}__inner`))) {
      body.removeEventListener('click', closeMessage);
      body.removeEventListener('keydown', closeMessage);
      message.remove();
    }
  }
}

function showMessage(id) {
  const messageTemplate = document.querySelector(id).content;
  const message = messageTemplate.cloneNode(true);
  body.appendChild(message);
}

function showLoadError() {
  const showAlertElement = document.createElement('div');
  showAlertElement.classList.add('load_error');
  showAlertElement.textContent = 'Не удалось загрузить данные. Попробуйте обновить страницу';
  document.body.append(showAlertElement);
}

function showSuccess() {
  body.addEventListener('keydown', (evt) => closeMessage(evt, '.success'));
  body.addEventListener('click', (evt) => closeMessage(evt, '.success'));
  showMessage('#success');
}

function showError() {
  body.addEventListener('keydown', (evt) => closeMessage(evt, '.error'));
  body.addEventListener('click', (evt) => closeMessage(evt, '.error'));
  showMessage('#error');
}

export {showLoadError, showSuccess, showError};
