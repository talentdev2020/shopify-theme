Shopify.theme.jsLogoListSlider = {
  init: function ($section) {
    
    // Selectors
    const $prevButton = $section.find('.logo-list-slider__nav--prev');
    const $nextButton = $section.find('.logo-list-slider__nav--next');
    const $logoSlider = $section.find('[data-logo-list-slider]');

    const $LogoListSlider = $logoSlider.flickity({
      initialIndex: 1,
      contain: true,
      wrapAround: true,
      prevNextButtons: false,
      pageDots: false,
      imagesLoaded: true,
      draggable: true,
      watchCSS: true,
      on: {
        ready: function () {
          // Reset layout to avoid collapsing issues
          setTimeout(function () {
            $LogoListSlider.flickity('resize')
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
  blockSelect: function ($section, blockId) {
    var $LogoListSlider = $section.find('[data-logo-list-slider]');

    var slideIndex = $('#shopify-section-' + blockId).data('logo-index');

    $LogoListSlider.flickity('select', slideIndex, true, true);
  },
  unload: function ($section) {
    var $slider = $section.find('.flickity-enabled');
    $slider.flickity('destroy');
    $('.logo-list-slider__nav--prev').off();
    $('.logo-list-slider__nav--next').off();

  }
}