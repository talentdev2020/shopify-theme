Shopify.theme.jsDualTestimonials = {
	init: function($section) {
    this.createSlider();
  },
  createSlider: function() {
    const $dual_testimonialSlider = $('[data-dual-testimonial-slider]').flickity({
      wrapAround: true,
      cellSelector: '.testimonial-item',
      initialIndex: 1,
      prevNextButtons: false,
      pageDots: false,
      cellAlign: 'left',
      contain: true
    });

    // Reset layout to avoid collapsing issues
    setTimeout(function(){
      $dual_testimonialSlider.flickity('resize');
    }, 500);

    $('body').on('click', '.dual_testimonial__nav--prev', function () {
      $dual_testimonialSlider.flickity('previous');
    });

    $('body').on('click', '.dual_testimonial__nav--next', function () {
      $dual_testimonialSlider.flickity('next');
    });
  },
  blockSelect: function($section, blockId) {
    const $dual_testimonialSlider = $section.find('[data-dual-testimonial-slider]');

    const slideIndex = $('#shopify-section-' + blockId).data('dual_testimonial-index');

    $dual_testimonialSlider.flickity('select', slideIndex, true, true);
  },
	unload: function($section) {
    const $slider = $section.find('.flickity-enabled');
    $slider.flickity('destroy');
    $('.dual_testimonial__nav--prev').off();
    $('.dual_testimonial__nav--next').off();

	}
}