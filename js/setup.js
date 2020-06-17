'use strict';

(function () {
  var HIDDEN_CLASS = 'hidden';
  var MIN_NAME_LENGTH = 2;
  var MAX_NAME_LENGTH = 25;
  var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var LAST_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  // окно настроек персонажа
  var setup = document.querySelector('.setup');

  // кнопка закрытия окна настроек персонажа
  var setupClose = setup.querySelector('.setup-close');

  // кнопка открытия окна настроек персонажа
  var setupOpen = document.querySelector('.setup-open');

  var removeClass = function (element, className) {
    element.classList.remove(className);
  };

  var addClass = function (element, className) {
    element.classList.add(className);
  };

  // нажатие Esc
  var onPopupEscPress = function (evt) {
    var KEY = 'Escape';
    var activeTagName = 'INPUT';
    if (evt.target.tagName === activeTagName) {
      return;
    } else {
      if (evt.key === KEY) {
        evt.preventDefault();
        closePopup();
      }
    }
  };

  // открывает модальное окно
  var openPopup = function () {
    removeClass(setup, HIDDEN_CLASS);
    document.addEventListener('keydown', onPopupEscPress);

    // форма
    var setupWizardForm = setup.querySelector('.setup-wizard-form');

    // поле ввода имени персонажа
    var setupUserName = setupWizardForm.querySelector('.setup-user-name');

    // замена стандартных сообщений
    setupUserName.addEventListener('invalid', function () {
      if (setupUserName.validity.tooShort) {
        setupUserName.setCustomValidity('Имя должно состоять минимум из 2-х символов');
      } else if (setupUserName.validity.tooLong) {
        setupUserName.setCustomValidity('Имя не должно превышать 25-ти символов');
      } else if (setupUserName.validity.valueMissing) {
        setupUserName.setCustomValidity('Обязательное поле');
      } else {
        setupUserName.setCustomValidity('');
      }
    });

    // вывод сообщений при изменении данных в поле
    setupUserName.addEventListener('input', function () {
      var valueLength = setupUserName.value.length;

      if (valueLength < MIN_NAME_LENGTH) {
        setupUserName.setCustomValidity('Ещё ' + (MIN_NAME_LENGTH - valueLength) + ' симв.');
      } else if (valueLength > MAX_NAME_LENGTH) {
        setupUserName.setCustomValidity('Удалите лишние ' + (valueLength - MIN_NAME_LENGTH) + ' симв.');
      } else {
        setupUserName.setCustomValidity('');
      }
    });

    // скрытые поля формы с цветами
    var hiddenCoatColor = setupWizardForm.querySelector('input[name=coat-color]');
    var hiddenEyesColor = setupWizardForm.querySelector('input[name=eyes-color]');
    var hiddenFireballColor = setupWizardForm.querySelector('input[name=fireball-color]');

    // мантия персонажа
    var wizardCoat = setupWizardForm.querySelector('.wizard-coat');
    // меняет цвет мантии персонажа по клику
    wizardCoat.addEventListener('click', function () {
      var randomCoatColor = COAT_COLORS[getRandomNumber(0, COAT_COLORS.length - 1)];
      wizardCoat.style.fill = randomCoatColor;
      hiddenCoatColor.value = randomCoatColor;
    });

    // глаза персонажа
    var wizardEyes = setupWizardForm.querySelector('.wizard-eyes');
    // меняет цвет глаз персонажа по клику
    wizardEyes.addEventListener('click', function () {
      var randomEyesColor = EYES_COLORS[getRandomNumber(0, EYES_COLORS.length - 1)];
      wizardEyes.style.fill = randomEyesColor;
      hiddenEyesColor.value = randomEyesColor;
    });

    // фаербол персонажа
    var wizardFireball = setupWizardForm.querySelector('.setup-fireball-wrap');
    // меняет цвет фаербола персонажа по клику
    wizardFireball.addEventListener('click', function () {
      var randomFireballColor = FIREBALL_COLORS[getRandomNumber(0, FIREBALL_COLORS.length)];
      wizardFireball.style.backgroundColor = randomFireballColor;
      hiddenFireballColor.value = randomFireballColor;
    });
  };

  // закрывает модальное окно и удаляет обработчик
  var closePopup = function () {
    addClass(setup, HIDDEN_CLASS);
    document.removeEventListener('keydown', onPopupEscPress);
  };

  // открывает модальное окно по клику и нажатию Enter на автарке пользователя
  setupOpen.addEventListener('click', openPopup);
  setupOpen.addEventListener('keydown', function (evt) {
    var KEY = 'Enter';
    if (evt.key === KEY) {
      evt.preventDefault();
      openPopup();
    }
  });

  // закрывает модельное окно по нажатию Enter на кнопке закрытия
  setupClose.addEventListener('keydown', function (evt) {
    var KEY = 'Enter';
    if (evt.key === KEY) {
      evt.preventDefault();
      closePopup();
    }
  });

  // закрывает окно по клику
  setupClose.addEventListener('click', closePopup);

  // блок для вставки похожих персонажей
  var similarListElement = document.querySelector('.setup-similar-list');
  // шаблон блока похожих персонажей
  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

  var similarWizards = []; // массив для похожих персонажей

  // получаем случайное число
  var getRandomNumber = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; // Максимум и минимум включаются
  };

  // получаем случайный элемент
  var getRandomElement = function (randomIndex, arrays) {
    var result = arrays[randomIndex];
    return result;
  };

  // создаем объект волшебника
  var createSimilarWizard = function (characteristic) {
    var wizard = {
      name: characteristic.name,
      coatColor: characteristic.coatColor,
      eyesColor: characteristic.eyesColor,
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
    var randomFullName = '';

    if (randomNumber === 0) {
      randomFullName = randomName + ' ' + randomLastName;
    } else {
      randomFullName = randomLastName + ' ' + randomName;
    }

    var newWizard = createSimilarWizard({
      name: randomFullName, coatColor: randomCoatColor, eyesColor: randomEyesColor
    });
    similarWizards.push(newWizard);
  }

  // заполняем блок персонажа
  var createWizard = function (similarWizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = similarWizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = similarWizard.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = similarWizard.eyesColor;
    return wizardElement;
  };

  // выводим блок персонажа на страницу
  var renderWizards = function () {
    var fragment = document.createDocumentFragment();
    for (var j = 0; j < similarWizards.length; j++) {
      fragment.appendChild(createWizard(similarWizards[j]));
    }
    similarListElement.appendChild(fragment);
  };
  renderWizards();

  var similarDialog = document.querySelector('.setup-similar');
  if (similarDialog) {
    removeClass(similarDialog, 'hidden');
  }

})();
