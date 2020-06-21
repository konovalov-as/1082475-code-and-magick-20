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
    window.util.doEscEvent(evt, closePopup);
  };

  // открывает модальное окно
  var openPopup = function () {
    window.util.removeClass(setup, window.const.HIDDEN_CLASS);
    document.addEventListener('keydown', onPopupEscPress);

    // форма
    var setupWizardForm = setup.querySelector('.setup-wizard-form');

    // поле ввода имени персонажа
    var setupUserName = setupWizardForm.querySelector('.setup-user-name');
    setupUserName.addEventListener('keydown', function (evt) {
      evt.stopPropagation();
    });

    // замена стандартных сообщений
    setupUserName.addEventListener('invalid', function () {
      if (setupUserName.validity.tooShort) {
        setupUserName.setCustomValidity('Имя должно состоять минимум из 2-х символов');
        return;
      }
      if (setupUserName.validity.tooLong) {
        setupUserName.setCustomValidity('Имя не должно превышать 25-ти символов');
        return;
      }
      if (setupUserName.validity.valueMissing) {
        setupUserName.setCustomValidity('Обязательное поле');
        return;
      }
      setupUserName.setCustomValidity('');
    });

    // вывод сообщений при изменении данных в поле
    setupUserName.addEventListener('input', function () {
      var valueLength = setupUserName.value.length;

      if (valueLength < window.const.NameLength.MIN) {
        setupUserName.setCustomValidity('Ещё ' + (window.const.NameLength.MIN - valueLength) + ' симв.');
        return;
      }
      if (valueLength > window.const.NameLength.MAX) {
        setupUserName.setCustomValidity('Удалите лишние ' + (valueLength - window.const.NameLength.MIN) + ' симв.');
        return;
      }
      setupUserName.setCustomValidity('');
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
    window.util.doEnterEvent(evt, openPopup);
  });

  // закрывает модельное окно по нажатию Enter на кнопке закрытия
  setupClose.addEventListener('keydown', function (evt) {
    window.util.doEnterEvent(evt, closePopup);
  });

  // закрывает окно по клику
  setupClose.addEventListener('click', closePopup);


  window.dialog = {
    setup: setup,
    setupClose: setupClose,
    setupOpen: setupOpen,
  };

})();
