'use strict';
(function () {
  var userDialog = document.querySelector('.map');

  var startInterface = function () {
    userDialog.classList.remove('map--faded');
    window.form.formAd.classList.remove('ad-form--disabled');
    window.form.makeFormsAvailable();
    window.other.mainPin.removeEventListener('mousedown', window.other.majorPinClickHandler);
    window.other.mainPin.removeEventListener('keydown', window.other.majorPinKeydownHandler);

    window.other.checkinElement.addEventListener('change', window.form.checkinChangeHandler);
    window.form.checkoutElement.addEventListener('change', window.form.checkoutChangeHandler);
    houseeTypeElement.addEventListener('change', housTypeChangeHandler);
  };

  window.map = {
    userDialog: userDialog,
    startInterface: startInterface,
  };
})();
