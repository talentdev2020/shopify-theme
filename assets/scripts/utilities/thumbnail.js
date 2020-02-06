var globalQuickShopProduct;

Shopify.theme.thumbnail = {
  enableSwatches: function() {
    if (isScreenSizeLarge()) {
      $('body').on('mouseenter', '.thumbnail-swatch', function() {
        $('.swatch span', $(this)).each(function() {
          if (
            $(this)
              .data('image')
              .indexOf('no-image') == -1
          ) {
            $(this).find('.swatch__image').attr('src', $(this).data('image'));
          }
        });
      });
      $('body').on('mouseenter', '.swatch span', function(){
        if (
          $(this)
            .data('image')
            .indexOf('no-image') == -1
        ) {
          $(this)
            .parents('.thumbnail')
            .find('.product__imageContainer img:not(.secondary)')
            .attr('src', $(this).data('image'));
          $(this)
            .parents('.thumbnail')
            .find('.product__imageContainer img:not(.secondary)')
            .attr('srcset', $(this).data('image'));
        }
      })
    }
  },
  showVariantImage: function(){
    if (isScreenSizeLarge()) {

      $('body').on("mouseenter", ".swap--true", function() {
        $(this).find('.product-image__wrapper img').toggleClass('swap--visible');
      });

      $('body').on("mouseleave", ".swap--true", function() {
        $(this).find('.product-image__wrapper img').toggleClass('swap--visible');
      });
    }
  },
  showQuickShop: function() {

    //EVENT - click on quick-shop
    $('body').on('click', '.js-quick-shop-link', function(e){
      e.preventDefault();

      //Set productData object based on data attributes
      const productData = {
        handle: $(this).data('handle'),
        product_id: $(this).data('id'),
        single_variant: $(this).attr('data-single-variant'),
        product_in_collection_url: $(this).data('url'),
        escaped_title: $(this).data('title'),
        details_text: $(this).data('details-text'),
        full_description: $(this).data('full-description'),
        regular_description: $(this).data('regular-description'),
        featured_image: $(this).data('featured-image'),
        image_array: Shopify.theme.thumbnail.createImageObjects($(this).data('images')),
        collection_handles: $(this).data('collection-handles').trim(',').split(','),
        money_format: $('body').data('money-format')
      }

      //Find current product and notify forms
      const $notifyForm = $(this).next('.js-quickshop-forms__container').find('.notify_form');
      const $productForm = $(this).next('.js-quickshop-forms__container').find('.product_form');

      $.fancybox.open($('.js-quick-shop'), {
        baseClass: 'quick-shop__lightbox product-' + productData.product_id,
        hash: false,
        infobar : false,
        toolbar: false,
        loop: true,
        smallBtn : true,
        mobile: {
          preventCaptionOverlap: false,
          toolbar: true
        },
        beforeLoad: function(){
          Shopify.theme.thumbnail.beforeOpen(productData);
        },
        afterLoad: function(){
          Shopify.theme.thumbnail.afterContent($productForm, $notifyForm, productData);
          if($('.tabs').length > 0) {
            Shopify.theme.tabs.enableTabs();
          }
          Shopify.theme.jsProduct.enableProductSwatches();
        },
        afterShow: function(){
          $('.quick-shop').addClass('quick-shop--loaded');
          Shopify.theme.responsiveVideo.init();
        },
        beforeClose: function(){
          Shopify.theme.thumbnail.beforeClose(productData);
          $('.quick-shop').removeClass('quick-shop--loaded');
        }
      })

    });
  },
  beforeClose(productData) {

    const $insertedNotifyForm = $('.quick-shop__lightbox .notify_form');
    const $insertedProductForm = $('.quick-shop__lightbox .product_form');

    //Copy form data back to product loop and add .viewed
    $('.js-quickshop-forms--'+ productData.product_id).append($insertedProductForm);
    $('.js-quickshop-forms--'+ productData.product_id).append($insertedNotifyForm);
    $('.js-quickshop-forms--'+ productData.product_id +' .product_form').addClass('viewed');
    $('.js-quickshop-forms--'+ productData.product_id +' .notify_form').addClass('viewed');

    // Clear stickers
    $('.quick-shop .thumbnail-sticker span').empty().parent().addClass('is-hidden');

    //Find gallery and carousel
    const $gallery = $('.js-gallery-modal');
    const $carousel = $('.js-gallery-carousel');

    $('.js-gallery-carousel .gallery-cell').off('click');

    //Remove image slides from gallery
    $gallery.flickity( 'remove', $('.gallery-cell', $gallery));

    //Destroy sliders when modal closes
    $gallery.flickity('destroy');
    if ($carousel.hasClass('flickity-enabled')){
      $carousel.flickity( 'remove', $('.gallery-cell', $carousel) );
      $carousel.flickity('destroy');
    } else {
      $carousel.find('.gallery-cell').remove();
    }

    const variantPrice = $('.js-current-price .money').text();
    $('.js-quick-shop-link[data-id=' + productData.product_id + ']').attr('data-initial-modal-price', variantPrice);
    $('.js-current-price, .js-was-price, .js-savings').empty();

    if($('.js-gallery-modal').data('zoom') === true) {
      $('.js-gallery-modal').trigger('zoom.destroy'); // remove zoom
    }

  },
  afterContent: function($productForm, $notifyForm, productData) {

    Shopify.theme.thumbnail.retrieveProductInfo(productData);

    var prevNext = false;
    var draggable = false;
    var fade = false;

    if($('.js-gallery-modal').hasClass('slideshow_animation--fade')) {
      fade = true;
    }

    if (productData.image_array.length > 5) {
      prevNext = true;
      draggable = true;
    }

    //Add main gallery
    $('.js-gallery-modal').flickity({
      "adaptiveHeight": true,
      "wrapAround": "true",
      "cellAlign": "left",
      "draggable": true,
      "contain": true,
      "imagesLoaded": true,
      "lazyLoad": 2,
      "pageDots": false,
      "dragThreshold": 10,
      "prevNextButtons": productData.image_array.length > 1 ? true : false,
      "arrowShape": arrowShape,
      "fade": fade
    });

    //Initialize carousel flickity
    $('.js-gallery-carousel').flickity({
      "asNavFor": ".js-gallery-modal",
      "adaptiveHeight": false,
      "cellAlign": 'center',
      "draggable": draggable,
      "contain": true,
      "imagesLoaded": true,
      "lazyLoad": 2,
      "pageDots": false,
      "dragThreshold": 10,
      "arrowShape": arrowShape,
      "prevNextButtons": prevNext
    });

    // Removes carousel if there is only one product image
    if ($('.product-gallery__nav .gallery-cell').length <= 1) {
      const $carousel = $('.js-gallery-carousel');
      $carousel.flickity( 'remove', $('.gallery-cell', $carousel) );
      $carousel.flickity('destroy');
    }

    //Copy form data to modal
    $('.quick-shop__lightbox .js-notify-form').append($notifyForm);
    $('.quick-shop__lightbox .js-product-form').append($productForm);

    //Initiate selectCallback
    if($productForm.hasClass("product_form_options") && (!$productForm.hasClass("viewed"))) {
      //If form hasn't been viewed previously, run OptionSelectors function
      new Shopify.OptionSelectors($productForm.data("select-id"),
      {
        product: $productForm.data("product"),
        onVariantSelected: selectCallback,
        enableHistoryState: $productForm.data("enable-state")
      });
    } else {
      //If form has been previously viewed, just convert currencies
      if(Shopify.theme_settings.show_multiple_currencies) {
        convertCurrencies();
      }
    }

    //Link sold out options when there is more than one option available (eg. S is selected and Yellow option appears as sold out)
    if(Shopify.theme_settings.product_form_style == 'swatches') {
      const JSONData = $productForm.data('product');
      const productID = productData.section_id;
      const productSection = '.product-' + productID + ' .js-product_section';
      const swatchOptions = $productForm.find('.swatch_options .swatch');
      if (swatchOptions.length > 1){
        Shopify.linkOptionSelectors(JSONData, productSection);
      }
    }

    if($('.single-option-selector').length > 0) {
      $('.selector-wrapper').wrap('<div class="select"></div>');
      $('#product-form-'+productData.product_id+' .select-container')
        .children()
        .first()
        .removeClass('select')
        .addClass('select-container');
    }

    $('.js-quick-shop select[name="id"]').trigger('change');

  },
  createImageObjects($images) {
    //split image info
    const image_paths_alts = $images.split('~');

    //Create new array with image objects
    const imageArray = image_paths_alts.map(image => {
      var imageInfo = image.split('^');
      return {
        path: imageInfo[0],
        alt: imageInfo[1],
        id: imageInfo[2],
        width: imageInfo[3]
      }
    });

    return imageArray;
  },
  beforeOpen(productData) {

    //Add image elements before gallery is opened
    Shopify.theme.thumbnail.populateGallery(productData);

    $('.js-sale-sticker, .js-sold-out, .js-current-price, .js-was-price, .js-savings, .js-new-sticker, .js-pre-order-sticker').empty();
    $('.modal_price, .js-notify-form').show();

  },
  retrieveProductInfo(productData) {
    $.ajax({
      dataType: "json",
      async: false,
      cache: false,
      url: "/products/" + productData.handle + ".js",
      success: function(product) {
        //Create new object combining info
        product = $.extend({}, product, productData);

        globalQuickShopProduct = product;
        Shopify.theme.thumbnail.updateVariant(product.variants[0].id.toString(), product);

      }
    });
  },
  populateGallery(productData) {
    //Find gallery and carousel
    const $gallery = $('.js-gallery-modal');
    const $carousel = $('.js-gallery-carousel');

    //Add gallery images based on product info from API
    function addMainGalleryImages(){

      $.each( productData.image_array, function( i, image ){

        if (image.path == '') {
          var imgPath = productData.featured_image;
          var alt = '';
        } else {
          var imgPath = image.path;
          var alt = image.alt;
        }

        var img2048x2048 = imgPath.replace(/(\.[^.]*)$/, "_2048x2048$1").replace('http:', '');
        var cellContent;

        if (alt.indexOf("youtube") >= 0){
          cellContent = '<div class="video-container youtube"><div>' + alt + '</div></div>';
        } else if (alt.indexOf("vimeo") >= 0) {
          cellContent = '<div class="video-container vimeo"><div>' + alt + '</div></div>';
        } else {
          cellContent = `
            <div class="image__container" style="max-width: ${image.width}px">
              <img src="${imgPath}" alt="${alt}" data-image-id="${image.id}" data-index="${i}" />
            </div>
          `;
        }

        var $cellElems = $('<div class="gallery-cell">'+ cellContent +'</div>');
        $('.js-gallery-modal').append($cellElems);
      });

    }

    //Add carousel images based on product info from API
    function addCarouselGalleryImages(){
      $.each( productData.image_array, function( i, image ){

        if (image.path != '') {
          var imgPath = image.path;
          var carouselSizedImg = imgPath.replace(/(\.[^.]*)$/, "_grande$1").replace('http:', '');
        }

        var img = '<img src="'+ carouselSizedImg + '" alt="' + escape(image.alt) + '" />';
        var $carouselCellElems = $('<div class="gallery-cell">'+ img +'</div>');
        $carousel.append($carouselCellElems);
      });

      var groupCells = true;
      var navPrevNextButtons = false;
      var navCellAlign = "center";
      var navWrapAround = false;

      if ($('.product-gallery__nav .gallery-cell').length >= 5) {
        groupCells = false;
        navPrevNextButtons = true;
        navCellAlign = "left";
        navWrapAround = true;
      }

    }

    addMainGalleryImages();
    addCarouselGalleryImages();

    if($('.js-gallery-modal').data('zoom') === true) {
      $('.js-gallery-modal').find('img')
      .wrap('<span class="zoom-container"></span>')
      .css('display', 'block')
      .parent()
      .zoom({
        touch: false
      });
    }
  },
  updateVariant(variant) {
    if (globalQuickShopProduct != 'undefined'){

      var product = globalQuickShopProduct;

      $('.js-current-price').html('');
      $('.js-was-price').html('');
      $('.js-savings').html('');

      //Title and Vendor
      $('.js-product-title').html('<a href="'+ product.product_in_collection_url +'" title="'+ product.escaped_title +'">'+ product.title +'</a>');
      $('.js-product-vendor')
      .html('<a href="/collections/vendors?q=' + product.vendor +'">' + product.vendor + '</a>');

      //Product Description
      $('.js-full-description').html(product.full_description);
      $('.js-regular-description').html(product.regular_description);
      var productDetails = '<a href="'+ product.product_in_collection_url +'" class="secondary_button" title="'+ product.escaped_title +' Details">'+ product.details_text +'</a>';
      $('.js-product-details').html(productDetails);

      //Collection stickers
      if(Shopify.theme_settings.stickers_enabled) {
        $.each( product.collection_handles, function( value, index ) {
          switch(this.toString()) {
            case 'best-seller':
              $('.best-seller-sticker span').html(Shopify.translation.best_seller).parent().removeClass('is-hidden');
              break;
            case 'coming-soon':
              $('.coming-soon-sticker span').html(Shopify.translation.coming_soon).parent().removeClass('is-hidden');
              break;
            case 'new':
              $('.new-sticker span').html(Shopify.translation.new).parent().removeClass('is-hidden');
              break;
            case 'pre-order':
              $('.pre-order-sticker span').html(Shopify.translation.pre_order).parent().removeClass('is-hidden');
              break;
            case 'staff-pick':
              $('.staff-pick-sticker span').html(Shopify.translation.staff_pick).parent().removeClass('is-hidden');
          }
        });
      }

      function getQuickShopInfo(variant) {
        if (variant.id == variant.id.toString()){
          //Sale sticker
          if(Shopify.theme_settings.stickers_enabled) {
            if (variant.compare_at_price > variant.price){
              $('.sale-sticker span').html(Shopify.translation.sale).parent().removeClass('is-hidden');
            }
          }

          //Sale
          if (variant.compare_at_price > variant.price) {
            $('.js-current-price').addClass('sale');
          } else {
            $('.js-current-price').removeClass('sale');
          }

          //Availability
          if (variant.available == false){
            if (product.collection_handles.indexOf('coming-soon') != -1) {
              // If product tags includes 'coming-soon', replace with Coming soon text
              if (!Shopify.theme_settings.stickers_enabled) {
                // Only show Coming soon text if stickers are disabled
                $('.js-sold-out').html(Shopify.translation.coming_soon);
              }
            } else {
              $('.js-sold-out').html(Shopify.translation.sold_out);
            }
          } else {
            $('.js-sold-out').html('');
          }

          //Price
          if (variant.available == true) {
            $('.js-notify-form').hide();

            if (variant.compare_at_price > variant.price) {
              $('.js-was-price').html('<span class="money">' + Shopify.formatMoney(variant.compare_at_price, product.money_format) + '</span>');
              $('.js-savings').html(Shopify.translation.savings + ' ' + parseInt(((variant.compare_at_price - variant.price) * 100) / variant.compare_at_price) + '% (' + '<span class="money">' + Shopify.formatMoney(variant.compare_at_price - variant.price, product.money_format) + '</span>)');
            }

            if (product.price == Shopify.translation.coming_soon){
              $('.js-current-price').html(Shopify.translation.coming_soon);
            } else if (variant.price) {
              $('.js-current-price').html('<span class="money">' + Shopify.formatMoney(variant.price, product.money_format) + '</span>');
            } else {
              $('.js-current-price').html(Shopify.translation.free_price_text);
            }

            if (Shopify.theme_settings.show_multiple_currencies) {
              convertCurrencies();
            }
          } else {
            $('.js-notify-form').show();
          }
        }

      }

      if (product.single_variant == 'true') {
        getQuickShopInfo(product);
      } else {
        for (var i = 0; i < product.variants.length; i++) {
          getQuickShopInfo(product.variants[i]);
        }
      }
    }
  }
}
