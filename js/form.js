'use strict';
(function () {
  var formAd = document.querySelector('.ad-form');
  var adFormHeader = formAd.querySelectorAll('.ad-form-header');
  var adFormElements = formAd.querySelectorAll('.ad-form__element');
  var adFormSubmit = formAd.querySelectorAll('.ad-form__submit');
  var adFormReset = formAd.querySelectorAll('.ad-form__reset');
  var mapCheckbox = document.querySelectorAll('.map__checkbox');
  var defaultsAddressField = formAd.querySelector('input[name="address"]');
  var priceElement = formAd.querySelector('#price');
  var roomsSelect = formAd.querySelector('select[name="rooms"]');
  var capacitySelect = formAd.querySelector('select[name="capacity"]');
  var START_PRICE = {
    PALACE: 'Дворец от 10 000₽/ночь',
    FLAT: 'Квартиры от 1 000₽/ночь',
    HOUSE: 'Дома от 5 000₽/ночь',
  };
  var checkinElement = formAd.querySelector('#timein');
  var checkoutElement = formAd.querySelector('#timeout');
  var houseTypeElement = formAd.querySelector('#type');

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
    var randomX = window.utilits.getRandom(window.data.COORDS_X_MIN, window.card.coordsXMax);
    var randomY = window.utilits.getRandom(window.data.COORDS_Y_MIN, window.data.COORDS_Y_MAX);
    var coordinats = randomX + ', ' + randomY;
    defaultsAddressField.value = coordinats;
  };

  setDefaultAdress();
  makeFormsDisable();

  window.form = {
    makeFormsAvailable: makeFormsAvailable
  };

  var houseTypeChangeHandler = function () {
    switch (houseTypeElement.value) {
      case 'bungalo':
        priceElement.placeholder = 0;
        return;
      case 'flat':
        priceElement.placeholder = 1000;
        return;
      case 'house':
        priceElement.placeholder = 5000;
        return;
      case 'palace':
        priceElement.placeholder = 10000;
        return;
    }

    priceElement.min = priceElement.placeholder;
  };

  var homeSelect = function () {
    var roomsSelectValue = roomsSelect.value;
    var capacitySelectValue = capacitySelect.value;
    var message = '';
    var minPriceMessage = '';
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

    if (houseTypeElement.value === 'flat' && priceElement.value < 1000) {
      minPriceMessage = START_PRICE.FLAT;
    } else if (houseTypeElement.value === 'house' && priceElement.value < 5000) {
      minPriceMessage = START_PRICE.HOUSE;
    } else if (houseTypeElement.value === 'palace' && priceElement.value < 10000) {
      minPriceMessage = START_PRICE.PALACE;
    }

    priceElement.setCustomValidity(minPriceMessage);
  };

  var adFormChangeHandler = function () {
    homeSelect();
  };

  var checkinChangeHandler = function () {
    checkoutElement.value = checkinElement.value;
  };

  var checkoutChangeHandler = function () {
    checkinElement.value = checkoutElement.value;
  };

  formAd.addEventListener('change', adFormChangeHandler);

  window.form = {
    formAd: formAd,
    checkinChangeHandler: checkinChangeHandler,
    checkoutChangeHandler: checkoutChangeHandler,
    houseTypeChangeHandler: houseTypeChangeHandler,
    houseTypeElement: houseTypeElement
  };
})();
