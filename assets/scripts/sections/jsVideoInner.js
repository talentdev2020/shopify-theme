Shopify.theme.jsVideoInner = {
  init: function ($section) {
    // Add settings from schema to current object
    Shopify.theme.jsVideoInner = $.extend(this, Shopify.theme.getSectionData($section));

    // Selectors
    const $videoElement = $section.find('[data-video-element]');

    // Checks whether YouTube/Vimeo (iframe) or HTML5 video
    if (this.iframe_video) {
      this.loadIframeVideoInner($videoElement);
    } else if (this.html5_video) {
      this.loadHTML5VideoInner($videoElement);
    }

  },
  loadIframeVideoInner: function($video) {
    // Get video type (Youtube or Vimeo)
    const videoType = this.video_type;

    // Set up autoplay and autoloop variables
    const autoplay = this.autoplay ? 1 : 0;
    const autoloop =  this.autoloop ? 1 : 0;

    // Get the source of the video
    let src;
    if (videoType == 'youtube') {
      src = `https://www.youtube.com/embed/${this.video_id}?&autoplay=${autoplay}&loop=${autoloop}&playlist=${this.video_id}`
    } else {
      src = `https://player.vimeo.com/video/${this.video_id}?autoplay=${autoplay}&loop=${autoloop}`
    }

    // Set up element specific options
    let videoOptions = {
      src: src,
      initinview: this.autoplay ? true : false,
      ratio: this.aspect_ratio
    }

    // Set data attributes on video element using videoOptions
    Object.keys(videoOptions).forEach(key => {
      let value = videoOptions[key];
      $video.attr(`data-${key}`, value);
    })

    // Call lazyframe library to load video
    lazyframe($video, {
      onAppend: () => {
        if ($video.find('iframe').length > 1) {
          $($video.find('iframe').first().remove());
        }
      }
    });

  },
  loadHTML5VideoInner: function($video) {

    // Set up autoplay and autoloop variables
    const autoplay = this.autoplay ? 'autoplay muted' : false
    const autoloop = this.autoloop ? 'loop' : false
    const videoType = this.html5_video.indexOf('mp4') !== -1 ? 'mp4' : 'ogg';

    // Set attributes on video element
    $video.attr('autoplay', autoplay);
    $video.attr('loop', autoloop);
    $video.find('source').attr('type', `video/${videoType}`);

  }
}
