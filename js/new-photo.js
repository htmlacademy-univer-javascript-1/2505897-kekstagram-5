const SUPPORTED_FILE_EXTENSIONS = ['jpg', 'jpeg', 'png'];

const fileInputElement = document.querySelector('.img-upload__input');
const imagePreviewElement = document.querySelector('.img-upload__preview img');
const effectPreviewElements = document.querySelectorAll('.effects__item .effects__preview');

const handleFileChange = () => {
  const file = fileInputElement.files[0];
  const fileName = file.name.toLowerCase();
  let isValidFile = false;

  for (let i = 0; i < SUPPORTED_FILE_EXTENSIONS.length; i++) {
    if (fileName.endsWith(SUPPORTED_FILE_EXTENSIONS[i])) {
      isValidFile = true;
      break;
    }
  }

  if (isValidFile) {
    const objectURL = URL.createObjectURL(file);
    imagePreviewElement.src = objectURL;

    effectPreviewElements.forEach((previewElement) => {
      previewElement.style.backgroundImage = `url('${objectURL}')`;
    });
  }
};

fileInputElement.addEventListener('change', handleFileChange);
