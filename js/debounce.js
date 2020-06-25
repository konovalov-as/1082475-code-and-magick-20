'use strict';

(function () {
  var DEBOUNCE_INTERVAL = window.const.DEBOUNCE_INTERVAL;

  var lastTimeout;
  window.debounce = function (cb) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(cb, DEBOUNCE_INTERVAL);
  }

})();


// (function () {
//   var DEBOUNCE_INTERVAL = window.const.DEBOUNCE_INTERVAL;

//   window.debounce = function (cb) {
//     var lastTimeout = null;

//     return function() {
//       var parameters = arguments;
//       if (lastTimeout) {
//         window.clearTimeout(lastTimeout);
//       }
//       lastTimeout = window.setTimeout(function() {
//         cb.apply(null, parameters);
//       }, DEBOUNCE_INTERVAL);
//     };
//   };

// })();
