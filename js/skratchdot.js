var SKRATCHDOT = (function () {
  var api = {};

  api.init = function () {
    $(document).ready(function () {
      // Don't apply link borders on images
      $('a:has(img)').addClass('noBackground noBorder');
    });
  };

  return api;
})();

SKRATCHDOT.init();
