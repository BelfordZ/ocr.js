(function() {
  var Canvas;

  Canvas = require("./Canvas.coffee");

  ({
    MakeBoundingBoxOnChar: function() {},
    generateImageDataForCharacter: function(chars) {
      var input, tmpCanvas;
      switch (typeof chars) {
        case "string":
          input = [chars];
          break;
        case "number":
          input = ["" + chars];
          break;
        case "object" && chars instanceof Array:
          input = chars;
          break;
        default:
          return new Error("Input must be a string, or an array of strings");
      }
      tmpCanvas = document.createElement("canvas");
      tmpCanvas.id = "tmp";
      tmpCanvas.height = "400";
      tmpCanvas.width = "400";
      return $("body").append(tmpCanvas);
    }
  });

  module.exports = {
    MakeBoundingBoxOnChar: MakeBoundingBoxOnChar,
    generateImageDataForCharacter: generateImageDataForCharacter
  };

}).call(this);
