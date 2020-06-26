'use strict';
(function () {
  // block to insert similar wizards
  var similarListElement = document.querySelector('.setup-similar-list');
  // similar wizard template
  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

  // creates a wizard
  var createWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;
    return wizardElement;
  };

  // adds a wizard to the page
  var renderWizard = function (wizards) {
    var fragment = document.createDocumentFragment();
    wizards.slice(0, window.const.WIZARDS_COUNT).forEach(function (itemWizard) {
      fragment.appendChild(createWizard(itemWizard));
    });
    similarListElement.textContent = '';
    similarListElement.appendChild(fragment);
  };

  // shows block with wizards
  var similarDialog = window.dialog.setup.querySelector('.setup-similar');
  similarDialog.classList.remove(window.const.HIDDEN_CLASS);


  window.render = {
    renderWizard: renderWizard,
  };

})();
