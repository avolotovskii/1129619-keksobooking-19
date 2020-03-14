'use strict';
(function () {
  var getAvatarUrl = function (number) {
    var stringNumber = '' + number;
    return 'img/avatars/user' + stringNumber.padStart(2, '0') + '.png';
  };

  var getRandom = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  var getRandomElement = function (elements) {
    var getRandNumber = getRandom(0, elements.length);
    return elements[getRandNumber];
  };

  var getRandomArray = function (arr) {
    return arr.slice(0, getRandom(1, arr.length - 1));
  };

  window.utilits = {
    getAvatarUrl: getAvatarUrl,
    getRandom: getRandom,
    getRandomElement: getRandomElement,
    getRandomArray: getRandomArray
  };
})();
