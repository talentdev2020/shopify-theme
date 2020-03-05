"use strict";

Shopify.theme.jsCorporatePage = {
  init: function init($section) {
    if ($('.coporate-page-slider-container').length) {
      var faqCode = $(".corporate-slider").clone();
      $(".corporate-slider").addClass("removed-product");

      if (faqCode != null) {
        $('.coporate-page-slider-container').html(faqCode);
        $(".removed-product").remove();
      }
    }
  }
};