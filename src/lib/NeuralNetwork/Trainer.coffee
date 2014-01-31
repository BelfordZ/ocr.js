brain = require("brain")

class Trainer

  constructor: (@trainingSet = []) ->
    if Trainer.trainingSet.length is 0
      parseTrainingSet()
    return Trainer

  addTestCase: (input, output) ->
    @trainingSet.push({input: input, output: output})

  # returns a trained Neural Network Data Structure
  run: ->
    @ann.train(@trainingSet, {
      errorTresh: 0.0001
      iterations: 5000
      log: true
      logPeriod: 10
    })

module.exports = Trainer
