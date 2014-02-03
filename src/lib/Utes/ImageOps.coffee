Canvas = require("./Canvas.coffee")

MakeBoundingBoxOnChar: ->

generateImageDataForCharacter: (chars) ->
  switch typeof chars
    when "string" then input = [chars]
    when "number" then input = ["#{chars}"]
    when "object" and chars instanceof Array then input = chars
    else
      return new Error("Input must be a string, or an array of strings")

  tmpCanvas = document.createElement("canvas")
  tmpCanvas.id = "tmp"

  tmpCanvas.height = "400"
  tmpCanvas.width = "400"

  $("body").append(tmpCanvas)


module.exports = {
  MakeBoundingBoxOnChar: MakeBoundingBoxOnChar
  generateImageDataForCharacter: generateImageDataForCharacter
}
