'use strict';
var ENTER_KEY = 'Enter';
var ESC_KEY = 'Escape';
var LEFT_MOUSE = 0;
var PIN = {
  WIDTH: 60,
  HEIGHT: 70,
};
var PINS_QUANTITY = 8;
var START_PRICE = {
  PALACE: 'Дворец от 10 000₽/ночь',
  FLAT: 'Квартиры от 1 000₽/ночь',
  HOUSE: 'Дома от 5 000₽/ночь',
};

var userDialog = document.querySelector('.map');
// var mapPins = document.querySelectorAll('.map__pins:not(.map__pin--main)'); я так понял, это нам пригодитьсы дальше
var mainPin = document.querySelector('.map__pin--main');
var formAd = document.querySelector('.ad-form');
var mapPin = document.querySelector('#pin').content.querySelector('.map__pin');
var similarPinElement = document.querySelector('.map__pins');

var roomsSelect = formAd.querySelector('select[name="rooms"]');
var capacitySelect = formAd.querySelector('select[name="capacity"]');
var checkinElement = formAd.querySelector('#timein');
var checkoutElement = formAd.querySelector('#timeout');
var houseTypeElement = formAd.querySelector('#type');
var priceElement = formAd.querySelector('#price');


var mapContainer = document.querySelector('.map__filters-container');


var majorPinClickHandler = function (evt) {
  if (evt.button === LEFT_MOUSE) {
    window.form.startInterface();
    window.card.createBasicPin(PINS_QUANTITY);
    window.card.closeBasicPopup();
  }
};

var majorPinKeydownHandler = function (evt) {
  if (evt.key === ENTER_KEY) {
    window.form.startInterface();
    window.card.createBasicPin(PINS_QUANTITY);
    window.card.closeBasicPopup();
  }
};

mainPin.addEventListener('mousedown', majorPinClickHandler);
mainPin.addEventListener('keydown', majorPinKeydownHandler);

var majorPinCloseClickHandler = function (evt) {
  if (evt.button === LEFT_MOUSE) {
    window.card.closeBasicPopup();
  }
};

var majorPinCloseKeydownHandler = function (evt) {
  if (evt.key === ESC_KEY) {
    window.card.closeBasicPopup();
  }
};

var checkinChangeHandler = function () {
  checkoutElement.value = checkinElement.value;
};

var checkoutChangeHandler = function () {
  checkinElement.value = checkoutElement.value;
};
