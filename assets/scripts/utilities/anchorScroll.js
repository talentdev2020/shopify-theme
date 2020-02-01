Shopify.theme.anchorScroll = {
  init: function() {

    let $tabs = $('.anchor__scroll li a');

    $tabs.on('click', function(el){
      el.preventDefault();

      // toggle active tab
      $tabs.parent().removeClass('is-active active');
      $(this).parent().addClass('is-active');

      let anchor = $(this).attr('href');

      if ($(anchor).data('popup')) {
        $('.product_section .shopify-section').each(function(){
          if (!$(this).find('section').data('popup')) {
            $(this).css('display', 'none');
          }
        });
        $(anchor).css('display', 'block');
      } else {
        $('.product_section .shopify-section').each(function(){
          if (!$(this).find('section').data('popup')) {
            $(this).css('display', 'block');
          } else {
            $(this).find('section').css('display', 'none');
          }
        });
      }
      $('html,body').animate({scrollTop: $(anchor).offset().top - 200},'slow');

    });
  },
  unload: function() {
    $('.anchor__scroll li a').off();
  }
}
