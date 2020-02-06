Shopify.theme.jsFooter = {
    init: function($section) {

      $('.footer__heading').on('click', function (e) {
        e.stopPropagation();
        var close = $(this);
        close.next('.footer__menu__submenu').slideToggle( "slow");
      });
    }
  }