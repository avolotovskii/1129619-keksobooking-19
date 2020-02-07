'use strict';

var AVATAR = [1, 2, 3, 4, 5, 6, 7, 8];
var TITLE = ['Самый лучший вариант', 'Вариант средний', 'Вариант для утех', 'Вариант для студентов'];
var ADDRESS = ['600, 350', '550, 400', '500, 300', '525, 325'];
var PRICE = [1000, 2000, 3000, 4000];
var TYPE = ['palace', 'flat', 'house', 'bungalo'];
var ROOMS = [1, 2, 3, 4, 5];
var GUESTS = [1, 2, 3, 4];
var TIMES = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var DESCRIPTION = ['Ооочень круто', 'Идеально просто', 'Космос, а не вариант', 'Маме бы понравилось'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var LOCATION_X = [50, 100, 150, 200, 250];
var LOCATION_Y = [150, 200, 250, 300, 350];

var userDialog = document.querySelector('.map');
userDialog.classList.remove('map--faded');

var data = [];

var func = function () {
  return {
    "author": {
      "avatar": avatarAdd(AVATAR[getRandom(AVATAR.length)]),
    },
    "offer": {
      "title": getRandomElement(TITLE),
      "address": getRandomElement(ADDRESS),
      "price": getRandomElement(PRICE),
      "type": getRandomElement(TYPE),
      "rooms": getRandomElement(ROOMS),
      "guests": getRandomElement(GUESTS),
      "checkin": getRandomElement(TIMES),
      "checkout": getRandomElement(TIMES),
      "features": getRandomElement(FEATURES),
      "description": getRandomElement(DESCRIPTION),
      "photos": getRandomElement(PHOTOS),
    },

    "location": {
      "x": getRandomElement(LOCATION_X),
      "y": getRandomElement(LOCATION_Y),
    }
  }
};


var avatarAdd = function (number) {
  var stringNumber = '' + number;
  return 'img/avatars/user'+ stringNumber.padStart(2, '0') +'.png'
}

var getRandom = function (max) {
  return Math.floor(Math.random() * (max));
};

var getRandomElement = function (element) {
  var rand = Math.floor(Math.random() * element.length);
  return element[rand];
};
