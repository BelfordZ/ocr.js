_ = require("underscore")

Utes = require("./Utes/index.coffee")
Image = require("./image/Image.coffee")
Trainer = require("./NeuralNetwork/Trainer.coffee")

class Ocr

  # Array of images
  _segments: undefined
  _features: undefined
  _results: []

  constructor: (canvasId, @opts) ->
    @canvas = new Utes.Canvas(canvasId)
    @rawImage = new Image(@canvas.readImageData())

    a = @rawImage.toImageData()
    @canvas.writeImageData(a)
    console.log _.unique(@canvas.readImageData().data)

  ###*
   * Returns a new Image object who forms a bounding box around a single character
   * @param  {Image}      Image object containing 1 or more characters
   * @return {[Image]}    Array of Image Objects, each bounded by the size of the character.
  ###
  segment: ->
    @opts.beforeSegment?(@)
    @opts.afterSegment?(@)


  extractFeatures: ->


  ###*
   * Given a feature set, will use a specified technique for classification. The default is neural network
   * @return {[type]}
  ###
  classify: ->

  ###*
  * Runs the the @imageObj the engine, and returns a sequence of characters
  * @return {String}      Returns the string found in the image
  ###
  run: ->
    @_segments = @segment(@imageObj)

    for segment, i in @_segments
      @_features.push(@extractFeatures())

    @classify(@_segments, @_features)

    return @resultingString

###
  Class Methods
###
Ocr.Trainer = Trainer


module.exports = Ocr
