'use strict';

(function () {
  var removeClass = function (element, className) {
    element.classList.remove(className);
  };

  var addClass = function (element, className) {
    element.classList.add(className);
  };

  var getRandomNumber = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; // Максимум и минимум включаются
  };

  var getRandomElement = function (randomIndex, items) {
    return items[randomIndex];
  };


  window.util = {
    removeClass: removeClass,
    addClass: addClass,
    getRandomNumber: getRandomNumber,
    getRandomElement: getRandomElement,
    isEscEvent: function (evt, action) {
      if (evt.key === window.const.Key.ESCAPE) {
        action();
      }
    },
    isEnterEvent: function (evt, action) {
      if (evt.key === window.const.Key.ENTER) {
        action();
      }
    },
  };

})();
