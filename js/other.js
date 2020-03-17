'use strict';
var ENTER_KEY = 'Enter';
var ESC_KEY = 'Escape';
var LEFT_MOUSE = 0;
var PINS_QUANTITY = 8;

// var mapPins = document.querySelectorAll('.map__pins:not(.map__pin--main)'); я так понял, это нам пригодитьсы дальше

var majorPinClickHandler = function (evt) {
  if (evt.button === LEFT_MOUSE) {
    window.map.startInterface();
    window.card.createBasicPin(PINS_QUANTITY);
    window.card.closeBasicPopup();
  }
};

var majorPinKeydownHandler = function (evt) {
  if (evt.key === ENTER_KEY) {
    window.map.startInterface();
    window.card.createBasicPin(PINS_QUANTITY);
    window.card.closeBasicPopup();
  }
};

mainPin.addEventListener('mousedown', majorPinClickHandler);
mainPin.addEventListener('keydown', majorPinKeydownHandler);


var majorPinCloseKeydownHandler = function (evt) {
  if (evt.key === ESC_KEY) {
    window.card.closeBasicPopup();
  }
};


window.other = {
  majorPinCloseKeydownHandler: majorPinCloseKeydownHandler,
  majorPinClickHandler: majorPinClickHandler,
  majorPinKeydownHandler: majorPinKeydownHandler,
  LEFT_MOUSE: LEFT_MOUSE,
  PINS_QUANTITY: PINS_QUANTITY,
  ESC_KEY: ESC_KEY
};
