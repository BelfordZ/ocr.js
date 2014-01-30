(function() {
  var Image;

  Image = (function() {
    function Image(ImageData) {
      this.ImageData = ImageData;
      this.buffer = new Uint8ClampedArray(this.ImageData.data);
      this.height = this.ImageData.height;
      this.width = this.ImageData.width;
    }

    Image.prototype.toImageData = function() {
      return {
        height: this.height,
        width: this.width,
        data: this.buffer
      };
    };

    Image.prototype.make1dIndex = function(h, w) {
      console.log((h * this.width * 4) + (w * 4));
      return (h * this.width * 4) + (w * 4);
    };

    Image.prototype.setPixel = function(h, w, color, value) {
      var c, i, index, _i, _len, _results;
      index = this.make1dIndex(h, w);
      if (typeof color === "number") {
        return this.buffer[index + color] = value;
      } else {
        if (typeof color === "object" && color.length !== void 0) {
          _results = [];
          for (i = _i = 0, _len = color.length; _i < _len; i = ++_i) {
            c = color[i];
            _results.push(this.buffer[index + i] = c);
          }
          return _results;
        }
      }
    };

    Image.prototype.Get2dMaxMin = function() {};

    Image.prototype.MakeBoundingBoxOnChar = function() {};

    return Image;

  })();

  module.exports = Image;

}).call(this);
