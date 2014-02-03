(function() {
  var Canvas, DataGenerator;

  Canvas = require("./Canvas.coffee");

  DataGenerator = (function() {
    var _canvas;

    function DataGenerator(source) {
      this.fonts = new Array(10);
      this.sizes = new Array(10);
    }

    DataGenerator.prototype.addFont = function(font) {
      return this.fonts.push(font);
    };

    DataGenerator.prototype.removeFont = function(font) {
      return this.fonts.indexOf(font);
    };

    DataGenerator.prototype.addSize = function(size) {
      return this.sizes.push(size);
    };

    DataGenerator.prototype.removeSize = function(size) {
      return this.sizes.indexOf(size);
    };

    addCharacter;

    _canvas = function() {
      var canvas, jqTmp, tmpCanvas;
      tmpCanvas = document.createElement("canvas");
      jqTmp = $(tmpCanvas);
      jqTmp.addClass("renderFrame");
      tmpCanvas.id = "tmp";
      $("body").append(jqTmp);
      canvas = new Canvas("tmp");
      return canvas.renderCharacter(chars, "arial", 32);
    };

    boundingBox;

    return DataGenerator;

  })();

  module.exports = DataGenerator;

}).call(this);
