"use strict";

Shopify.theme.jsTestimonials = {
  init: function init($section) {
    this.createSlider();
  },
  createSlider: function createSlider() {
    var $testimonialSlider = $('[data-testimonial-slider]').flickity({
      wrapAround: true,
      initialIndex: 1,
      prevNextButtons: true,
      pageDots: true,
      watchCSS: true,
      arrowShape: 'm88.06492,42.97897l-63.40262,0l27.33874,-25.51181c1.74503,-1.62841 1.74503,-4.34244 0,-5.97085c-1.74503,-1.62841 -4.07173,-1.62841 -5.81675,0l-34.90052,32.56826c-1.74503,1.62841 -1.74503,4.34244 0,5.97085l34.90052,32.56826c1.74503,1.62841 4.6534,1.62841 6.39843,0c1.74503,-1.62841 1.74503,-3.79963 0,-5.42804l-27.33874,-26.05461l63.40262,0c2.3267,0 4.6534,-1.62841 4.6534,-4.34244c-1.16335,-2.17122 -2.90838,-4.34244 -5.23508,-3.79963l0,0z'
    }); // Reset layout to avoid collapsing issues

    setTimeout(function () {
      $testimonialSlider.flickity('resize');
    }, 500);
    $('body').on('click', '.testimonial__nav--prev', function () {
      $testimonialSlider.flickity('previous');
    });
    $('body').on('click', '.testimonial__nav--next', function () {
      $testimonialSlider.flickity('next');
    });
  },
  blockSelect: function blockSelect($section, blockId) {
    var $testimonialSlider = $section.find('[data-testimonial-slider]');
    var slideIndex = $('#shopify-section-' + blockId).data('testimonial-index');
    $testimonialSlider.flickity('select', slideIndex, true, true);
  },
  unload: function unload($section) {
    var $slider = $section.find('.flickity-enabled');
    $slider.flickity('destroy');
    $('.testimonial__nav--prev').off();
    $('.testimonial__nav--next').off();
  }
};