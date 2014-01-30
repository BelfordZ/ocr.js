(function() {
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

}).call(this);
