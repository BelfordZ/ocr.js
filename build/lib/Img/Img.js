(function() {
  var Img;

  Img = (function() {
    /**
    * A data structure to facilitate dealing with raw pixel access etc.
    * Pass in a 2d Array of image data and a color format
    *
    * @param  {Object}      @userConfig     a Canvas id in the DOM
    * @param  {Function}    cb              Function to call on completion
    *
    */

    function Img(userConfig, cb) {
      this.userConfig = userConfig;
      if (this.constructor === "Image") {
        cb(new Error("Cannot Directly Call Pure Virtual Constructor"), null);
      }
    }

    Img.prototype.setPixel = function() {};

    Img.prototype.Get2dMaxMin = function() {};

    Img.prototype.MakeBoundingBoxOnChar = function() {};

    return Img;

  })();

  module.exports = Img;

}).call(this);
