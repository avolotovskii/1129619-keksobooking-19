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
var ENTER_KEY = 'Enter';
var LEFT_MOUSE = 1;
var Coords = {
  Y: {
    MIN: 130,
    MAX: 630,
  },
  X: {
    MIN: 0,
    MAX: document.querySelector('.map').clientWidth,
  },
};
var PIN = {
  WIDTH: 60,
  HEIGHT: 70,
};
var quantityPins = 8;

var userDialog = document.querySelector('.map');
var mapPins = document.querySelector('.map__pins');
var mainPin = document.querySelector('.map__pin--main');
var formAd = document.querySelector('.ad-form');
var mapPin = document.querySelector('#pin').content.querySelector('.map__pin');
var mapPopup = document.querySelector('#card').content.querySelector('.map__card');

var roomsSelect = formAd.querySelector('select[name="rooms"]');
var capacitySelect = formAd.querySelector('select[name="capacity"]');
var adFormHeader = formAd.querySelectorAll('.ad-form-header');
var adFormElements = formAd.querySelectorAll('.ad-form__element');
var adFormSubmit = formAd.querySelectorAll('.ad-form__submit');
var adFormReset = formAd.querySelectorAll('.ad-form__reset');
var mapFilters = userDialog.querySelector('.map__filters');
var mapCheckbox = mapFilters.querySelectorAll('.map__checkbox');
var defaultsAddressField = formAd.querySelector('input[name="address"]');


var mapContainer = document.querySelector('.map__filters-container');

var makeDisableElements = function (array) {
  array.forEach(function (item) {
    item.setAttribute('disabled', '');
  });
};

var makeFormsDisable = function () {
  makeDisableElements(adFormHeader);
  makeDisableElements(adFormElements);
  makeDisableElements(adFormSubmit);
  makeDisableElements(adFormReset);
  makeDisableElements(mapCheckbox);
};

var makeAvailableElements = function (array) {
  array.forEach(function (item) {
    item.removeAttribute('disabled', '');
  });
};

var makeFormsAvailable = function () {
  makeAvailableElements(adFormHeader);
  makeAvailableElements(adFormElements);
  makeAvailableElements(mapCheckbox);
  makeAvailableElements(adFormSubmit);
  makeAvailableElements(adFormReset);
};

var setDefaultAdress = function () {
  var randomX = getRandom(Coords.X.MIN, Coords.X.MAX);
  var randomY = getRandom(Coords.Y.MIN, Coords.Y.MAX);
  var coordinats = randomX + ', ' + randomY;
  defaultsAddressField.value = coordinats;
};

var startInterface = function () {
  userDialog.classList.remove('map--faded');
  formAd.classList.remove('ad-form--disabled');
  makeFormsAvailable();
  mainPin.removeEventListener('mousedown', activateMapMouse);
  mainPin.removeEventListener('keydown', activateMapKeydown);
};

var activateMapMouse = function (evt) {
  if (evt.which === LEFT_MOUSE) {
    startInterface();
    main(quantityPins);
  }
};

var activateMapKeydown = function (evt) {
  if (evt.key === ENTER_KEY) {
    startInterface();
    main(quantityPins);
  }
};

mainPin.addEventListener('mousedown', activateMapMouse);
mainPin.addEventListener('keydown', activateMapKeydown);

var mockData = function (countPins) {
  var data = [];
  for (var i = 0; i < countPins; i++) {
    var randomX = getRandom(Coords.X.MIN, Coords.X.MAX);
    var randomY = getRandom(Coords.Y.MIN, Coords.Y.MAX);
    var check = getRandomElement(TIMES);
    data.push({
      'author': {
        'avatar': getAvatarUrl(AVATAR[i]),
      },
      'offer': {
        'title': getRandomElement(TITLE),
        'address': randomX + ', ' + randomY,
        'price': getRandom(MIN_PRICE, MAX_PRICE),
        'type': getRandomElement(TYPE),
        'rooms': getRandomElement(ROOMS),
        'guests': getRandomElement(GUESTS),
        'checkin': check,
        'checkout': check,
        'features': getRandomArray(FEATURES),
        'description': getRandomElement(DESCRIPTION),
        'photos': getRandomArray(PHOTOS),
      },

      'location': {
        'x': randomX,
        'y': randomY,
      }
    });
  }
  return data;
};

