'use strict';

(function () {
  var getRandomColor = function (partElement) {
    var color = '';
    switch (partElement) {
      case 'wizard-coat':
        color = window.const.COAT_COLORS[Math.floor(window.const.COAT_COLORS.length * Math.random())];
        break;
      case 'wizard-eyes':
        color = window.const.EYES_COLORS[Math.floor(window.const.EYES_COLORS.length * Math.random())];
        break;
      case 'setup-fireball-wrap':
        color = window.const.FIREBALL_COLORS[Math.floor(window.const.FIREBALL_COLORS.length * Math.random())];
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
        return;
      }
    });
  };
})();
