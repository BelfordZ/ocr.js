Canvas = require("./Canvas.coffee")

class DataGenerator
  constructor: (source) ->
    @fonts = new Array(10)
    @sizes = new Array(10)

  addFont: (font) ->
    @fonts.push(font)

  removeFont: (font) ->
    @fonts.indexOf(font)

  addSize: (size) ->
    @sizes.push(size)

  removeSize: (size) ->
    @sizes.indexOf(size)

  addCharacter

  _canvas = ->
    tmpCanvas = document.createElement("canvas")
    jqTmp = $(tmpCanvas)
    jqTmp.addClass("renderFrame")
    tmpCanvas.id = "tmp"

    $("body").append(jqTmp)

    canvas = new Canvas("tmp")
    canvas.renderCharacter(chars, "arial", 32)

  boundingBox

module.exports = DataGenerator
