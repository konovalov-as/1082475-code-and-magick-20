'use strict';

(function () {
  // блок для вставки похожих персонажей
  var similarListElement = document.querySelector('.setup-similar-list');
  // шаблон блока похожих персонажей
  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

  // заполняем блок волшебника
  var fillWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;
    return wizardElement;
  };

  // отправляем данные на сервер
  var wizardForm = window.dialog.setup.querySelector('.setup-wizard-form'); // dialog.js
  var onFormSubmit = function (evt) {
    window.backend.save(new FormData(wizardForm), function () {
      window.util.addClass(window.dialog.setup, window.const.HIDDEN_CLASS);
    }, onError);
    evt.preventDefault();
  };
  wizardForm.addEventListener('submit', onFormSubmit);

  // количество волшебников
  var wizardsCount = 4;

  // получаем волшебников с сервера
  var onLoad = function (wizards) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < wizardsCount; i++) {
      var randomIndex = window.util.getRandomNumber(0, wizards.length - 1);
      fragment.appendChild(fillWizard(wizards[randomIndex]));
    }
    similarListElement.appendChild(fragment);

    var similarDialog = window.dialog.setup.querySelector('.setup-similar');
    window.util.removeClass(similarDialog, window.const.HIDDEN_CLASS);
  };

  var onError = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: darkorange;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.backend.load(onLoad, onError);

})();
