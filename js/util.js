'use strict';

(function () {
  var getRandomNumber = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; // Максимум и минимум включаются
  };

  var getRandomElement = function (randomIndex, items) {
    return items[randomIndex];
  };

  var doEscEvent = function (evt, action) {
    if (evt.key === window.const.Key.ESCAPE) {
      action();
    }
  };

  var doEnterEvent = function (evt, action) {
    if (evt.key === window.const.Key.ENTER) {
      action();
    }
  };

  window.util = {
    getRandomNumber: getRandomNumber,
    getRandomElement: getRandomElement,
    doEscEvent: doEscEvent,
    doEnterEvent: doEnterEvent,
  };

})();
