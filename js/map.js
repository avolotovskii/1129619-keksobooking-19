'use strict';
(function () {
  var userDialog = document.querySelector('.map');

  var startInterface = function () {
    userDialog.classList.remove('map--faded');
    window.form.formAd.classList.remove('ad-form--disabled');
    window.form.makeFormsAvailable();
    window.controlMainPin.mainPin.removeEventListener('mousedown', window.controlMainPin.majorPinClickHandler);
    window.controlMainPin.mainPin.removeEventListener('keydown', window.controlMainPin.majorPinKeydownHandler);

    window.form.checkinElement.addEventListener('change', window.form.checkinChangeHandler);
    window.form.checkoutElement.addEventListener('change', window.form.checkoutChangeHandler);
    window.form.houseTypeElement.addEventListener('change', window.form.houseTypeChangeHandler);
  };

  window.map = {
    userDialog: userDialog,
    startInterface: startInterface,
  };
})();
