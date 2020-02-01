Shopify.theme.jsNewsletter = {
    init: function($section) {
        let newsletterCookie = Cookies.get('newsletter-section');
        if (newsletterCookie !== 'submitted') {
            $('body').addClass('newsletter-section--visible');
            $('body').removeClass('newsletter-section----hidden');
        } else {
            $('body').addClass('newsletter-section----hidden');
            $('body').removeClass('newsletter-section--visible');
        }
    }
  }