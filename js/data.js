'use strict';
(function () {
  var AVATAR = [1, 2, 3, 4, 5, 6, 7, 8];
  var TITLE = ['Самый лучший вариант', 'Вариант средний', 'Вариант для утех', 'Вариант для студентов'];
  var TYPE = ['palace', 'flat', 'house', 'bungalo'];
  var ROOMS = [1, 2, 3, 4, 5];
  var GUESTS = [1, 2, 3, 4];
  var TIMES = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var DESCRIPTION = ['Ооочень круто', 'Идеально просто', 'Космос, а не вариант', 'Маме бы понравилось'];
  var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var MIN_PRICE = 1000;
  var MAX_PRICE = 4000;
  var COORDS_Y_MIN = 130;
  var COORDS_Y_MAX = 630;
  var COORDS_X_MIN = 0;

  var getData = function (countPins) {
    var data = [];
    for (var i = 0; i < countPins; i++) {
      var randomX = window.utilits.getRandom(COORDS_X_MIN, window.card.coordsXMax);
      var randomY = window.utilits.getRandom(COORDS_Y_MIN, COORDS_Y_MAX);
      var check = window.utilits.getRandomElement(TIMES);
      data.push({
        'author': {
          'avatar': window.utilits.getAvatarUrl(AVATAR[i]),
        },
        'offer': {
          'title': window.utilits.getRandomElement(TITLE),
          'address': randomX + ', ' + randomY,
          'price': window.utilits.getRandom(MIN_PRICE, MAX_PRICE),
          'type': window.utilits.getRandomElement(TYPE),
          'rooms': window.utilits.getRandomElement(ROOMS),
          'guests': window.utilits.getRandomElement(GUESTS),
          'checkin': check,
          'checkout': check,
          'features': window.utilits.getRandomArray(FEATURES),
          'description': window.utilits.getRandomElement(DESCRIPTION),
          'photos': window.utilits.getRandomArray(PHOTOS),
        },

        'location': {
          'x': randomX,
          'y': randomY,
        }
      });
    }
    return data;
  };
  window.data = {
    getData: getData,
    COORDS_Y_MIN: COORDS_Y_MIN,
    COORDS_Y_MAX: COORDS_Y_MAX,
    COORDS_X_MIN: COORDS_X_MIN
  };
})();
