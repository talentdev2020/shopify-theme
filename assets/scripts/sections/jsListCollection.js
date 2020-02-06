"use strict";

Shopify.theme.jsListCollection = {
  init: function init($section) {
    // Add settings from schema to current object
    Shopify.theme.jsListCollection = $.extend(this, Shopify.theme.getSectionData($section));

    this.createSlider();
  },
  createSlider: function createSlider() {
    var listCollectionSlider = $('.list-collection.layout--slider');
    var $nextButton = $('.list-collection-slider__nav--next');
    var $prevButton = $('.list-collection-slider__nav--prev');
    
    $(listCollectionSlider).flickity({
      lazyLoad: 3,
      freeScroll: true,
      imagesLoaded: true,
      draggable: true,
      cellAlign: 'left',
      wrapAround: true,
      pageDots: false,
      contain: true,
      prevNextButtons: false,
      initialIndex: 0,
      arrowShape: arrowShape,
      on: {
        ready: function ready() {
          // Reset layout to avoid collapsing issues
          setTimeout(function () {
            $(listCollectionSlider).flickity('resize');
          }, 500);
        }
      }
    });
    $nextButton.on('click', function () {
      $(listCollectionSlider).flickity('next');
    });
    $prevButton.on('click', function () {
        $(listCollectionSlider).flickity('previous');
      });
  },
  unload: function unload($section) {
    var $slider = $section.find('.flickity-enabled');
    $slider.flickity('destroy');
  }
};
