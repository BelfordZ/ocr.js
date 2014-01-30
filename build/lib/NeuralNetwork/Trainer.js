(function() {
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

}).call(this);
