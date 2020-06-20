'use strict';

(function () {
  window.colorize = function (element, input) {
    element.addEventListener('click', function () {

      var mapColorToElement = {
        'wizard-coat': window.const.COAT_COLORS[window.util.getRandomNumber(0, window.const.COAT_COLORS.length - 1)],
        'wizard-eyes': window.const.EYES_COLORS[window.util.getRandomNumber(0, window.const.EYES_COLORS.length - 1)],
        'setup-fireball-wrap': window.const.FIREBALL_COLORS[window.util.getRandomNumber(0, window.const.FIREBALL_COLORS.length - 1)],
      };
      var color = mapColorToElement[element.classList.value];
      input.value = color;

      if (element.tagName.toLowerCase() === 'div') {
        element.style.backgroundColor = color;
        return;
      }
      if (element.tagName.toLowerCase() === 'use') {
        element.style.fill = color;
      }
    });
  };

})();
