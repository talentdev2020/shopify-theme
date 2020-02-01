Shopify.theme.jsRecommendedProducts = {
  init: function($section) {

    // Add settings from schema to current object
    Shopify.theme.jsRecommendedProducts = $.extend(this, Shopify.theme.getSectionData($section));

    // Selectors
    const $productRecommendations = $section.find('.product-recommendations');
    const $productRecommendationsContainer = $('[data-product-recommendations-container]');
    const $productRecommendationsBlock = $productRecommendationsContainer.closest('.block__recommended-products');

    // Hides product recommendations based on settings
    if (this.show_product_recommendations === false) {
      $productRecommendationsBlock.hide();
      return;
    }

    $('.recommended-products-section').show();
    $productRecommendationsBlock.show();

    const productId = $productRecommendations[0].dataset.productId;
    const limit = $productRecommendations[0].dataset.limit;
    const sectionEnabled = $productRecommendations[0].dataset.enabled;

    // If showing custom collection we do not want to build request url
    if (this.show_custom_collection) {
      this.showCustomCollection($section);
      return;
    }

    // Build request URL
    const requestUrl = "/recommendations/products?section_id=product__recommendations&limit="+limit+"&product_id="+productId;

    // Create request and submit it using Ajax
    const request = new XMLHttpRequest();
    request.open("GET", requestUrl);
    request.onload = function() {
      if (request.status >= 200 && request.status < 300) {
        if (!sectionEnabled) {
          $productRecommendationsContainer.empty();
          return;
        }

        const $recommendedProductsElement = $(request.response).find('.product-recommendations').html();
        $productRecommendationsContainer.html($recommendedProductsElement);
        $('.recommended-products-section').hide();
        Shopify.theme.jsProduct.relatedProducts();
        const $product = $productRecommendationsContainer.find('.thumbnail');
        if ($product.length === 0) {
          $productRecommendationsBlock.hide();
        }

        if (Currency.show_multiple_currencies) {
          convertCurrencies();
        }
      }
    }
    request.send();


  },
  showCustomCollection: function($section) {
    const $recommendedProductsElement = $section.find('.product-recommendations').html();
    const $productRecommendationsContainer = $('[data-product-recommendations-container]');
    $productRecommendationsContainer.html($recommendedProductsElement);
    $('.recommended-products-section').hide();
    Shopify.theme.jsProduct.relatedProducts();
  },
  unload: function($section) {
  }
}
