"use strict";

Shopify.theme.jsVideoInner = {
  init: function init($section) {
    // Add settings from schema to current object
    Shopify.theme.jsVideoInner = $.extend(this, Shopify.theme.getSectionData($section)); // Selectors

    var $videoElement = $section.find('[data-video-element]'); // Checks whether YouTube/Vimeo (iframe) or HTML5 video

    if (this.iframe_video) {
      this.loadIframeVideoInner($videoElement);
    } else if (this.html5_video) {
      this.loadHTML5VideoInner($videoElement);
    }
  },
  loadIframeVideoInner: function loadIframeVideoInner($video) {
    // Get video type (Youtube or Vimeo)
    var videoType = this.video_type; // Set up autoplay and autoloop variables

    var autoplay = this.autoplay ? 1 : 0;
    var autoloop = this.autoloop ? 1 : 0; // Get the source of the video

    var src;

    if (videoType == 'youtube') {
      src = "https://www.youtube.com/embed/".concat(this.video_id, "?&autoplay=").concat(autoplay, "&loop=").concat(autoloop, "&playlist=").concat(this.video_id);
    } else {
      src = "https://player.vimeo.com/video/".concat(this.video_id, "?autoplay=").concat(autoplay, "&loop=").concat(autoloop);
    } // Set up element specific options


    var videoOptions = {
      src: src,
      initinview: this.autoplay ? true : false,
      ratio: this.aspect_ratio
    }; // Set data attributes on video element using videoOptions

    Object.keys(videoOptions).forEach(function (key) {
      var value = videoOptions[key];
      $video.attr("data-".concat(key), value);
    }); // Call lazyframe library to load video

    lazyframe($video, {
      onAppend: function onAppend() {
        if ($video.find('iframe').length > 1) {
          $($video.find('iframe').first().remove());
        }
      }
    });
  },
  loadHTML5VideoInner: function loadHTML5VideoInner($video) {
    // Set up autoplay and autoloop variables
    var autoplay = this.autoplay ? 'autoplay muted' : false;
    var autoloop = this.autoloop ? 'loop' : false;
    var videoType = this.html5_video.indexOf('mp4') !== -1 ? 'mp4' : 'ogg'; // Set attributes on video element

    $video.attr('autoplay', autoplay);
    $video.attr('loop', autoloop);
    $video.find('source').attr('type', "video/".concat(videoType));
  }
};