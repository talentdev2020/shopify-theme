Shopify.theme.predictiveSearch = {
  init: function() {

    // Clear inputs on load
    $('.search-form input#q').val('')

    // On entering text
    $('.search-form input#q').on('keyup', function(){

      let currentAjaxRequest = null;
      let queryText = $(this).val();
      let inputField = $(this);
      let searchURL;

      // Create the URLs to query
      if (Shopify.theme_settings.search_option == 'products') {
        searchURL = `${$('body').data('shop-url')}/search?type=product&q=${encodeURI(queryText)}`;
      } else {
        searchURL = `${$('body').data('shop-url')}/search?q=${encodeURI(queryText)}`;
      }

      //Submit wildcard searches
      $('.search-form').on('submit', function(e){
        var cleanFormValue = encodeURI(queryText);

        e.preventDefault();

        if (cleanFormValue == null) {
          window.parent.location.href = '/search'; 
        } else {
          window.parent.location.href = `${searchURL}*`;
        }
      });

      if (queryText == '') {
        $(this).find('.predictive-results').empty().css('opacity', 0);
      }

      // Predicitive loop
      if (queryText.length > 3) {

        if (currentAjaxRequest != null) currentAjaxRequest.abort();

        // Ajax call
        currentAjaxRequest = $.getJSON(searchURL +'*&view=json', function(data) {
          // Get results and display them
          Shopify.theme.predictiveSearch.displayResults(data.results, searchURL, queryText, inputField);
        })
      } else {
        $('.search-form').find('.predictive-results').empty().css('opacity', 0);
      }
    });

    // Clicking outside makes the results disappear.
    $(document).on('click', function(e){
      const $container = $('.search-form input#q');
      if (!$container.is(e.target) && $container.has(e.target).length === 0) {
        $('.predictive-results').css('opacity', 0).empty();
      }
    });
  },
  displayResults: function(results, searchURL, queryText, inputField) {
    const resultList = inputField.parents('.search-form').find('.predictive-results');

    // Clear out list and make it visible
    resultList.empty().css('opacity', 1);

    if (results.length > 0) {
      // Loop through results
      for (let i = 0; i < Shopify.theme_settings.search_to_display; i++) {

        if (results[i] != null) {

          const result = results[i];
          let resultInfo;
          let resultPrice;
          let resultImage;

          // Determine result type
          if (result.object_type == 'product') {

            if (result.available == true) {
              // If free display text instead of value
              if (result.raw_price == 0) {
                resultPrice = Shopify.translation.free;
              } else {
                resultPrice = result.price;
              }
            } else {
              resultPrice = Shopify.translation.sold_out;
            }


            // If product is on sale
            if (result.raw_compare > result.raw_price) {
              resultInfo = `
              <span class='money'>${resultPrice}</span>
              <span class='product-thumbnail__was-price was-price'>
                <span class='money'>${result.compare}</span>
              </span>`
            } else {
              resultInfo = `<span class='money'>${resultPrice}</span>`
            }

          } else {
            resultInfo = `<span>${result.text_content}`;
          }

          // If result has image
          if (result.thumbnail != '') {
            resultImage = `<img class='lazyload transition--${Shopify.theme_settings.image_loading_style} result-image' src='${result.thumbnail}' alt='${result.title}'>`;
          } else {
            resultImage = ''
          }

          // Append result
          resultList.append(`
          <li>
            <a class='result-link' href='${result.url}'>
              ${resultImage}
              <div class='result-info'>
                <p>${result.title}</p>
                ${resultInfo}
              </div>
            </a>
          </li>
          `);
        }
      }

      // Display view all link
      if (results.length > Shopify.theme_settings.search_to_display) {
        resultList.append(`<li><a class='result-link' href='${searchURL}*'>${Shopify.translation.all_results}</a></li>`);
      }

    } else {
      resultList.append(`<li>${Shopify.translation.no_results}</li>`);
    }
  },
  unload: function() {
    $('.search-form').off();
    $('.search-form input#q').off();
  }
}
