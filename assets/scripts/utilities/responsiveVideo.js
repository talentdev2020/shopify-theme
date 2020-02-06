Shopify.theme.responsiveVideo = {
  init: function() {

    // Checks for YouTube iframes
    $('iframe[src*="youtube"]').each(function() {
      // Does not select iframes added through the video section/block
      if (this.closest('.lazyvideo')) {
        return;
      } else {
        let vendor = 'youtube';
        Shopify.theme.responsiveVideo.getVideoElements(this, vendor);
      }
    })

    // Checks for Vimeo iframes
    $('iframe[src*="vimeo"]').each(function() {
      // Does not select iframes added through the video section/block
      if (this.closest('.lazyvideo')) {
        return;
      } else {
        let vendor = 'vimeo';
        Shopify.theme.responsiveVideo.getVideoElements(this, vendor);
      }
    })

  },
  getVideoElements: function(video, vendor) {
    let src = video.src;
    this.enable(video, src, vendor);
  },
  enable: function(video, src, vendor) {
    const $videoParent = $(video).parents('.lazyframe');

    // Only wraps with parent lazyframe class if it doesn't already exist 
    if ($videoParent.length < 1 ) {
      $(video).wrap(`<div class="lazyframe lazyframe--embedded-video" data-src="${src}" data-vendor="${vendor}"></div>`);
    }

    lazyframe('.lazyframe--embedded-video');
  }
}
