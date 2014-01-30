class Canvas

  constructor: (id) ->
    @domElement = $(document.getElementById(id))


    @canvasElement = @domElement[0]

    @height = @domElement.height()
    @width = @domElement.width()

    @context = @canvasElement.getContext("2d")

    @context.imageSmoothingEnabled = false
    @context.webkitImageSmoothingEnabled = false
    @context.mozImageSmoothingEnabled = false


  readImageData: ->
    return @context.getImageData(0, 0, @height, @width)

  writeImageData: (inputImageData) ->
    imageDataBuffer = @context.createImageData(inputImageData.height, inputImageData.width)

    for val, i in inputImageData.data
      imageDataBuffer.data[i] = val

    @context.putImageData(imageDataBuffer, 0, 0)

  renderChar: (character, font, size) ->

module.exports = Canvas
