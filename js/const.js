'use strict';

(function () {
  var Key = {
    ESCAPE: 'Escape',
    ENTER: 'Enter',
  };
  var NameLength = {
    MIN: 2,
    MAX: 25,
  };
  var HIDDEN_CLASS = 'hidden';
  var QUANTITY_WIZARDS = 4;
  var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var LAST_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];


  window.const = {
    Key: Key,
    NameLength: NameLength,
    HIDDEN_CLASS: HIDDEN_CLASS,
    QUANTITY_WIZARDS: QUANTITY_WIZARDS,
    NAMES: NAMES,
    LAST_NAMES: LAST_NAMES,
    COAT_COLORS: COAT_COLORS,
    EYES_COLORS: EYES_COLORS,
    FIREBALL_COLORS: FIREBALL_COLORS,
  };

})();
