(function() {
  var Image;

  Image = (function() {
    /**
    * A data structure to facilitate dealing with raw pixel access etc.
    * Pass in a 2d Array of image data and a color format
    *
    * @param  {Object}      @userConfig     a Canvas id in the DOM
    * @param  {Function}    cb              Function to call on completion
    *
    */

    function Image(userConfig, cb) {
      this.userConfig = userConfig;
      if (this.constructor === "Image") {
        cb(new Error("Cannot Directly Call Pure Virtual Constructor"), null);
      }
    }

    Image.prototype.setPixel = function() {};

    Image.prototype.Get2dMaxMin = function() {};

    Image.prototype.MakeBoundingBoxOnChar = function() {};

    return Image;

  })();

  module.exports = Image;

}).call(this);
