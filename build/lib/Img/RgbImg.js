(function() {
  var Img, RgbImg,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Img = require("./Image.coffee");

  RgbImg = (function(_super) {
    __extends(RgbImg, _super);

    function RgbImg(image, cb) {
      this.image = image;
      RgbImg.__super__.constructor.call(this, this.image, function() {});
    }

    return RgbImg;

  })(Image);

  module.exports = RgbImg;

}).call(this);
