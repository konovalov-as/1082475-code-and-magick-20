'use strict';

(function () {
  // wizard settings window
  var setup = document.querySelector('.setup');

  // button to close the wizard settings window
  var setupClose = setup.querySelector('.setup-close');

  // button to open the wizard settings window
  var setupOpen = document.querySelector('.setup-open');

  // pressing the Esc key
  var onPopupEscPress = function (evt) {
    window.util.doEscEvent(evt, closePopup);
  };

  // opens modal window
  var openPopup = function () {
    setup.classList.remove(window.const.HIDDEN_CLASS);
    document.addEventListener('keydown', onPopupEscPress);

    // wizard form
    var setupWizardForm = setup.querySelector('.setup-wizard-form');

    // wizard name input field
    var setupUserName = setupWizardForm.querySelector('.setup-user-name');
    setupUserName.addEventListener('keydown', function (evt) {
      evt.stopPropagation();
    });

    // replaces standard messages
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

    // replaces standard messages when entering data
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

    // hidden form fields with colors
    var hiddenCoatColor = setupWizardForm.querySelector('input[name=coat-color]');
    var hiddenEyesColor = setupWizardForm.querySelector('input[name=eyes-color]');
    var hiddenFireballColor = setupWizardForm.querySelector('input[name=fireball-color]');

    var wizardCoat = setupWizardForm.querySelector('.wizard-coat');
    wizardCoat.addEventListener('click', function () {
      var elementColor = window.const.COAT_COLORS[window.util.getRandomNumber(0, window.const.COAT_COLORS.length - 1)];
      wizardCoat.style.fill = elementColor;
      hiddenCoatColor.value = elementColor;
      window.dialog.coatColor = elementColor;

      window.debounce(window.setup.updateWizards);
    });


    var wizardEyes = setupWizardForm.querySelector('.wizard-eyes');
    wizardEyes.addEventListener('click', function () {
      var elementColor = window.util.getRandomElement(window.util.getRandomNumber(0, window.const.EYES_COLORS.length - 1), window.const.EYES_COLORS);
      wizardEyes.style.fill = elementColor;
      hiddenEyesColor.value = elementColor;
      window.dialog.eyesColor = elementColor;

      window.debounce(window.setup.updateWizards);
    });

    var wizardFireball = setupWizardForm.querySelector('.setup-fireball-wrap');
    wizardFireball.addEventListener('click', function () {
      var elementColor = window.util.getRandomElement(window.util.getRandomNumber(0, window.const.FIREBALL_COLORS.length - 1), window.const.FIREBALL_COLORS);
      wizardFireball.style.backgroundColor = elementColor;
      hiddenFireballColor.value = elementColor;
    });

  };

  // closes the modal window and removes the handler
  var closePopup = function () {
    setup.classList.add(window.const.HIDDEN_CLASS);
    document.removeEventListener('keydown', onPopupEscPress);
  };

  // opens a modal window on mouse click and pressing the Enter key on the user's avatar
  setupOpen.addEventListener('click', openPopup);
  setupOpen.addEventListener('keydown', function (evt) {
    window.util.doEnterEvent(evt, openPopup);
  });

  // closes the modal window by pressing the Enter key on the close button
  setupClose.addEventListener('keydown', function (evt) {
    window.util.doEnterEvent(evt, closePopup);
  });

  // closes the modal window on mouse click
  setupClose.addEventListener('click', closePopup);


  window.dialog = {
    setup: setup,
    setupClose: setupClose,
    setupOpen: setupOpen,
  };

})();
