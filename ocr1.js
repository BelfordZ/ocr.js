Canvas = document.createElement('canvas');
Canvas.id = 'Canvas';
canvasBuffer = document.createElement('canvas');
canvasBuffer.id = 'canvasBuffer';
//set this based on size of char n shit
Canvas.width = 20;
Canvas.height = 20;

thresholdingValue = 25;

ccontext = null;
px = null;
imgData = null;

$(document).ready(function(){
      //setup canvas element and append to page
      $('body').prepend(Canvas);
      //$('body').prepend(canvasBuffer);
      ccontext = Canvas.getContext("2d");

      //get input from the three options. option is hardcoded, not yet parameterized.
      //draw the letter that results onto the canvas element
      DrawRenderedInput(CharSubmitted());

      SetPixelData();
      Threshold(thresholdingValue);
      GetAdjustedCanvasSize();
      
      //var feature = ExtractFeatures();
      
      //document.getElementById("featureBlockOutput").innerHTML +=
//	 tmpChar + " = " + feature[0] + " | " + feature[1] + "<br>";

      
   });

function GetAdjustedCanvasSize()
{
   var topMost = 0;
   var botMost = 0;

   var leftMost = 0;
   var rightMost = 0;
   
   for (var row=0; row<Canvas.height; row++)
   {
      for (var col=0; col<Canvas.width; col++)
      {
	 if (px[MakeIndex(Canvas.width, row,col,3)] == 255)
	 {
	    if (topMost == 0)
	    {
	       topMost = row;
	    }
	    if (botMost < row)
	    {
	       botMost = row;
	    }
	    if (leftMost == 0)
	    {
	       leftMost = col;
	    }
	    if (rightMost < col)
	    {
	       rightMost = col;
	    }
	 }
      }
   }
   var newRows = botMost - topMost;
   var newCols = rightMost - leftMost;

   /*
   for (var row=topMost; row<=botMost; row++)
   {
      for (var col=leftMost; col<=rightMost; col++)
      {
	 px[MakeIndex(Canvas.width, row-topMost, col-leftMost, 3)] = px[MakeIndex(Canvas.width, row, col, 3)];
      }
   }
   */
   canvasBuffer.width = newCols;
   canvasBuffer.height = newRows;

   var bufferCanvasContext = canvasBuffer.getContext('2d');
   //var imageData = bufferCanvasContext.getImageData(leftMost, topMost, rightMost, botMost);

   var imageData = ccontext.getImageData(leftMost, topMost, newCols, newRows);
   
   for (var row=0; row<newRows; row++)
   {
      for (var col=0; col<newCols; col++)
      {
	 document.getElementById('errorBlock').innerHTML +=
	    ((imageData.data[MakeIndex(newCols, row, col, 3)] == 255) ? 1 : "&nbsp.");
      }
      document.getElementById('errorBlock').innerHTML += "<br>";
   }  
/*
   for (var x=0; x<newRows; x++)
   {
      for (var y=0; y<newCols; y++)
      {
	 var index;
	 imageData.data[MakeIndex(newRows, x, y, 3)] = px[MakeIndex(Canvas.height, x, y, 3)];
      }
   }
*/  
   Canvas.height = newRows;
   Canvas.width = newCols;
   ccontext = bufferCanvasContext.putImageData(imageData, 0, 0);

   for (var row=0; row<newRows; row++)
   {
      for (var col=0; col<newCols; col++)
      {
	 document.getElementById('errorBlock').innerHTML +=
	    ((imageData.data[MakeIndex(newCols, row, col, 3)] == 255) ? 1 : "&nbsp.");
      }
      document.getElementById('errorBlock').innerHTML += "<br>";
   }
}

function ft_extract()
{
   var net = new brain.NeuralNetwork();

   net.train([{input: [0, 0], output: [0]},
	      {input: [0, 1], output: [1]},
	      {input: [1, 0], output: [1]},
	      {input: [1, 1], output: [0]}]);
   var output = net.run([1, 0]);
}

//adaptable to take user input aswell as loop through the letters in ascii table.
function CharSubmitted()
{
   
   /*
   var input = document.getElementById("inputChar").value;
   Chars = input;
   for (var i=65; i<122; i++)
   {
      if (i == 91)
      {
	 i=97;
	 }
   */
   var tmpChar = String.fromCharCode(66);
   return (tmpChar);
   //ClearCanvas();
   //}
}

function DrawRenderedInput(aChar)
{
   //document.getElementById("errorBlock").innerHTML = aChar;
   ccontext.fillStyle = "#000000";
   ccontext.font = "20px sans-serif";
   ccontext.textBaseline = "top";
   ccontext.fillText(aChar.toString(), 0, 0);
}
function ClearCanvas()
{
// Store the current transformation matrix
   ccontext.save();

// Use the identity matrix while clearing the canvas
   ccontext.setTransform(1, 0, 0, 1, 0, 0);
   ccontext.clearRect(0, 0, Canvas.width, Canvas.height);

// Restore the transform
   ccontext.restore();
}

function Threshold(thresh)
{
   for (var x = 0; x < Canvas.height; x++)
   {
      for (var y = 0; y < Canvas.width; y++)
      {
	 px[MakeIndex(Canvas.width, x,y,3)] = (px[MakeIndex(Canvas.width, x,y,3)] < thresh) ? 0 : 255;
      }
   }
}

function MakeIndex(canvasElementWidth, h, w, c)
{
   return ((h * canvasElementWidth * 4) + (w * 4) + c);
}

function SetPixelData()
{
   imgData = ccontext.getImageData(0, 0, $('#Canvas').width(), $('#Canvas').height());
   px = imgData.data;
}

function ExtractFeatures()
{
   var w = Canvas.width;
   var h = Canvas.height;
      
   //First Setting is the number of slices we take.
   var numOfHorizontalSlices = Math.floor(h/13);
   var numOfVerticalSlices = Math.floor(w/13);
   
   var horizontalSlice = new Array();
   var verticalSlice = new Array();

   var horizontalIntersects = 0;
   var verticalIntersects = 0;
   
   for (var row = numOfHorizontalSlices; row<h; row+=numOfHorizontalSlices)
   {
      horizontalSlice[row] = new Array();
      for (var col = 0; col<w; col++)
      {
	 if (px[MakeIndex(Canvas.width, row,col,3)] != 0)
	 {
	    //horizontalSlice[x][y] = 1;
	    horizontalIntersects++;
	 }
      }
   }
   for (var col = numOfVerticalSlices; col<w; col+=numOfVerticalSlices)
   {
      verticalSlice[col] = new Array();
      for (var row = 0; row<h; row++)
      {
	 if (px[MakeIndex(Canvas.width, row,col,3)] !=0)
	 {
	    //verticalSlice[row][col] = 1;
	    verticalIntersects++;
	 }
      }
   }
   var resultFeature = [horizontalIntersects, verticalIntersects]
   return resultFeature;
}
   
$('#Canvas').live('mousemove', function (e) {
      var offset = $('#Canvas').offset();
      var eX = e.pageX - this.offsetLeft;
      var eY = e.pageY - this.offsetTop;
      var z = eY * this.width * 4;
      var s = eX * 4;
      document.getElementById("featureBlockOutput").innerHTML =
	 ('\n red: ' + px[z+s] +
	  ' green: ' + px[z+s+1] +
	  ' blue: '+ px[z+s+2] +
	  ' alpha: ' + px[z+s+3]);
   });