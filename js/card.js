'use strict';
(function () {
  var mapPopup = document.querySelector('#card').content.querySelector('.map__card');
  var coordsXMax = document.querySelector('.map').clientWidth;
  var similarPinElement = document.querySelector('.map__pins');
  var mapContainer = document.querySelector('.map__filters-container');
  var majorPinCloseClickHandler = function (evt) {
    if (evt.button === window.other.LEFT_MOUSE) {
      window.card.closeBasicPopup();
    }
  };

  var renderPopup = function (offer) {
    var popupElement = mapPopup.cloneNode(true);
    var popupCloseElement = popupElement.querySelector('.popup__close');

    popupElement.querySelector('.popup__avatar').setAttribute('src', offer.author.avatar);
    popupElement.querySelector('.popup__title').textContent = offer.offer.title;
    popupElement.querySelector('.popup__text--address').textContent = offer.offer.address;
    popupElement.querySelector('.popup__text--price').textContent = offer.offer.price + ' ₽/ночь';
    popupElement.querySelector('.popup__type').textContent = offer.offer.type;
    popupElement.querySelector('.popup__text--capacity').textContent = offer.offer.rooms + ' комнаты для ' + offer.offer.guests + ' гостей';
    popupElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + offer.offer.checkin + ', выезд до ' + offer.offer.checkout;
    popupElement.querySelector('.popup__description').textContent = offer.offer.description;
    popupElement.querySelector('.popup__photo').setAttribute('src', offer.offer.photos);

    popupCloseElement.addEventListener('click', majorPinCloseClickHandler);
    window.addEventListener('keydown', window.other.majorPinCloseKeydownHandler);

    return popupElement;
  };

  var renderAds = function (getData) {
    var fragment = document.createDocumentFragment();
    getData.forEach(function (item) {
      fragment.appendChild(window.pin.renderPin(item));
    });
    return fragment;
  };

  var createBasicPin = function (countPins) {
    var data = window.data.getData(countPins);
    var fragment = renderAds(data);

    similarPinElement.appendChild(fragment);

    var addPopup = renderPopup(data[0]);
    var parentDiv = mapContainer.parentNode;
    parentDiv.insertBefore(addPopup, mapContainer);
  };

  var renderPopupInfo = function (countPin) {
    var data = window.data.getData(countPin);
    var addPopup = renderPopup(data[0]);
    var parentDiv = mapContainer.parentNode;
    parentDiv.insertBefore(addPopup, mapContainer);
  };

  var closeBasicPopup = function () {
    var cardElement = window.map.userDialog.querySelector('.popup');

    if (cardElement) {
      var popupCloseElement = cardElement.querySelector('.popup__close');

      popupCloseElement.removeEventListener('click', majorPinCloseClickHandler);
      window.removeEventListener('keydown', window.other.majorPinCloseKeydownHandler);

      cardElement.remove();
    }
  };

  window.card = {
    coordsXMax: coordsXMax,
    createBasicPin: createBasicPin,
    closeBasicPopup: closeBasicPopup,
    renderPopupInfo: renderPopupInfo
  };
})();
