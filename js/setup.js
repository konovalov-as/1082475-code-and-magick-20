'use strict';

var removeClass = function (element, className) {
  element.classList.remove(className);
};

var userDialog = document.querySelector('.setup');
if (userDialog) {
  removeClass(userDialog, 'hidden');
}

var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');

var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var LAST_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var similarWizards = []; // похожие персонажи

// получаем случайное число
var getRandomNumber = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; // Максимум и минимум включаются
};

// получаем случайный элемент
var getRandomElement = function (randomIndex, array) {
  var result = array[randomIndex];
  return result;
};

// создаем объект волшебника
var createSimilarWizard = function (characteristics) {
  var wizard = {
    name: characteristics.name,
    coatColor: characteristics.coatColor,
    eyesColor: characteristics.eyesColor,
  };
  return wizard;
};

// заполняем массив похожими персонажами
for (var i = 0; i < 4; i++) {
  var randomName = getRandomElement(getRandomNumber(0, NAMES.length - 1), NAMES);
  var randomLastName = getRandomElement(getRandomNumber(0, LAST_NAMES.length - 1), LAST_NAMES);
  var randomCoatColor = getRandomElement(getRandomNumber(0, COAT_COLORS.length - 1), COAT_COLORS);
  var randomEyesColor = getRandomElement(getRandomNumber(0, EYES_COLORS.length - 1), EYES_COLORS);
  var randomNumber = getRandomNumber(0, 1);
  var randomFulLName = '';

  if (randomNumber === 0) {
    randomFulLName = randomName + ' ' + randomLastName;
  } else {
    randomFulLName = randomLastName + ' ' + randomName;
  }

  var newWizard = createSimilarWizard({
    name: randomFulLName, coatColor: randomCoatColor, eyesColor: randomEyesColor
  });
  similarWizards.push(newWizard);
}

// заполняем блок персонажа
var renderWizard = function (similarWizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = similarWizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = similarWizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = similarWizard.eyesColor;
  return wizardElement;
};

// выводим блок персонажа на страницу
var renderBloks = function () {
  var fragment = document.createDocumentFragment();
  for (var j = 0; j < similarWizards.length; j++) {
    fragment.appendChild(renderWizard(similarWizards[j]));
  }
  similarListElement.appendChild(fragment);
};
renderBloks();

var similarDialog = document.querySelector('.setup-similar');
if (similarDialog) {
  removeClass(similarDialog, 'hidden');
}
