"use strict";

Shopify.theme.jsFooter = {
  init: function init($section) {
     if ($('.monthly-box-faq-container').length) {
      var faqCode = $('.monthly-box_faq ').html();

      if (faqCode != null) {
        $('.monthly-box-faq-container').html(faqCode);
        $('.monthly-box_faq').empty();
      }
    }
  }
};