var getAvatarUrl = function (number) {
  var stringNumber = '' + number;
  return 'img/avatars/user' + stringNumber.padStart(2, '0') + '.png';
};

var getRandom = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

var getRandomElement = function (element) {
  var getRandBinary = getRandom(0, element.length);
  return element[getRandBinary];
};

var getRandomArray = function (arr) {
  return arr.slice(0, getRandom(1, arr.length - 1));
};

var renderPin = function (offer) {
  var pinElement = mapPin.cloneNode(true);
  var pinX = getRandom(Coords.X.MIN, Coords.X.MAX) - PIN.WIDTH / 2;
  var pinY = getRandom(Coords.Y.MIN, Coords.Y.MAX) - PIN.HEIGHT;

  pinElement.setAttribute('style', 'left: ' + pinX + 'px; ' + 'top: ' + pinY + 'px;');

  pinElement.querySelector('img').src = offer.author.avatar;
  pinElement.querySelector('img').setAttribute('alt', offer.title);

  return pinElement;
};


var renderPopup = function (offer) {
  var popupElement = mapPopup.cloneNode(true);

  popupElement.querySelector('.popup__avatar').setAttribute('src', offer.author.avatar);
  popupElement.querySelector('.popup__title').textContent = offer.offer.title;
  popupElement.querySelector('.popup__text--address').textContent = offer.offer.address;
  popupElement.querySelector('.popup__text--price').textContent = offer.offer.price + ' ₽/ночь';
  popupElement.querySelector('.popup__type').textContent = offer.offer.type;
  popupElement.querySelector('.popup__text--capacity').textContent = offer.offer.rooms + ' комнаты для ' + offer.offer.guests + ' гостей';
  popupElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + offer.offer.checkin + ', выезд до ' + offer.offer.checkout;
  popupElement.querySelector('.popup__description').textContent = offer.offer.description;
  popupElement.querySelector('.popup__photo').setAttribute('src', offer.offer.photos);

  return popupElement;
};

var renderAds = function (getData) {
  var fragment = document.createDocumentFragment();
  getData.forEach(function (item) {
    fragment.appendChild(renderPin(item));
  });
  return fragment;
};

var main = function (countPins) {
  var data = mockData(countPins);
  var fragment = renderAds(data);

  mapPins.appendChild(fragment);
  // POPUP_PHOTO.appendChild(fragmentPhotos);


  var addPopup = renderPopup(data[1]);
  var parentDiv = mapContainer.parentNode;
  parentDiv.insertBefore(addPopup, mapContainer);
};

var homeSelect = function () {
  var roomsSelectValue = roomsSelect.value;
  var capacitySelectValue = capacitySelect.value;
  var message = '';
  if (roomsSelectValue === '1') {
    if (capacitySelectValue !== '1') {
      message = 'Одна комната только для одного гостя';
    }
  }
  if (roomsSelectValue === '2') {
    if ((capacitySelectValue !== '1') && (capacitySelectValue !== '2')) {
      message = 'Две комнаты только для один или дввух гостей';
    }
  }
  if (roomsSelectValue === '3') {
    if ((capacitySelectValue !== '1') && (capacitySelectValue !== '2') && (capacitySelectValue !== '3')) {
      message = 'Три комнаты только для одного, двух или трех гостей';
    }
  }
  if (roomsSelectValue === '100') {
    if (capacitySelectValue !== '0') {
      message = 'Сто комнат не для гостей';
    }
  }
  capacitySelect.setCustomValidity(message);
};

setDefaultAdress();
makeFormsDisable();

var adFormChangeHandler = function () {
  homeSelect();
};

formAd.addEventListener('change', adFormChangeHandler);
