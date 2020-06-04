'use strict';

function removeClass(element, className) {
  element.classList.remove(className);
}

var userDialog = document.querySelector('.setup');
if (userDialog) {
  removeClass(userDialog, 'hidden');
}

var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');

var firstName = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var lastName = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var coatColor = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var eyesColor = ['black', 'red', 'blue', 'yellow', 'green'];
var similarWizards = []; // похожие персонажи

// получаем случайное число
function getRandomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; // Максимум и минимум включаются
}

// получаем длину массива
function getLengthArray(array) {
  return array.length;
}

// получаем случайные данные
function getRandomData(randomIndex, array) {
  var result = array[randomIndex];
  return result;
}

// заполняем массив объектами
for (var i = 0; i < 4; i++) {
  var randomFirstName = getRandomData(getRandomNumber(0, getLengthArray(firstName) - 1), firstName);
  var randomLastName = getRandomData(getRandomNumber(0, getLengthArray(lastName) - 1), lastName);
  var randomCoatColor = getRandomData(getRandomNumber(0, getLengthArray(coatColor) - 1), coatColor);
  var randomEyesColor = getRandomData(getRandomNumber(0, getLengthArray(eyesColor) - 1), eyesColor);

  similarWizards[i] = {
    name: randomFirstName + ' ' + randomLastName,
    coatColor: randomCoatColor,
    eyesColor: randomEyesColor,
  };
}

// заполняем блок персонажа
var renderWizard = function (similarWizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = similarWizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = similarWizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = similarWizard.eyesColor;
  return wizardElement;
};

// вывод блок персонажа на страницу
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
