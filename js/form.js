'use strict';
(function () {
  var userDialog = document.querySelector('.map');
  var formAd = document.querySelector('.ad-form');
  var adFormHeader = formAd.querySelectorAll('.ad-form-header');
  var adFormElements = formAd.querySelectorAll('.ad-form__element');
  var adFormSubmit = formAd.querySelectorAll('.ad-form__submit');
  var adFormReset = formAd.querySelectorAll('.ad-form__reset');
  var mapFilters = userDialog.querySelector('.map__filters');
  var mapCheckbox = mapFilters.querySelectorAll('.map__checkbox');
  var defaultsAddressField = formAd.querySelector('input[name="address"]');

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
    var randomX = window.utilits.getRandom(window.data.COORDS_X_MIN, window.data.coordsXMax);
    var randomY = window.utilits.getRandom(window.data.COORDS_Y_MIN, window.data.COORDS_Y_MAX);
    var coordinats = randomX + ', ' + randomY;
    defaultsAddressField.value = coordinats;
  };

  var startInterface = function () {
    userDialog.classList.remove('map--faded');
    formAd.classList.remove('ad-form--disabled');
    makeFormsAvailable();
    mainPin.removeEventListener('mousedown', majorPinClickHandler);
    mainPin.removeEventListener('keydown', majorPinKeydownHandler);

    checkinElement.addEventListener('change', checkinChangeHandler);
    checkoutElement.addEventListener('change', checkoutChangeHandler);
    houseTypeElement.addEventListener('change', housTypeChangeHandler);
  };

  setDefaultAdress();
  makeFormsDisable();

  window.form = {
    makeFormsAvailable: makeFormsAvailable,
    startInterface: startInterface
  };

  var housTypeChangeHandler = function () {
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

  formAd.addEventListener('change', adFormChangeHandler);

})();
