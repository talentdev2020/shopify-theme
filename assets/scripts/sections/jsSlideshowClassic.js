Shopify.theme.jsSlideshowClassic = {
  init: function ($section) {

    // Add settings from schema to current object
    Shopify.theme.jsSlideshowClassic = $.extend(this, Shopify.theme.getSectionData($section));

    // Selectors
    const $slideshowClassicEl = $section.find('[data-slideshow-classic]').removeClass('is-hidden');

    const $slideshowClassic = $slideshowClassicEl.flickity({
      wrapAround: true,
      prevNextButtons: this.number_of_slides > 1 ? this.show_arrows : false,
      pageDots: this.show_nav_buttons,
      draggable: true,
      imagesLoaded: true,
      fade: this.image_transition == 'fade' ? true : false,
      autoPlay: this.image_slideshow_speed * 1000,
      arrowShape: arrowShape
    });

    setTimeout(function () {
      $slideshowClassicEl.flickity('resize');
    }, 500)

    $('body').on('click', '.button_move_down', function (event) {
      event.preventDefault();
      Shopify.theme.scrollToTop($('.jsLogoListSlider'), 50);
    });

  },
  blockSelect: function ($section, blockId) {
    const $slider = $section.find('[data-image-slideshow]');
    const $sliderIndex = $('#shopify-section-' + blockId).data('slide-index');

    $slider.flickity('select', $sliderIndex, true, true);

  },
  unload: function ($section) {

  }
}