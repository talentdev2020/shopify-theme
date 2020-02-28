"use strict";

Shopify.theme.jsLogoListSlider = {
  init: function init($section) {
    // Selectors
    var $prevButton = $section.find('.logo-list-slider__nav--prev');
    var $nextButton = $section.find('.logo-list-slider__nav--next');
    var $logoSlider = $section.find('[data-logo-list-slider]');
    var $LogoListSlider = $logoSlider.flickity({
      initialIndex: 1,
      contain: true,
      wrapAround: true,
      prevNextButtons: (isScreenSizeLarge()?false:true),
      pageDots: (isScreenSizeLarge()?false:true),
      imagesLoaded: true,
      draggable: true,
      watchCSS: true,
      on: {
        ready: function ready() {
          // Reset layout to avoid collapsing issues
          setTimeout(function () {
            $LogoListSlider.flickity('resize');
          }, 500);
        }
      }
    });
    $prevButton.on('click', function () {
      $LogoListSlider.flickity('previous');
    });
    $nextButton.on('click', function () {
      $LogoListSlider.flickity('next');
    });
  },
  blockSelect: function blockSelect($section, blockId) {
    var $LogoListSlider = $section.find('[data-logo-list-slider]');
    var slideIndex = $('#shopify-section-' + blockId).data('logo-index');
    $LogoListSlider.flickity('select', slideIndex, true, true);
  },
  unload: function unload($section) {
    var $slider = $section.find('.flickity-enabled');
    $slider.flickity('destroy');
    $('.logo-list-slider__nav--prev').off();
    $('.logo-list-slider__nav--next').off();
  }
};