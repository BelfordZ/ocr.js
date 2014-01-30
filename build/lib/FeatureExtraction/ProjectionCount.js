(function() {
  var FeatureExtraction, ProjectionCount,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  FeatureExtraction = require("./FeatureExtraction.coffee");

  ProjectionCount = (function(_super) {
    __extends(ProjectionCount, _super);

    function ProjectionCount(binarizedImg) {
      ProjectionCount.__super__.constructor.call(this, binarizedImg);
    }

    return ProjectionCount;

  })(FeatureExtraction);

  module.exports = ProjectionCount;

}).call(this);
