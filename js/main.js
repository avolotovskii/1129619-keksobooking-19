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

// var PHOTOS = [
//   'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
//   'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
//   'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
// ];

var Enum = {
  userDialog: document.querySelector('.map'),
  mapPins: document.querySelector('.map__pins'),
}

var Map = {
  PIN: document.querySelector('#pin').content.querySelector('.map__pin'),
  POPUP: document.querySelector('#card').content.querySelector('.map__card'),
};

var buttonHidden = document.querySelector('.map__pin--main');
var adForm = document.querySelector('.ad-form');
var roomsSelect = adForm.querySelector('select[name="rooms"]');
var capacitySelect = adForm.querySelector('select[name="capacity"]');
var adFormHeader = adForm.querySelectorAll('.ad-form-header');
var adFormElements = adForm.querySelectorAll('.ad-form__element');
var adFormSubmit = adForm.querySelectorAll('.ad-form__submit');
var adFormReset = adForm.querySelectorAll('.ad-form__reset');
var mapFilters = Enum.userDialog.querySelector('.map__filters');
var mapFilter = mapFilters.querySelector('.map__filter');
var mapCheckbox = mapFilters.querySelectorAll('.map__checkbox');
var mapPinMain = Enum.userDialog.querySelector('.map__pin--main');

var makeElementsDisabled = function (array) {
  for (var i = 0; i < array.length; i++) {
    array[i].setAttribute('disabled', 'disabled');
  }
};

var makeFormsDisable = function () {
  makeElementsDisabled(adFormHeader);
  makeElementsDisabled(adFormElements);
  makeElementsDisabled(adFormSubmit);
  makeElementsDisabled(adFormReset);
  makeElementsDisabled(mapFilter);
  makeElementsDisabled(mapCheckbox);
};

var makeElementsAvailable = function (array) {
  for (var i = 0; i < array.length; i++) {
    array[i].removeAttribute('disabled', 'disabled');
  }
};

var makeFieldsAvailable = function () {
  makeElementsAvailable(adFormHeader);
  makeElementsAvailable(adFormElements);
  makeElementsAvailable(mapFilter);
  makeElementsAvailable(mapCheckbox);
  makeElementsAvailable(adFormSubmit);
  makeElementsAvailable(adFormReset);
};

//Не могу корректно заполнить строку 92(((((
var getDefualtAdress = function () {
  var coordinats = 'проверка';
  var defaultsAddressField = adForm.querySelector('input[name="address"]');
  defaultsAddressField.value = coordinats;
};

getDefualtAdress();
makeFormsDisable();

var interfaceStart = function () {
  Enum.userDialog.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  makeFieldsAvailable();
};

buttonHidden.addEventListener('mousedown', function () {
  interfaceStart();
  main(COUNT)
});

buttonHidden.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    interfaceStart();
    main(COUNT)
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
  var rand = Math.floor(Math.random() * element.length);
  return element[rand];
};

// пробую что то придумать с фото комнат - проиграл(((
var getRandomPhotos = function (array) {
  var photos = [];
  for (var i = 0; i < array.length; i++) {
    photos.push(array);
  }
  return photos;
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
  popupElement.querySelector('.popup__text--price').textContent = offer.offer.price;
  popupElement.querySelector('.popup__type').textContent = offer.offer.type;
  popupElement.querySelector('.popup__text--capacity').textContent = offer.offer.rooms + ' комнаты для ' + offer.offer.guests + ' гостей';
  popupElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + offer.offer.checkin + ', выезд до ' + offer.offer.checkout;
  popupElement.querySelector('.popup__description').textContent = offer.offer.description;
  popupElement.querySelector('.popup__photo').setAttribute('src', offer.offer.photos);

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
  // var getData = mockData(COUNT);
  // var fragment = document.createDocumentFragment();
  // getData.forEach (function (item) {
  //   fragment.appendChild();
  // });
  // Enum.userDialog.appendChild(fragment);

  var getData = mockData(COUNT);
  var fragment = renderAds(getData);
  fragment.forEach(function (item) {
    Enum.userDialog.appendChild(item);
  });

  var addPopup = renderPopup(getData[1]);
  var getDiv2 = document.querySelector('.map__filters-container');
  var parentDiv = getDiv2.parentNode;
  parentDiv.insertBefore(addPopup, getDiv2);
};

var homeSelect = function () {
  var roomsSelectValue = roomsSelect.value;
  var capacitySelectValue = capacitySelect.value;
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
  capacitySelect.setCustomValidity(message);
};

var adFormChangeHandler = function () {
  homeSelect();
};


adForm.addEventListener('change', adFormChangeHandler);

var getDefualtAdress = function () {
  var coordinats = getData(adres);
  var defaultsAddressField = adForm.querySelector('input[name="address"]');
  defaultsAddressField.value = coordinats;
};

getDefualtAdress();
