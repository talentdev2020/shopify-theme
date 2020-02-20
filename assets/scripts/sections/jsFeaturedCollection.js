"use strict";

if ($( window ).width() > 798) {
  Shopify.theme.jsFeaturedCollection = {
    init: function init($section) {
      // Add settings from schema to current object
      Shopify.theme.jsFeaturedCollection = $.extend(this, Shopify.theme.getSectionData($section));

      if (this.enable_masonry_layout && !this.align_height && this.collection_style == 'grid') {
        Shopify.theme.applyMasonry();
      }

      if (this.collection_style == 'slider') {
        this.createSlider();
      }
    },
    createSlider: function createSlider() {
      var featuredCollectionSlider = $('.featured-collection.layout--slider .slider-gallery');
      var slideData = {
        products_per_slide: this.products_per,
        products_available: this.products_available,
        products_limit: this.products_limit,
        cellAlign: "left",
        wrapAround: false
      };
      $(featuredCollectionSlider).flickity({
        freeScroll: true,
        imagesLoaded: true,
        draggable: true,
        cellAlign: 'left',
        wrapAround: slideData.wrapAround,
        pageDots: false,
        contain: true,
        prevNextButtons: slideData.products_limit > slideData.products_per_slide ? true : false,
        initialIndex: 0,
        imagesLoaded: true
        arrowShape: 'm88.06492,42.97897l-63.40262,0l27.33874,-25.51181c1.74503,-1.62841 1.74503,-4.34244 0,-5.97085c-1.74503,-1.62841 -4.07173,-1.62841 -5.81675,0l-34.90052,32.56826c-1.74503,1.62841 -1.74503,4.34244 0,5.97085l34.90052,32.56826c1.74503,1.62841 4.6534,1.62841 6.39843,0c1.74503,-1.62841 1.74503,-3.79963 0,-5.42804l-27.33874,-26.05461l63.40262,0c2.3267,0 4.6534,-1.62841 4.6534,-4.34244c-1.16335,-2.17122 -2.90838,-4.34244 -5.23508,-3.79963l0,0z',
        on: {
          ready: function ready() {
            // Reset layout to avoid collapsing issues
            setTimeout(function () {
              $(featuredCollectionSlider).flickity('resize');
            }, 500);
          }
        }
      });
    },
    unload: function unload($section) {
      var $slider = $section.find('.flickity-enabled');
      $slider.flickity('destroy');
    }
  };
}