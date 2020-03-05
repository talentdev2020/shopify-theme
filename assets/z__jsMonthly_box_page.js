"use strict";

Shopify.theme.jsFooter = {
  init: function init($section) {
    console.log("jsMonthly_box_page.js");

    if ($('.monthly-box-faq-container').length) {
      console.log("monthly-box-faq-container");
      var faqCode = $('.monthly-box_faq ').html();

      if (faqCode != null) {
        $('.monthly-box-faq-container').html(faqCode);
        $('.monthly-box_faq').empty();
      }
    }
  }
};