(function() {
  var BinaryImg, Img,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Img = require("./Image.coffee");

  BinaryImg = (function(_super) {
    __extends(BinaryImg, _super);

    function BinaryImg(cb) {
      BinaryImg.__super__.constructor.call(this, this.image, function() {});
    }

    return BinaryImg;

  })(Image);

  module.exports = BinaryImg;

}).call(this);
