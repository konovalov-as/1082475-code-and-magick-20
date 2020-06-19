'use strict';

(function () {
  // окно настроек персонажа
  var setup = document.querySelector('.setup');

  // кнопка закрытия окна настроек персонажа
  var setupClose = setup.querySelector('.setup-close');

  // кнопка открытия окна настроек персонажа
  var setupOpen = document.querySelector('.setup-open');

  // нажатие Esc
  var onPopupEscPress = function (evt) {
    window.util.isEscEvent(evt, closePopup);

    // var KEY = 'Escape';
    // var activeTagName = 'INPUT';
    // if (evt.target.tagName === activeTagName) {
    //   return;
    // } else {
    //   if (evt.key === KEY) {
    //     evt.preventDefault();
    //     closePopup();
    //   }
    // }
  };

  // открывает модальное окно
  var openPopup = function () {
    window.util.removeClass(setup, window.const.HIDDEN_CLASS);
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

      if (valueLength < window.const.MIN_NAME_LENGTH) {
        setupUserName.setCustomValidity('Ещё ' + (window.const.MIN_NAME_LENGTH - valueLength) + ' симв.');
      } else if (valueLength > window.const.MAX_NAME_LENGTH) {
        setupUserName.setCustomValidity('Удалите лишние ' + (valueLength - window.const.MIN_NAME_LENGTH) + ' симв.');
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
    window.colorize(wizardCoat, hiddenCoatColor);

    // глаза персонажа
    var wizardEyes = setupWizardForm.querySelector('.wizard-eyes');
    window.colorize(wizardEyes, hiddenEyesColor);

    // фаербол персонажа
    var wizardFireball = setupWizardForm.querySelector('.setup-fireball-wrap');
    window.colorize(wizardFireball, hiddenFireballColor);
  };

  // закрывает модальное окно и удаляет обработчик
  var closePopup = function () {
    window.util.addClass(setup, window.const.HIDDEN_CLASS);
    document.removeEventListener('keydown', onPopupEscPress);
  };

  // открывает модальное окно по клику и нажатию Enter на автарке пользователя
  setupOpen.addEventListener('click', openPopup);
  setupOpen.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, openPopup);
    // var KEY = 'Enter';
    // if (evt.key === KEY) {
    //   evt.preventDefault();
    //   openPopup();
    // }
  });

  // закрывает модельное окно по нажатию Enter на кнопке закрытия
  setupClose.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, closePopup);
    // var KEY = 'Enter';
    // if (evt.key === KEY) {
    //   evt.preventDefault();
    //   closePopup();
    // }
  });

  // закрывает окно по клику
  setupClose.addEventListener('click', closePopup);


  window.dialog = {
    setup: setup,
    setupClose: setupClose,
    setupOpen: setupOpen,
  };
})();
