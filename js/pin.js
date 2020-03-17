'use strict';
(function () {
  var PIN = {
    WIDTH: 60,
    HEIGHT: 70,
  };
  var mapPin = document.querySelector('#pin').content.querySelector('.map__pin');

  var renderPin = function (offer) {
    var pinElement = mapPin.cloneNode(true);
    var pinX = window.utilits.getRandom(window.data.COORDS_X_MIN, window.card.coordsXMax) - PIN.WIDTH / 2;
    var pinY = window.utilits.getRandom(window.data.COORDS_Y_MIN, window.data.COORDS_Y_MAX) - PIN.HEIGHT;

    pinElement.setAttribute('style', 'left: ' + pinX + 'px; ' + 'top: ' + pinY + 'px;');

    pinElement.querySelector('img').src = offer.author.avatar;
    pinElement.querySelector('img').setAttribute('alt', offer.title);

    pinElement.addEventListener('mousedown', function (evt) {
      if (evt.button === window.other.LEFT_MOUSE) {
        window.card.closeBasicPopup();
        window.card.renderPopupInfo(window.other.PINS_QUANTITY);
      }
    });

    pinElement.addEventListener('keydown', function (evt) {
      if (evt.key === window.other.ESC_KEY) {
        window.card.closeBasicPopup();
        window.card.renderPopupInfo(window.other.PINS_QUANTITY);
      }
    });

    return pinElement;
  };

  window.pin = {
    renderPin: renderPin
  };
})();
