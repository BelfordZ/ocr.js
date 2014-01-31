(function() {
  var Canvas;

  Canvas = (function() {
    function Canvas(id) {
      var _this = this;
      this.domElement = document.getElementById(id);
      this.jQueryDomElement = $(this.domElement);
      this.canvasElement = this.jQueryDomElement[0];
      this.height = this.jQueryDomElement.height();
      this.width = this.jQueryDomElement.width();
      this.context = this.canvasElement.getContext("2d");
      this.ratio = (function() {
        var bsr, dpr;
        dpr = window.devicePixelRatio || 1;
        bsr = _this.context.webkitBackingStorePixelRatio || _this.context.mozBackingStorePixelRatio || _this.context.msBackingStorePixelRatio || _this.context.oBackingStorePixelRatio || _this.context.backingStorePixelRatio || 1;
        return dpr / bsr;
      })();
      this.canvasElement.width = this.width * this.ratio;
      this.canvasElement.height = this.height * this.ratio;
      this.context.setTransform(this.ratio, 0, 0, this.ratio, 0, 0);
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

    Canvas.prototype.deconstructor = function() {
      return document.body.removeChild(this.domElement);
    };

    Canvas.prototype.renderCharacter = function(character, font, size) {
      this.context.font = "" + size + "px " + font;
      this.context.textBaseline = "top";
      this.context.fillStyle = "black";
      return this.context.fillText(character, 0, 0);
    };

    return Canvas;

  })();

  module.exports = Canvas;

}).call(this);
