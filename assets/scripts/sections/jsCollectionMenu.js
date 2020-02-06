Shopify.theme.jsCollectionMenu = {
	init: function($section) {

    // Selectors
    const $prevButton = $section.find('.collection-menu__nav--prev');
    const $nextButton = $section.find('.collection-menu__nav--next');
    const $menuSlider = $section.find('[data-collection-menu-slider]');

    const $collectionMenuSlider = $menuSlider.flickity({
      initialIndex: 0,
      contain: true,
      cellAlign: 'left',
      wrapAround: false,
      prevNextButtons: false,
      pageDots: false,
      imagesLoaded: true,
      draggable: true,
      on: {
        ready: function() {
          // Reset layout to avoid collapsing issues
          setTimeout(function(){
            $collectionMenuSlider.flickity('resize')
          }, 500);
        }
      }
    });

    $prevButton.on('click', function () {
      $collectionMenuSlider.flickity('previous');
    });

    $nextButton.on('click', function () {
      $collectionMenuSlider.flickity('next');
    });
	},
  blockSelect: function($section, blockId) {
    var $collectionMenuSlider = $section.find('[data-collection-menu-slider]');

    var slideIndex = $('#shopify-section-' + blockId).data('collection-menu-index');

    $collectionMenuSlider.flickity('select', slideIndex, true, true);
  },
	unload: function($section) {
    var $slider = $section.find('.flickity-enabled');
    $slider.flickity('destroy');
    $('.collection-menu__nav--prev').off();
    $('.collection-menu__nav--next').off();

	}
}
