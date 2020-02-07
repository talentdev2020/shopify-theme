Shopify.theme.jsAccounts = {
  init: function($section){

    $('.js-recover-password').on('click', function(){
      $('#login').hide();
      $('.login__image__element').hide();
      $('.reset__image__element').show();
      $('#recover').show();
    });

    $('.cancel-recover-password').on('click', function(){
      $('#recover').hide();
      $('.reset__image__element').hide();
      $('.login__image__element').show();
      $('#login').show();
    })

  },

  unload: function($section) {
    $('.js-recover-password').off();
    $('.cancel-recover-password').off();
  }
}
