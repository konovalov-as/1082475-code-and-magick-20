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
  var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var LAST_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var WIDTH_RECT = 420;
  var HEIGHT_RECT = 270;
  var X_RECT = 100;
  var Y_RECT = 10;
  var GAP = 5;
  var LINE_HEIGHT = 20;
  var BAR_WIDTH = 40;
  var BAR_MAX_HEIGHT = 150;
  var COLOR_YOU = 'rgba(255, 0, 0, 1)';


  window.const = {
    Key: Key,
    NameLength: NameLength,
    HIDDEN_CLASS: HIDDEN_CLASS,
    NAMES: NAMES,
    LAST_NAMES: LAST_NAMES,
    COAT_COLORS: COAT_COLORS,
    EYES_COLORS: EYES_COLORS,
    FIREBALL_COLORS: FIREBALL_COLORS,
    WIDTH_RECT: WIDTH_RECT,
    HEIGHT_RECT: HEIGHT_RECT,
    X_RECT: X_RECT,
    Y_RECT: Y_RECT,
    GAP: GAP,
    LINE_HEIGHT: LINE_HEIGHT,
    BAR_WIDTH: BAR_WIDTH,
    BAR_MAX_HEIGHT: BAR_MAX_HEIGHT,
    COLOR_YOU: COLOR_YOU,
  };

})();
