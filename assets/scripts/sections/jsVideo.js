Shopify.theme.jsVideo = {
  init: function ($section) {

    // Add settings from schema to current object
    Shopify.theme.jsVideo = $.extend(this, Shopify.theme.getSectionData($section));

    // Selectors
    const $videoElement = $section.find('[data-video-element]');
    const $playButton = $section.find('[data-play-button]');
    const $videoTextContainer = $section.find('[data-video-text-container]');

    // Checks whether YouTube/Vimeo (iframe) or HTML5 video
    if (this.iframe_video) {
      this.loadIframeVideo($videoElement, $playButton, $videoTextContainer);
    } else if (this.html5_video) {
      this.loadHTML5Video($videoElement, $playButton, $videoTextContainer);
    }

  },
  loadIframeVideo: function($video, $playButton, $videoTextContainer) {

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

    // Set poster image if it exists
    if (this.poster) {
      $video.css('background-image', `url(${this.poster})`);
      $video.addClass('poster-enabled');
    }

    /* If button exists, hide text and poster
     * Note: Autoplay won't work with YouTube iframe videos
     */
    if (this.button) {
      $playButton.on('click', () =>  {
        this.hideTextOnVideo($videoTextContainer);
        this.hidePoster();
      })
    }

    // Clicking anywhere on video should play the video
    if (!this.button) {
      $videoTextContainer.on('click', () => {
        this.hideTextOnVideo($videoTextContainer);
        this.hidePoster();
      })
    }

    // If autoplay is true, hide text and poster
    this.isAutoplayEnabled($videoTextContainer);

  },
  loadHTML5Video: function($video, $playButton, $videoTextContainer) {

    // Set up autoplay and autoloop variables
    const autoplay = this.autoplay ? 'autoplay muted' : false
    const autoloop = this.autoloop ? 'loop' : false
    const videoType = this.html5_video.indexOf('mp4') !== -1 ? 'mp4' : 'ogg';

    // Set attributes on video element
    $video.attr('autoplay', autoplay);
    $video.attr('loop', autoloop);
    $video.find('source').attr('type', `video/${videoType}`);

    // Set poster image if it exists
    if (this.poster) {
      $video.attr('poster', this.poster);
    }

    // If button exists, click to play video and hide text
    if (this.button) {
      $playButton.on('click', () => {
        this.hideTextOnVideo($videoTextContainer);
        this.hidePoster();
        $video.get(0).play();
      })
    }

    // Clicking anywhere on video should play the video
    if (!this.button) {
      $videoTextContainer.on('click', () => {
        this.hideTextOnVideo($videoTextContainer);
        this.hidePoster();
        $video.get(0).play();
      })
    }

    // If autoplay is true, hide text and poster
    this.isAutoplayEnabled($videoTextContainer);

  },
  isAutoplayEnabled: function($videoTextContainer) {
    if (this.autoplay) {
      Shopify.theme.jsVideo.hideTextOnVideo($videoTextContainer);
      Shopify.theme.jsVideo.hidePoster();
    }
  },
  hidePoster: function() {

    // Get video element
    const $videoElement = $(`.video-${this.id}`);
    if ($videoElement.hasClass('poster-enabled')) {
      $videoElement.removeClass('poster-enabled');
    } else {
      $videoElement.attr('poster', null)
    }

  },
  hideTextOnVideo: function($videoTextContainer) {
    $videoTextContainer.hide();
  },
  unload: function($section) {
    const $playButton = $section.find('[data-play-button]');
    const $videoTextContainer = $section.find('[data-video-text-container]');

    $playButton.off();
    $videoTextContainer.off();
  }
}
