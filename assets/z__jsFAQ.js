"use strict";

Shopify.theme.jsFAQ = {
  init: function init() {
    var $faqHeading = $('.faq-accordion > .faq-contents > .groups dt > button');
    console.log("clicked");
    $('.faq-accordion > .faq-contents > .groups > .dd').attr('aria-hidden', true);
    $faqHeading.attr('aria-expanded', false);
    $faqHeading.on('click activate', function () {
      console.log("click activate");
      var faqIcons = $(this).find('.icon');
      var state = $(this).attr('aria-expanded') === 'false' ? true : false;

      if (state == true) {
        var array = $('.faq-accordion > .faq-contents > .groups > dt > button').toArray();
        var length = array.length;

        var _loop = function _loop() {
          var faq_this = $(array[i]);
          var currentstate = faq_this.attr('aria-expanded') === 'false' ? true : false;

          if (!currentstate) {
            faq_this.attr('aria-expanded', false);
            faq_this.next().slideToggle(function () {
              var faqIcons1 = faq_this.find('.icon');

              if (faqIcons1.hasClass('icon--active')) {
                faqIcons1.toggleClass('icon--active');
              }
            });
            faq_this.next().attr('aria-hidden', true);
          }
        };

        for (var i = 0; i < length; i++) {
          _loop();
        }
      }

      $(this).attr('aria-expanded', state);
      $(this).next().slideToggle(function () {
        if (faqIcons.hasClass('icon--active')) {
          faqIcons.toggleClass('icon--active');
        }
      });
      $(this).next().attr('aria-hidden', !state);
      return false;
    });
    $faqHeading.on('keydown', function (event) {
      var keyCode = event.keyCode || e.which;

      if (keyCode === 13) {
        $(this).trigger('activate');
      }
    });
  },
  unload: function unload() {
    $('.faq-accordion > .faq-contents > .groups > dt > button').off('click activate');
    $('.faq-accordion > .faq-contents > .groups > dt > button').off('keydown');
  }
};