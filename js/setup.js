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
  var wizardForm = window.dialog.setup.querySelector('.setup-wizard-form');
  var onFormSubmit = function (evt) {
    window.backend.save(new FormData(wizardForm), function () {
      window.dialog.setup.classList.add(window.const.HIDDEN_CLASS);
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
    similarDialog.classList.remove(window.const.HIDDEN_CLASS);
  };

  var onError = function (errorMessage) {
    var node = document.createElement('div');
    node.classList.add('error-message');

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.backend.load(onLoad, onError);

})();
