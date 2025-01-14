import {isEscapeKey} from './util.js';

const body = document.querySelector('body');

const closeMessage = (evt, messageClass) => {
  const message = document.querySelector(messageClass);
  if (message) {
    if (isEscapeKey(evt) || (evt.type === 'click') && (evt.target.classList.contains(`${messageClass.slice(1)}__button`) || !evt.target.classList.contains(`${messageClass.slice(1)}__inner`))) {
      body.removeEventListener('click', closeMessage);
      body.removeEventListener('keydown', closeMessage);
      message.remove();
    }
  }
};

const showMessage = (id) => {
  const messageTemplate = document.querySelector(id).content;
  const message = messageTemplate.cloneNode(true);
  body.appendChild(message);
};

const showLoadError = () => {
  const showAlertElement = document.createElement('div');
  showAlertElement.classList.add('load_error');
  showAlertElement.textContent = 'Не удалось загрузить данные. Попробуйте обновить страницу';
  document.body.append(showAlertElement);
};

const showLoadFormError = () => {
  const showAlertElement = document.createElement('div');
  showAlertElement.classList.add('load_error');
  showAlertElement.textContent = 'Не удалось отправить форму. Пожалуйста, исправьте некорректные значения и попробуйте снова';
  document.body.append(showAlertElement);

  setTimeout(() => {
    showAlertElement.remove();
  }, 5000);
};

const showSuccess = () => {
  body.addEventListener('keydown', (evt) => closeMessage(evt, '.success'));
  body.addEventListener('click', (evt) => closeMessage(evt, '.success'));
  showMessage('#success');
};

const showError = () => {
  body.addEventListener('keydown', (evt) => closeMessage(evt, '.error'));
  body.addEventListener('click', (evt) => closeMessage(evt, '.error'));
  showMessage('#error');
};

export {showLoadError, showLoadFormError, showSuccess, showError};
