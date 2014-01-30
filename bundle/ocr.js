(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
var FeatureExtraction;

FeatureExtraction = (function() {
  function FeatureExtraction() {}

  FeatureExtraction.prototype.projectionCount = function() {};

  FeatureExtraction.prototype.contourSampling = function() {};

  return FeatureExtraction;

})();

module.exports = FeatureExtraction;


},{}],2:[function(require,module,exports){
"use strict";
var FeatureExtraction, ProjectionCount,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

FeatureExtraction = require("./FeatureExtraction.coffee");

ProjectionCount = (function(_super) {
  __extends(ProjectionCount, _super);

  function ProjectionCount(binarizedImg) {
    ProjectionCount.__super__.constructor.call(this, binarizedImg);
  }

  return ProjectionCount;

})(FeatureExtraction);

module.exports = ProjectionCount;


},{"./FeatureExtraction.coffee":1}],3:[function(require,module,exports){
"use strict";
var BinaryImg, Img,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Img = require("./Img.coffee");

BinaryImg = (function(_super) {
  __extends(BinaryImg, _super);

  function BinaryImg(cb) {
    BinaryImg.__super__.constructor.call(this, this.image, function() {});
  }

  return BinaryImg;

})(Img);

module.exports = BinaryImg;


},{"./Img.coffee":4}],4:[function(require,module,exports){
"use strict";
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


},{}],5:[function(require,module,exports){
"use strict";
var Img, RgbImg,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Img = require("./Img.coffee");

RgbImg = (function(_super) {
  __extends(RgbImg, _super);

  function RgbImg(image, cb) {
    this.image = image;
    RgbImg.__super__.constructor.call(this, this.image, function() {});
  }

  return RgbImg;

})(Img);

module.exports = RgbImg;


},{"./Img.coffee":4}],6:[function(require,module,exports){
"use strict";
var Ann;

Ann = (function() {
  function Ann() {}

  Ann.prototype.guess = function() {};

  Ann.prototype._setDataSource = function() {};

  Ann.prototype._setData = function() {};

  Ann.prototype._getData = function() {};

  return Ann;

})();

module.exports = Ann;


},{}],7:[function(require,module,exports){
"use strict";
var TestCase, Utes;

Utes = require("../Utes/index.coffee");

TestCase = (function() {
  function TestCase(numOfInputs, max, min) {
    this.numOfInputs = numOfInputs;
    this.max = max;
    this.min = min;
  }

  TestCase.prototype.normalize = function() {
    this.input = Utes.normalize(this.input, this.min, this.max);
    if (this.output !== void 0) {
      return this.output = Utes.Transforms.normalize(this.output);
    }
  };

  return TestCase;

})();

module.exports = TestCase;


},{"../Utes/index.coffee":12}],8:[function(require,module,exports){
"use strict";
var Trainer;

Trainer = (function() {
  function Trainer(ann, trainingSet) {
    this.ann = ann;
    this.trainingSet = trainingSet != null ? trainingSet : [];
  }

  Trainer.prototype.addTestCase = function(input, output) {
    return this.trainingSet.push({
      input: input,
      output: output
    });
  };

  Trainer.prototype.run = function() {
    return this.ann.train(this.trainingSet, {
      errorTresh: 0.0001,
      iterations: 5000,
      log: true,
      logPeriod: 10
    });
  };

  return Trainer;

})();

module.exports = Trainer;


},{}],9:[function(require,module,exports){
"use strict";
var Canvas;

Canvas = (function() {
  function Canvas(id) {
    this.id = id;
    this.element = document.getElementById(this.id);
    this.height = this.element.height;
    this.width = this.element.width;
    this.context = this.element.getContext("2d");
  }

  Canvas.prototype.readImage = function() {
    return this.context.getImageData(0, 0, this.height, this.width);
  };

  Canvas.prototype.writeImage = function(img) {};

  Canvas.prototype.renderChar = function(character, font, size) {};

  return Canvas;

})();

module.exports = Canvas;


},{}],10:[function(require,module,exports){
"use strict";
var ImageOps;

ImageOps = (function() {
  function ImageOps() {}

  ImageOps.prototype.MakeBoundingBoxOnChar = function() {};

  return ImageOps;

})();

module.exports = ImageOps;


},{}],11:[function(require,module,exports){
"use strict";
var AsciiToCharNumber, CharNumberToAscii, greyScaleToRgb, normalize;

AsciiToCharNumber = function(ascii) {
  if (ascii < 91 && ascii > 64) {
    ascii -= 65;
  }
  if (ascii > 90 && ascii < 123) {
    ascii -= 97;
  }
  return ascii;
};

CharNumberToAscii = function(charNum) {
  if (charNum <= 26 && charNum > 0) {
    charNum += 65;
  }
  if (charNum > 26 && charNum <= 52) {
    charNum += 97;
  }
  return charNum;
};

greyScaleToRgb = function() {
  return r * 0.2989 + g * 0.5870 + b * 0.1140;
};

normalize = function(val, min, max) {
  return (val - min) / max;
};

module.exports = {
  normalizedCharCode: AsciiToCharNumber,
  normalizedCharFromCode: CharNumberToAscii,
  normalize: normalize
};


},{}],12:[function(require,module,exports){
module.exports = {
  Canvas: require("./Canvas.coffee"),
  ImageOps: require("./ImageOps.coffee"),
  Transforms: require("./Transforms.coffee")
};


},{"./Canvas.coffee":9,"./ImageOps.coffee":10,"./Transforms.coffee":11}],13:[function(require,module,exports){
"use strict";
var OCR, Utes, exports;

Utes = require("./Utes/index.coffee");

OCR = (function() {
  OCR.prototype._segments = void 0;

  OCR.prototype._features = void 0;

  OCR.prototype._results = [];

  function OCR(canvasId) {
    this.canvasId = canvasId;
    this.canvas = Utes.Canvas(this.canvasId);
    console.log(this.canvas.readImage());
  }


  /**
   * Returns a new Image object who forms a bounding box around a single character
   * @param  {Image}      Image object containing 1 or more characters
   * @return {[Image]}    Array of Image Objects, each bounded by the size of the character.
   */

  OCR.prototype.segment = function() {};

  OCR.prototype.extractFeatures = function() {};


  /**
   * Given a feature set, will use a specified technique for classification. The default is neural network
   * @return {[type]}
   */

  OCR.prototype.classify = function() {};


  /**
  * Runs the the @imageObj the engine, and returns a sequence of characters
  * @return {String}      Returns the string found in the image
   */

  OCR.prototype.run = function() {
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

  return OCR;

})();

exports = OCR;


},{"./Utes/index.coffee":12}]},{},[1,2,3,4,5,6,7,8,9,10,11,12,13])
