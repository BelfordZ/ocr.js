(function() {
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

}).call(this);
