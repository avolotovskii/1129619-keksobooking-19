'use strict';

var AVATAR = [1, 2, 3, 4, 5, 6, 7, 8];
var TITLE = ['Самый лучший вариант', 'Вариант средний', 'Вариант для утех', 'Вариант для студентов'];
var ADDRESS = randomX + randomY;
var TYPE = ['palace', 'flat', 'house', 'bungalo'];
var ROOMS = [1, 2, 3, 4, 5];
var GUESTS = [1, 2, 3, 4];
var TIMES = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var DESCRIPTION = ['Ооочень круто', 'Идеально просто', 'Космос, а не вариант', 'Маме бы понравилось'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var MIN_PRICE = 1000;
var MAX_PRICE = 4000;
var MIN_Y = 130;
var MAX_Y = 630;

var userDialog = document.querySelector('.map');
userDialog.classList.remove('map--faded');

var data = [];

var func = function () {
  var randomX = getRandom(0, 1001);
  var randomY = getRandom(MIN_Y, MAX_Y + 1);
  var check = getRandomElement(TIMES);
  return {
    "author": {
      "avatar": avatarAdd(AVATAR[getRandom(AVATAR.length)]),
    },
    "offer": {
      "title": getRandomElement(TITLE),
      "address": randomX + randomY,
      "price": getRandom(MIN_PRICE, MAX_PRICE + 1),
      "type": getRandomElement(TYPE),
      "rooms": getRandomElement(ROOMS),
      "guests": getRandomElement(GUESTS),
      "checkin": check,
      "checkout": check,
      "features": getRandomItems(FEATURES),
      "description": getRandomElement(DESCRIPTION),
      "photos": getRandomElement(PHOTOS),
    },

    "location": {
      "x": randomX,
      "y": randomY,
    }
  }
};


var avatarAdd = function (number) {
  var stringNumber = '' + number;
  return 'img/avatars/user'+ stringNumber.padStart(2, '0') +'.png'
}

var getRandom = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

var rand = function () {
  return getRandom(0, 2)
};

var getRandomElement = function (element) {
  var rand = Math.floor(Math.random() * element.length);
  return element[rand];
};

var getRandomItems = function (items) {
  return items.filter(rand);
};
