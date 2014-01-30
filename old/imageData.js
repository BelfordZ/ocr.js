/*
  GetImageDataAlphaAt(h,w)
  Returns the pixels alpha value (0-255).
  Must have imgDataObj set appropriately
  ---------------------------------------------
  GetCanvasData(canvasId)
  creates and sets the canvas element reference, the canvas context, and the imgDataObj
  ---------------------------------------------
  DrawImgDataToCanvas
  draws the internal imgData to the internal canvas context.
  ---------------------------------------------
  Make1dIndex(h,w,c)
  using the existing Canvas.width, create an index for the pixel data in 1d imgdata.data
  ----------------------------------------------
  ClearCanvas()
  saves context, clears all the data from the Canvas. imgDataObj will stay the same, however.
*/
function imageData(h, w, imageData1d) {
   this.height = h;
   this.width = w;
   this.px;
   if (imageData1d == undefined)
   {
      this.img1d = null;
   }
   else
   {
      this.img1d = imageData1d;
   }
}

imageData.prototype.GetImageDataAlphaAt = function(h,w) { return this.imgDataObj.data[this.Make1dIndex(h,w,3)]; };
imageData.prototype.SetImageDataAlphaAt = function(h,w,value) { this.imgDataObj.data[this.Make1dIndex(h,w,3)] = value; };

imageData.prototype.initImageFromCanvas = function(canvasId) {
   this.canvasId = canvasId;
   this.canvasElement = document.getElementById(canvasId);
   this.context = this.canvasElement.getContext("2d");
   this.imgDataObj = this.context.getImageData(0, 0, this.height, this.width);
};
imageData.prototype.ChangeCanvasDimensions = function(h,w) {
   this.height = h;
   this.width = w;
   this.canvasElement.height = h;
   this.canvasElement.width = w;
   //this.UpdateImgDataObj();
   //this.UpdateContext();
};
imageData.prototype.UpdateContext = function() { this.context = this.canvasElement.getContext("2d"); };

imageData.prototype.DrawImgDataToCanvas = function() { this.context.putImageData(this.imgDataObj, 0, 0); };

imageData.prototype.UpdateImgDataObj = function() { this.imgDataObj = this.context.getImageData(0,0,this.canvasElement.height,this.canvasElement.width); };

imageData.prototype.Make1dIndex = function(h, w, c) { return ((h * this.width * 4) + (w * 4) + c); };

imageData.prototype.ClearCanvas = function() {
   this.context.save();
   this.context.setTransform(1, 0, 0, 1, 0, 0);
   this.context.clearRect(0, 0, this.width, this.height);
   this.context.restore();
};

