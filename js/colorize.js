'use strict';

(function () {
  var getRandomColor = function (partElement) {
    var color = '';
    switch (partElement) {
      case 'wizard-coat':
        color = window.const.COAT_COLORS[window.util.getRandomNumber(0, window.const.COAT_COLORS.length - 1)];
        break;
      case 'wizard-eyes':
        color = window.const.EYES_COLORS[window.util.getRandomNumber(0, window.const.EYES_COLORS.length - 1)];
        break;
      case 'setup-fireball-wrap':
        color = window.const.FIREBALL_COLORS[window.util.getRandomNumber(0, window.const.FIREBALL_COLORS.length - 1)];
        break;
    }
    return color;
  };


  window.colorize = function (element, input) {
    element.addEventListener('click', function () {
      var partElement = element.classList.value;
      var color = getRandomColor(partElement);
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
