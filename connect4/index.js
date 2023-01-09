const instructsButton = document.querySelector('.instructs');
const instructionsBackButton = document.querySelector('.instructions-back-botton');
const rulesBackButton = document.querySelector('.rules-back-button');
const homeElement = document.querySelector('.home');
const instructionsElement = document.querySelector('.instructions');
const rulesButton = document.querySelector('.rule');
const rulesElement = document.querySelector('.rules');

instructsButton.addEventListener('click', () => {
  homeElement.classList.add('hidden');
  instructionsElement.classList.add('visible');
});

instructionsBackButton.addEventListener('click', () => {
  homeElement.classList.remove('hidden');
  instructionsElement.classList.remove('visible');
});

rulesBackButton.addEventListener('click', () => {
  homeElement.classList.remove('hidden');
  rulesElement.classList.remove('visible');
});

rulesButton.addEventListener('click', () => {
  homeElement.classList.add('hidden');
  rulesElement.classList.add('visible');
});