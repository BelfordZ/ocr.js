FeatureExtraction = require("./FeatureExtraction.coffee")

class ProjectionCount extends FeatureExtraction

  constructor: (binarizedImg) ->
    super(binarizedImg)

module.exports = ProjectionCount
