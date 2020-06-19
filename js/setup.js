'use strict';

(function () {
  // блок для вставки похожих персонажей
  var similarListElement = document.querySelector('.setup-similar-list');
  // шаблон блока похожих персонажей
  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

  // массив для похожих персонажей
  var wizards = [];

  // создаем объект волшебника
  var createWizard = function (characteristic) {
    var wizard = {
      name: characteristic.name,
      coatColor: characteristic.coatColor,
      eyesColor: characteristic.eyesColor,
    };
    return wizard;
  };

  // заполняем массив похожими персонажами
  for (var i = 0; i < window.const.QUANTITY_WIZARDS; i++) {
    var randomName = window.util.getRandomElement(window.util.getRandomNumber(0, window.const.NAMES.length - 1), window.const.NAMES);
    var randomLastName = window.util.getRandomElement(window.util.getRandomNumber(0, window.const.LAST_NAMES.length - 1), window.const.LAST_NAMES);
    var randomCoatColor = window.util.getRandomElement(window.util.getRandomNumber(0, window.const.COAT_COLORS.length - 1), window.const.COAT_COLORS);
    var randomEyesColor = window.util.getRandomElement(window.util.getRandomNumber(0, window.const.EYES_COLORS.length - 1), window.const.EYES_COLORS);
    var randomNumber = window.util.getRandomNumber(0, 1);
    var randomFullName = '';

    if (randomNumber === 0) {
      randomFullName = randomName + ' ' + randomLastName;
    } else {
      randomFullName = randomLastName + ' ' + randomName;
    }

    var newWizard = createWizard({
      name: randomFullName, coatColor: randomCoatColor, eyesColor: randomEyesColor
    });
    wizards.push(newWizard);
  }

  // заполняем блок персонажа
  var fillWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
    return wizardElement;
  };

  // выводим блок персонажа на страницу
  var renderWizards = function () {
    var fragment = document.createDocumentFragment();
    for (var j = 0; j < wizards.length; j++) {
      fragment.appendChild(fillWizard(wizards[j]));
    }
    similarListElement.appendChild(fragment);
  };
  renderWizards();

  // показывает блок с персонажами
  var similarDialog = window.dialog.setup.querySelector('.setup-similar');
  window.util.removeClass(similarDialog, window.const.HIDDEN_CLASS);
})();
