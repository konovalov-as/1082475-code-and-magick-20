'use strict';

var WIDTH_RECT = 420;
var HEIGHT_RECT = 270;
var X_RECT = 100;
var Y_RECT = 10;
var GAP = 5;
var LINE_HEIGHT = 20;
var BAR_WIDTH = 40;
var BAR_MAX_HEIGHT = 150;
var COLOR_YOU = 'rgba(255, 0, 0, 1)';

var renderCloud = function (ctx, fillStyle, x, y) {
  ctx.fillStyle = fillStyle;
  ctx.fillRect(x, y, WIDTH_RECT, HEIGHT_RECT);
};

var renderBar = function (ctx, fillStyle, x, y, barWidth, barHeight) {
  ctx.fillStyle = fillStyle;
  ctx.fillRect(x, y, barWidth, barHeight);
};

var renderText = function (ctx, fillStyle, text, x, y) {
  ctx.fillStyle = fillStyle;
  ctx.fillText(text, x, y);
};

var getMaxElement = function (array) {
  var maxElement = array[0];
  for (var i = 1; i < array.length; i++) {
    if (maxElement < array[i]) {
      maxElement = array[i];
    }
  }
  return maxElement;
};

function getRandomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

window.renderStatistics = function (ctx, players, times) {
  // Рисуем два прямоугольника
  renderCloud(ctx, 'rgba(0, 0, 0, 0.7)', X_RECT + GAP * 2, Y_RECT + GAP * 2);
  renderCloud(ctx, 'white', X_RECT, Y_RECT);

  // Рисуем две строки подписи
  ctx.fillStyle = 'black';
  ctx.textBaseline = 'top';
  ctx.font = '20px PT Mono';
  renderText(ctx, ctx.fillStyle, 'Ура вы победили!', X_RECT + GAP * 4, Y_RECT + GAP * 3);
  renderText(ctx, ctx.fillStyle, 'Список результатов:', X_RECT + GAP * 4, Y_RECT + GAP * 3 + LINE_HEIGHT + GAP);

  // Находим максимальное время игрока
  var maxTime = getMaxElement(times);
  maxTime = Math.round(maxTime);

  // Рисуем результат, шкалу, имя игрока
  for (var i = 0; i < players.length; i++) {
    // Получаем случайное число
    var randomReal = getRandomNumber(0, 1);
    randomReal = +randomReal.toFixed(2);
    // результат
    renderText(ctx, ctx.fillStyle, Math.round(times[i]), X_RECT + GAP * 10 + (BAR_WIDTH + GAP * 10) * i, Y_RECT + HEIGHT_RECT - GAP * 3 - LINE_HEIGHT - GAP * 2 - (BAR_MAX_HEIGHT * times[i]) / maxTime);
    // шкала
    if (players[i] === 'Вы') {
      ctx.fillStyle = COLOR_YOU;
    } else {
      ctx.fillStyle = 'hsla(240, 100%, 50%, ' + randomReal + ')';
    }
    renderBar(ctx, ctx.fillStyle, X_RECT + GAP * 10 + (BAR_WIDTH + GAP * 10) * i, Y_RECT + HEIGHT_RECT - GAP * 3 - LINE_HEIGHT - GAP * 2, BAR_WIDTH, -(BAR_MAX_HEIGHT * times[i]) / maxTime + GAP * 2 + LINE_HEIGHT);
    // имя
    ctx.fillStyle = 'black';
    renderText(ctx, ctx.fillStyle, players[i], X_RECT + GAP * 10 + (BAR_WIDTH + GAP * 10) * i, Y_RECT + HEIGHT_RECT - GAP * 3 - LINE_HEIGHT);
  }
};
