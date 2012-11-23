function imageOps(canvId, h, w)
{
   this.image = new imageData(h,w);
   this.image.initImageFromCanvas(canvId);
};

//leaves the canvas data out of sync. getimagedata will return out of date results
imageOps.prototype.Threshold = function(threshValue, aboveValue, belowValue)
{
   var h = this.image.height;
   var w = this.image.width;
   
   for (var x = 0; x < h; x++)
   {
      for (var y = 0; y < w; y++)
      {
	 var tmp = (this.image.GetImageDataAlphaAt(x,y) < threshValue) ? belowValue : aboveValue;
	 this.image.SetImageDataAlphaAt(x,y,tmp); 
      }
   }
   this.image.UpdateImgDataObj();
};

imageOps.prototype.RenderCharacterToImg = function(charInput, size, font)
{
   this.image.ChangeCanvasDimensions(size,size);
   this.image.context.fillstyle = "#000000";
   this.image.context.font = size + "px " + font;
   this.image.context.textBaseline = "top";
   this.image.context.fillText(charInput, 0, 0);
};

imageOps.prototype.MakeBoundingBoxOnChar = function()
{
   this.Get2dMaxMin();
   
   var newRows = this.botMost - this.topMost+1;
   var newCols = this.rightMost - this.leftMost+1;

   var tmpImgData = this.image.context.getImageData(this.leftMost, this.topMost, newCols, newRows);
   
   this.image.ChangeCanvasDimensions(newRows, newCols);
   this.image.imgDataObj = tmpImgData;
   this.image.DrawImgDataToCanvas();
};

imageOps.prototype.Get2dMaxMin = function()
{
   this.topMost = this.image.height-1;
   this.botMost = 0;
   this.leftMost = this.image.width-1;;
   this.rightMost = 0;
   
   var h = this.image.height;
   var w = this.image.width;
   
   for (var row=0; row<h; row++)
   {
      for (var col=0; col<w; col++)
      {
	 if (this.image.GetImageDataAlphaAt(row,col) > 0)
	 {
	    (this.topMost > row) ? this.topMost = row : null;
	    (this.botMost < row) ? this.botMost = row : null;
	    (this.leftMost > col) ? this.leftMost = col : null;
	    (this.rightMost < col) ? this.rightMost = col : null;
	 }
      }
   }
};

imageOps.prototype.ExtractProjectionFeature = function(numOfSlices)
{
   var w = this.image.width;
   var h = this.image.height;
   
   var sizeOfVerticalSlices = (w/numOfSlices);
   var sizeOfHorizontalSlices = (h/numOfSlices);

   var horizontalSlice = new Array(numOfSlices);
   var verticalSlice = new Array(numOfSlices);
   
   for (var i=0; i<numOfSlices; i++)
   {
      horizontalSlice[i] = 0;
      verticalSlice[i] = 0;
   }

   for (var i = 0; i<numOfSlices; i++)
   {
      var regRow = Math.floor((i)*sizeOfHorizontalSlices);
      for (var regCol = 0; regCol < w; regCol++)
      {
	 (this.image.GetImageDataAlphaAt(regRow,regCol) > 0) ? horizontalSlice[i] += 1 : null;
      }
   }
   for (var i = 0; i<numOfSlices; i++)
   {
      var regCol = Math.floor((i)*sizeOfVerticalSlices);
      for (var regRow = 0; regRow < h; regRow++)
      {
	 (this.image.GetImageDataAlphaAt(regRow, regCol) > 0) ? verticalSlice[i] += 1 : null;
      }
   }

   var resultFeature = horizontalSlice.concat(verticalSlice);
   //document.getElementById('errorBlock').innerHTML = JSON.stringify(resultFeature);
   return resultFeature;
};