"use strict";

Shopify.theme.jsMonthlyboxPage = {
  init: function init($section) {
    if ($('.monthly-box-faq-container').length) {
      var faqCode = $(".monthly-box_faq").clone();
      $(".monthly-box_faq").addClass("removed-faq");

      if (faqCode != null) {
        $('.monthly-box-faq-container').html(faqCode);
        $(".removed-faq").remove();
      }
    }

    if ($('.monthly-box-product-container').length) {
      var faqCode = $(".Monthly-box_products-section").clone();
      $(".Monthly-box_products-section").addClass("removed-product");

      if (faqCode != null) {
        $('.monthly-box-product-container').html(faqCode);
        $(".removed-product").remove();
      }
    }
  }
};