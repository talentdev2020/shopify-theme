"use strict";

Shopify.theme.jsFooter = {
  init: function init($section) {
    $('.footer__heading').on('click', function (e) {
      e.stopPropagation();
      var close = $(this);
      close.next('.footer__menu__submenu').slideToggle("slow");
    });
  }
};