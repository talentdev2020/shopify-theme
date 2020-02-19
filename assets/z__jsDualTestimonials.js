"use strict";

Shopify.theme.jsDualTestimonials = {
  init: function init($section) {
    // Add settings from schema to current object
    Shopify.theme.jsSlideshowClassic = $.extend(this, Shopify.theme.getSectionData($section));
    this.createSlider();
  },
  createSlider: function createSlider() {
    var $dual_testimonialSlider = $('[data-dual-testimonial-slider]').flickity({
      wrapAround: true,
      cellSelector: '.testimonial-item',
      initialIndex: 0,
      prevNextButtons: false,
      imagesLoaded: true,
      pageDots: false,
      cellAlign: 'left',
      autoPlay: this.auto_slide,
      contain: true
    }); // Reset layout to avoid collapsing issues

    setTimeout(function () {
      $dual_testimonialSlider.flickity('resize');
    }, 500);
    $('body').on('click', '.dual_testimonial__nav--prev', function () {
      $dual_testimonialSlider.flickity('previous');
    });
    $('body').on('click', '.dual_testimonial__nav--next', function () {
      $dual_testimonialSlider.flickity('next');
    });
  },
  blockSelect: function blockSelect($section, blockId) {
    var $dual_testimonialSlider = $section.find('[data-dual-testimonial-slider]');
    var slideIndex = $('#shopify-section-' + blockId).data('dual_testimonial-index');
    $dual_testimonialSlider.flickity('select', slideIndex, true, true);
  },
  unload: function unload($section) {
    var $slider = $section.find('.flickity-enabled');
    $slider.flickity('destroy');
    $('.dual_testimonial__nav--prev').off();
    $('.dual_testimonial__nav--next').off();
  }
};