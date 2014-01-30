Img = require("./Image.coffee")

class RgbImg extends Image

  constructor: (@image, cb) ->
    super(@image, () ->

    )

module.exports = RgbImg
