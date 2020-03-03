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
var COUNT = 8;
var ENTER_KEY = 'Enter';
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

var Element = {
  USER_DIALOG: document.querySelector('.map'),
  MAP_PINS: document.querySelector('.map__pins'),
  BUTTON_HIDDEN: document.querySelector('.map__pin--main'),
  AD_FORM: document.querySelector('.ad-form'),
  MAP_CONTAINER: document.querySelector('.map__filters-container'),
  POPUP_PHOTOS: document.querySelector('.popup__photos'),
}

// var Element_dependence = {
//   ROOMS_SELECT: Element.AD_FORM.querySelector('select[name="rooms"]'),
//   CAPACITY_SELECT: Element.AD_FORM.querySelector('select[name="capacity"]'),
//   MAP_FILTERS: Element.USER_DIALOG.querySelector('.map__filters'),
// }

// var Elements_dependence = {
//   AD_FORM_HEADER: Element.AD_FORM.querySelectorAll('.ad-form-header'),
//   AD_FORM_ELEMENTS: Element.AD_FORM.querySelectorAll('.ad-form__element'),
//   AD_FORM_SUBMIT: Element.AD_FORM.querySelectorAll('.ad-form__submit'),
//   AD_FORM_RESET: Element.AD_FORM.querySelectorAll('.ad-form__reset'),
//   MAP_CHECKBOX: MAP_FILTERS.querySelectorAll('.map__checkbox'),
// }

// var MAP_FILTER = MAP_FILTERS.querySelector('.map__filter');

var Map = {
  PIN: document.querySelector('#pin').content.querySelector('.map__pin'),
  POPUP: document.querySelector('#card').content.querySelector('.map__card'),
};

var ROOMS_SELECT = Element.AD_FORM.querySelector('select[name="rooms"]');
var CAPACITY_SELECT = Element.AD_FORM.querySelector('select[name="capacity"]');
var AD_FORM_HEADER = Element.AD_FORM.querySelectorAll('.ad-form-header');
var AD_FORM_ELEMENTS = Element.AD_FORM.querySelectorAll('.ad-form__element');
var AD_FORM_SUBMIT = Element.AD_FORM.querySelectorAll('.ad-form__submit');
var AD_FORM_RESET = Element.AD_FORM.querySelectorAll('.ad-form__reset');
var MAP_FILTERS = Element.USER_DIALOG.querySelector('.map__filters');
var MAP_FILTER = MAP_FILTERS.querySelector('.map__filter');
var MAP_CHECKBOX = MAP_FILTERS.querySelectorAll('.map__checkbox');
var MAP_PIN_MAIN = Element.USER_DIALOG.querySelector('.map__pin--main');

var MAP_CONTAINER = document.querySelector('.map__filters-container');
var POPUP_PHOTOS = document.querySelector('.popup__photos');

var disableElements = function (array) {
  array.forEach(function (item) {
    item.setAttribute('disabled', 'disabled');
  })
};

var makeFormsDisable = function () {
  disableElements(AD_FORM_HEADER);
  disableElements(AD_FORM_ELEMENTS);
  disableElements(AD_FORM_SUBMIT);
  disableElements(AD_FORM_RESET);
  disableElements(MAP_CHECKBOX);
};

var availableElements = function (array) {
  array.forEach(function (item) {
    item.removeAttribute('disabled', 'disabled');
  })
};

var makeFormsAvailable = function () {
  availableElements(AD_FORM_HEADER);
  availableElements(AD_FORM_ELEMENTS);
  availableElements(MAP_CHECKBOX);
  availableElements(AD_FORM_SUBMIT);
  availableElements(AD_FORM_RESET);
};

//Не могу корректно заполнить(((((
var setDefualtAdress = function () {
  var coordinats = 'проверка';
  var defaultsAddressField = Element.AD_FORM.querySelector('input[name="address"]');
  defaultsAddressField.value = coordinats;
};

var startInterface = function () {
  Element.USER_DIALOG.classList.remove('map--faded');
  Element.AD_FORM.classList.remove('ad-form--disabled');
  makeFormsAvailable();
};

Element.BUTTON_HIDDEN.addEventListener('mousedown', function () {
  startInterface();
  main(COUNT);
});

Element.BUTTON_HIDDEN.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    startInterface();
    main(COUNT);
  };
});

var data = [];

