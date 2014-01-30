class Image

  constructor: (@ImageData) ->
    @buffer = new Uint8ClampedArray(@ImageData.data)

    @height = @ImageData.height
    @width = @ImageData.width

  toImageData: ->
    return {
      height: @height
      width: @width
      data: @buffer
    }

  make1dIndex: (h, w) ->
    console.log (h * @width * 4) + (w * 4)

    return (h * @width * 4) + (w * 4)


  setPixel: (h, w, color, value) ->
    index = @make1dIndex(h, w)

    if typeof color is "number"
      @buffer[index + color] = value
    else
      if typeof color is "object" and color.length isnt undefined
        for c, i in color
          @buffer[index + i] = c


  Get2dMaxMin: ->

  MakeBoundingBoxOnChar: ->


module.exports = Image
