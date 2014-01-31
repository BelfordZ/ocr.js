(function() {
  var Trainer, brain;

  brain = require("brain");

  Trainer = (function() {
    function Trainer(trainingSet) {
      this.trainingSet = trainingSet != null ? trainingSet : [];
      if (Trainer.trainingSet.length === 0) {
        parseTrainingSet();
      }
      return Trainer;
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
