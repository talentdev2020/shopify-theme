Shopify.theme.mobileMenu = {
  init: function() {
    this.$mobileMenuToggle = $('[data-show-mobile-menu]');
    this.$mobileMenuIcon = $('.mobile-menu__toggle-icon');
    this.$mobileDropDownToggle = $('.mobile-menu .close-dropdown');

    $('body').on('click', '[data-show-mobile-menu="false"]', function() {
      Shopify.theme.mobileMenu.open();
    })

    $('body').on('click', '[data-show-mobile-menu="true"]', function () {
      Shopify.theme.mobileMenu.close();
    })

    $('body').on('click', '[data-submenu-open="false"]', function() {
      $(this).attr('data-submenu-open', true);
    });

    $('body').on('click', '[data-submenu-open="true"]', function () {
      $(this).attr('data-submenu-open', false);
    });

    if (Shopify.theme.jsHeader.enable_sticky === true) {
      this.enableSticky();
    }

  },
  open: function() {

    //Get current position on page
    let currentScrollPosition = window.scrollY;
    $('body').data('current-position', currentScrollPosition);

    // Calculate height of mobile content area
    let announcementHeight = 0;
    let mobileHeaderHeight = parseInt($('.mobile-header').height());

    if (typeof Shopify.theme.jsAnnouncementBar !== 'undefined' && Shopify.theme.jsAnnouncementBar.enable_sticky) {
      announcementHeight = Shopify.theme.jsAnnouncementBar.getAnnouncementHeight();
    }

    $('.mobile-menu, .mobile-menu__content').css({
      height: `calc(100% - ${mobileHeaderHeight + announcementHeight}px)`,
    });

    this.$mobileMenuIcon.addClass('is-active');
    $('[data-show-mobile-menu]').attr('data-show-mobile-menu', true);

    if (typeof Shopify.theme.jsAjaxCart !== 'undefined') {
      Shopify.theme.jsAjaxCart.hideMiniCart();
      Shopify.theme.jsAjaxCart.hideDrawer();
    }

    //Set delay on menu open to get proper page position
    setTimeout(function(){
      $('body').addClass('mobile-menu--opened');
    }, 10)

  },
  close: function() {

    $('body').removeClass('mobile-menu--opened');

    let lastScrollPosition = $('body').data('current-position');

    window.scrollTo(0, lastScrollPosition);

    this.$mobileMenuIcon.removeClass('is-active');
    $('[data-show-mobile-menu]').attr('data-show-mobile-menu', false);
  },
  enableSticky: function() {
    Shopify.theme.jsHeader.disableSticky();

    let $stickyEl = $('#mobile-header');
    let offset = 0;

    if (typeof Shopify.theme.jsAnnouncementBar !== 'undefined' && Shopify.theme.jsAnnouncementBar.enable_sticky) {
      offset = Shopify.theme.jsAnnouncementBar.getAnnouncementHeight();
    }

    $stickyEl.addClass('sticky--enabled');

    $stickyEl.sticky({
      wrapperClassName: 'header-sticky-wrapper',
      zIndex: 40,
      topSpacing: offset
    })
    .on('sticky-start', () => {
      var headerheight = $('#mobile-header').height();
      var annoucementHeight = $('.announcement-sticky-wrapper').height();
      var totalHeight = headerheight + annoucementHeight;
      $stickyEl.parent().parent().find('.search-overlay').addClass('sticky-search').css('top', totalHeight + 'px');
    })
    .on('sticky-end', () => {
      $stickyEl.parent().parent().find('.search-overlay').removeClass('sticky-search').css('top', '100%')
      // Safety timeout for logo width transition which can throw calculated height off
      setTimeout(() => {
        $stickyEl.sticky('update');
      }, 250);

      $stickyEl.find('.sticky-menu-wrapper').removeClass('is-visible');
    });
  },
  disableSticky: function() {
    let $stickyEl = $('#mobile-header');

    $stickyEl.unstick();
    $stickyEl.removeClass('sticky--enabled');

    setTimeout(function(){
      $('.header-sticky-wrapper').css('height', 'auto');
    }, 250)
  },
  unload: function($section) {
    $('[data-mobilemenu-toggle]').off();
    $('.mobile-menu__toggle-icon').off();
    $('.mobile-menu .close-dropdown').off();

    this.disableSticky();
  }
}

