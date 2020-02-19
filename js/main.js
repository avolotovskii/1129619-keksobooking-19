'use strict';

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
var Coords = {
  Y: {
    MIN: 130,
    MAX: 630,
  },
  X: {
    MIN: 0,
    MAX: 1200,
  },
};
var PIN = {
  WIDTH: 60,
  HEIGHT: 70,
};

var userDialog = document.querySelector('.map');

var data = [];

var options = function () {
  var randomX = getRandom(Coords.X.MIN, Coords.X.MAX + 1);
  var randomY = getRandom(Coords.Y.MIN, Coords.Y.MAX + 1);
  var check = getRandomElement(TIMES);
  return {
    "author": {
      "avatar": avatarAdd(AVATAR[getRandom(AVATAR.length)]),
    },
    "offer": {
      "title": getRandomElement(TITLE),
      "address": randomX, randomY,
      "price": getRandom(MIN_PRICE, MAX_PRICE + 1),
      "type": getRandomElement(TYPE),
      "rooms": getRandomElement(ROOMS),
      "guests": getRandomElement(GUESTS),
      "checkin": TIMES,
      "checkout": TIMES,
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

var mapPin = document.querySelector('#pin').content.querySelector('.map_pin');

var renderPin = function (offer) {
  var pinElement = Nodes.mapPin.cloneNode(true);
  var pinX = location.x - PIN_WIDTH / 2;
  var pinY = location.y - PIN_HEIGHT;

  pinElement.setAttribute('style', 'left: ' + pinX + 'px; ' + 'top: ' + pinY + 'px;');

  pinElement.querySelector('img').src = offer.author.avatar;
  pinElement.querySelector('img').setAttribute('alt', offer.title);

  return pinElement;
};

var mapPopup = document.querySelector('#card').content.querySelector('.map__card');

var renderPopup = function (offer) {
  var popupElement = Nodes.mapPopup.cloneNode(true);

  popupElement.querySelector('.popup__avatar').setAttribute('src', offer.author.avatar);
  popupElement.querySelector('.popup__title').textContent = offer.offer.title;
  popupElement.querySelector('.popup__text--address').textContent = offer.offer.address;
  popupElement.querySelector('.popup__text--price').textContent = offer.offer.price;
  popupElement.querySelector('.popup__type').textContent = offer.offer.type;
  popupElement.querySelector('.popup__text--capacity').textContent = offer.offer.rooms + ' комнаты для ' + offer.offer.guests + ' гостей';
  popupElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + offer.offer.checkin + ', выезд до ' + offer.offer.checkout;
  popupElement.querySelector('.popup__description').textContent = offer.offer.description;

  return popupElement;
};

var data = options(AVATAR);
var ads = rand(data);


var renderAds = function (offer) {
  var fragment = document.createDocumentFragment();
  ads.forEach(function(item){
    fragment.push(renderPin[item]);
  });
  return fragment;
};

userDialog.classList.remove('map--faded');
