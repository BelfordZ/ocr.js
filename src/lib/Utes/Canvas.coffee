class Canvas

  constructor: (id) ->
    @domElement = document.getElementById(id)
    @jQueryDomElement = $(@domElement)


    @canvasElement = @jQueryDomElement[0]

    @height = @jQueryDomElement.height()
    @width = @jQueryDomElement.width()

    @context = @canvasElement.getContext("2d")

    @ratio = (=>
      dpr = window.devicePixelRatio || 1
      bsr = @context.webkitBackingStorePixelRatio ||
            @context.mozBackingStorePixelRatio ||
            @context.msBackingStorePixelRatio ||
            @context.oBackingStorePixelRatio ||
            @context.backingStorePixelRatio || 1

      return dpr / bsr
    )()

    @canvasElement.width = @width * @ratio
    @canvasElement.height = @height * @ratio

    @context.setTransform(@ratio, 0, 0, @ratio, 0, 0)

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

  deconstructor: ->
    document.body.removeChild(@domElement)


  renderCharacter: (character, font, size) ->
    @context.font = "#{size}px #{font}"
    @context.textBaseline = "top"
    @context.fillStyle = "black"
    @context.fillText(character, 0, 0)


module.exports = Canvas
