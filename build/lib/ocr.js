(function() {
  var Image, Ocr, Trainer, Utes, _;

  _ = require("underscore");

  Utes = require("./Utes/index.coffee");

  Image = require("./image/Image.coffee");

  Trainer = require("./NeuralNetwork/Trainer.coffee");

  Ocr = (function() {
    Ocr.prototype._segments = void 0;

    Ocr.prototype._features = void 0;

    Ocr.prototype._results = [];

    function Ocr(canvasId, opts) {
      var a;
      this.opts = opts;
      this.canvas = new Utes.Canvas(canvasId);
      this.rawImage = new Image(this.canvas.readImageData());
      a = this.rawImage.toImageData();
      this.canvas.writeImageData(a);
      Utes.ImageOps.generateImageDataForCharacter("b");
    }

    /**
     * Returns a new Image object who forms a bounding box around a single character
     * @param  {Image}      Image object containing 1 or more characters
     * @return {[Image]}    Array of Image Objects, each bounded by the size of the character.
    */


    Ocr.prototype.segment = function() {
      var _base, _base1;
      if (typeof (_base = this.opts).beforeSegment === "function") {
        _base.beforeSegment(this);
      }
      return typeof (_base1 = this.opts).afterSegment === "function" ? _base1.afterSegment(this) : void 0;
    };

    Ocr.prototype.extractFeatures = function() {};

    /**
     * Given a feature set, will use a specified technique for classification. The default is neural network
     * @return {[type]}
    */


    Ocr.prototype.classify = function() {};

    /**
    * Runs the the @imageObj the engine, and returns a sequence of characters
    * @return {String}      Returns the string found in the image
    */


    Ocr.prototype.run = function() {
      var i, segment, _i, _len, _ref;
      this._segments = this.segment(this.imageObj);
      _ref = this._segments;
      for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
        segment = _ref[i];
        this._features.push(this.extractFeatures());
      }
      this.classify(this._segments, this._features);
      return this.resultingString;
    };

    return Ocr;

  })();

  /*
    Class Methods
  */


  Ocr.Trainer = Trainer;

  module.exports = Ocr;

}).call(this);
