'use strict';

(function () {
  // sends form data to server
  var wizardForm = window.dialog.setup.querySelector('.setup-wizard-form');
  var onFormSubmit = function (evt) {
    window.backend.save(new FormData(wizardForm), function () {
      window.dialog.setup.classList.add(window.const.HIDDEN_CLASS);
    }, onError);
    evt.preventDefault();
  };
  wizardForm.addEventListener('submit', onFormSubmit);

  // sets the color when opening the page
  var coatColor = window.const.COAT_COLORS[0];
  var eyesColor = window.const.EYES_COLORS[0];
  // creates an empty array for wizards from the server
  var wizards = [];

  // sets the rating for wizards
  var getRank = function (wizard) {
    var rank = 0;
    if (wizard.colorCoat === window.dialog.coatColor || wizard.colorCoat === coatColor) {
      rank += 2;
    }
    if (wizard.colorEyes === window.dialog.eyesColor || wizard.colorEyes === eyesColor) {
      rank += 1;
    }
    return rank;
  };

  // adds sort by wizard name
  var namesComparator = function (left, right) {
    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }
  };

  // filters wizards
  var updateWizards = function () {
    window.render.renderWizard(wizards.sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        rankDiff = namesComparator(left.name, right.name);
      }
      return rankDiff;
    }));
  };

  // receives wizards from the server
  var onLoad = function (data) {
    wizards = data;
    updateWizards();
  };

  // error message block
  var onError = function (errorMessage) {
    var node = document.createElement('div');
    node.classList.add('error-message');
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.backend.load(onLoad, onError);


  window.setup = {
    updateWizards: updateWizards,
  };

})();
