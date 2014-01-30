class Trainer

  constructor: (@ann, @trainingSet = []) ->


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
