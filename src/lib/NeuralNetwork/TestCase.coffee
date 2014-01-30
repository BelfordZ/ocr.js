Utes = require("../Utes/index.coffee")

class TestCase

  constructor: (@numOfInputs, @max, @min) ->


  normalize: ->
    @input = Utes.normalize(@input, @min, @max)
    if @output isnt undefined
      @output = Utes.Transforms.normalize(@output)



module.exports = TestCase
