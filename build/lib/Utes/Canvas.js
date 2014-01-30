(function() {
  var Canvas;

  Canvas = (function() {
    function Canvas(id) {
      this.domElement = $(document.getElementById(id));
      this.canvasElement = this.domElement[0];
      this.height = this.domElement.height();
      this.width = this.domElement.width();
      this.context = this.canvasElement.getContext("2d");
      this.context.imageSmoothingEnabled = false;
      this.context.webkitImageSmoothingEnabled = false;
      this.context.mozImageSmoothingEnabled = false;
    }

    Canvas.prototype.readImageData = function() {
      return this.context.getImageData(0, 0, this.height, this.width);
    };

    Canvas.prototype.writeImageData = function(inputImageData) {
      var i, imageDataBuffer, val, _i, _len, _ref;
      imageDataBuffer = this.context.createImageData(inputImageData.height, inputImageData.width);
      _ref = inputImageData.data;
      for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
        val = _ref[i];
        imageDataBuffer.data[i] = val;
      }
      return this.context.putImageData(imageDataBuffer, 0, 0);
    };

    Canvas.prototype.renderChar = function(character, font, size) {};

    return Canvas;

  })();

  module.exports = Canvas;

}).call(this);