var mockData = function (COUNT) {
  var data = [];
  for (var i = 0; i < COUNT; i++) {
    var randomX = getRandom(Coords.X.MIN, Coords.X.MAX + 1);
    var randomY = getRandom(Coords.Y.MIN, Coords.Y.MAX + 1);
    var check = getRandomElement(TIMES);
    data.push({
      "author": {
        "avatar": getAvatarUrl(AVATAR[i]),
      },
      "offer": {
        "title": getRandomElement(TITLE),
        "address": randomX + ', ' + randomY,
        "price": getRandom(MIN_PRICE, MAX_PRICE + 1),
        "type": getRandomElement(TYPE),
        "rooms": getRandomElement(ROOMS),
        "guests": getRandomElement(GUESTS),
        "checkin": TIMES,
        "checkout": TIMES,
        "features": getRandomItems(FEATURES),
        "description": getRandomElement(DESCRIPTION),
        "photos": getRandomPhotos(PHOTOS),
      },

      "location": {
        "x": randomX,
        "y": randomY,
      }
    })
  }
  return data;
};

var getAvatarUrl = function (number) {
  var stringNumber = '' + number;
  return 'img/avatars/user' + stringNumber.padStart(2, '0') + '.png'
};

var getRandom = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

var rand = function () {
  return getRandom(0, 2)
};

var getRandomElement = function (element) {
  var rand = getRandom(0, element.length);
  return element[rand];
};

var getRandomPhotos = function (photos) {
  var fragmentPhotos = document.createDocumentFragment();
  photos.forEach(function (item) {
    item.appendChild(renderPopup(photos[item]));
  })
  POPUP_PHOTOS.appendChild.fragmentPhotos;
};

var getRandomItems = function (items) {
  return items.filter(rand);
};

var renderPin = function (offer) {
  var pinElement = Map.PIN.cloneNode(true);
  var pinX = getRandom(Coords.X.MIN, Coords.X.MAX) - PIN.WIDTH / 2;
  var pinY = getRandom(Coords.Y.MIN, Coords.Y.MAX) - PIN.HEIGHT;

  pinElement.setAttribute('style', 'left: ' + pinX + 'px; ' + 'top: ' + pinY + 'px;');

  pinElement.querySelector('img').src = offer.author.avatar;
  pinElement.querySelector('img').setAttribute('alt', offer.title);

  return pinElement;
};


var renderPopup = function (offer) {
  var popupElement = Map.POPUP.cloneNode(true);

  popupElement.querySelector('.popup__avatar').setAttribute('src', offer.author.avatar);
  popupElement.querySelector('.popup__title').textContent = offer.offer.title;
  popupElement.querySelector('.popup__text--address').textContent = offer.offer.address;
  popupElement.querySelector('.popup__text--price').textContent = offer.offer.price + ' ₽/ночь';
  popupElement.querySelector('.popup__type').textContent = offer.offer.type;
  popupElement.querySelector('.popup__text--capacity').textContent = offer.offer.rooms + ' комнаты для ' + offer.offer.guests + ' гостей';
  popupElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + offer.offer.checkin + ', выезд до ' + offer.offer.checkout;
  popupElement.querySelector('.popup__description').textContent = offer.offer.description;
  popupElement.querySelector('.popup__photos').setAttribute('src', offer.offer.photos);

  return popupElement;
};

var renderAds = function (getData) {
  var fragment = [];
  getData.forEach(function (item) {
    fragment.push(renderPin(item));
  });
  return fragment;
};

var main = function (COUNT) {
  var data = mockData(COUNT);
  var fragment = renderAds(data);
  console.log(Element.MAP_PINS);
  // fragment.forEach(function (item) {
  //   Element.USER_DIALOG.appendChild(item)
  // })
  Element.MAP_PINS.appendChild(fragment);

  var addPopup = renderPopup(data[1]);
  var parentDiv = MAP_CONTAINER.parentNode;
  parentDiv.insertBefore(addPopup, MAP_CONTAINER);
};

var homeSelect = function () {
  var roomsSelectValue = ROOMS_SELECT.value;
  var capacitySelectValue = CAPACITY_SELECT.value;
  var message = '';
  if (roomsSelectValue === '1') {
    if (capacitySelectValue !== '1') {
      message = 'Одну комнату может занимать только один гость';
    }
  }
  if (roomsSelectValue === '2') {
    if ((capacitySelectValue !== '1') && (capacitySelectValue !== '2')) {
      message = 'Две комнаты может занимать только один или два гостя';
    }
  }
  if (roomsSelectValue === '3') {
    if ((capacitySelectValue !== '1') && (capacitySelectValue !== '2') && (capacitySelectValue !== '3')) {
      message = 'Три комнаты может занимать только один, два или три гостя';
    }
  }
  if (roomsSelectValue === '100') {
    if (capacitySelectValue !== '0') {
      message = 'Сто комнат не для гостей';
    }
  }
  CAPACITY_SELECT.setCustomValidity(message);
};

setDefualtAdress();
makeFormsDisable();

var AD_FORMChangeHandler = function () {
  homeSelect();
};

Element.AD_FORM.addEventListener('change', AD_FORMChangeHandler);
