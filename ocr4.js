Canvas = document.createElement('canvas');
Canvas.id = 'Canvas';

canvasBuffer = document.createElement('canvas');
canvasBuffer.id = 'canvasBuffer';

//set this based on size of char n shit
Canvas.width = 20;
Canvas.height = 20;

thresholdingValue = 25;
numOfPossibleOutputs = (26*2);

ccontext = null;
bufferCanvasContext = null;
px = null;
imgData = null;
imageData = null;
//net = new brain.NeuralNetwork();
ann = null;

$(document).ready(function(){

      //setup canvas element and append to page
      $('body').prepend(Canvas);
      
      //$('body').prepend(canvasBuffer);
      //ccontext = Canvas.getContext("2d");
      //bufferCanvasContext = canvasBuffer.getContext('2d');

//get input from the three options. option is hardcoded, not yet parameterized.
      //draw the letter that results onto the canvas element
      //var features = new Array(26);
      //var img = new imageData(20, 20);
      
      //var featuresAndOutputs = new Array();
/*
      var neuralNet = new ann();
      
      for (var i=65; i<91; i++)
      {
	 var imgOps = new imageOps(Canvas.id, Canvas.height, Canvas.width);
	 imgOps.RenderCharacterToImg(String.fromCharCode(i), '80', 'sans-serif');
	 imgOps.Threshold(2,1,0);
	 imgOps.MakeBoundingBoxOnChar();
	 neuralNet.AddTestCase({input:imgOps.ExtractProjectionFeature(16),output:i});
	 neuralNet.Train();
//	 document.getElementById('errorBlock').innerHTML +=
//	    String.fromCharCode(i) + "--->" + imgOps.ExtractProjectionFeature(16) + "<br>";

	 
	 document.getElementById('errorBlock').innerHTML +=
	    "Expected output: " + featuresAndOutputs[i].output + "-----" +
	    featuresAndOutputs[i].input + "<br>";

      }
      var netAsString = JSON.stringify(neuralNet.net.toJSON());
      var postString = "action=put&annData=" + netAsString; 
      make_async("AnnDataServer.php", "errorBlock", "POST", postString);    
      // document.getElementById('errorBlock').innerHTML +=
//	 neuralNet.RunTest(imgOps.ExtractProjectionFeature(16));

  imgOps.image.DrawImgDataToCanvas();
  
      for (var i=65; i<90; i++)
      {
	 DrawRenderedInput(CharSubmitted(65));
	 SetPixelData();
	 Threshold(thresholdingValue);
	 GetAdjustedCanvasSize();
	 DrawImageBuffer();
	 features[i] = ExtractFeatures();
	 }
      //NeuralNetTrain(features, 1);

      var jqxhr = $.ajax({url:'http://www.cs.uleth.ca/~belz4851/ocr/AnnDataServer.php',
			  type:'POST',
			  data:{action:'get'}})
	 .done(function(data){
	       annData = Data;
	       net.fromJSON(annData);
	       NeuralNetTrain(feature, 5);
	       });
*/
   });
function Test()
{
   var inputChar = document.getElementById("inputChar").value;
   var imgOps = new imageOps(Canvas.id, Canvas.height, Canvas.width);
   imgOps.RenderCharacterToImg(inputChar, '80', 'sans-serif');
   imgOps.Threshold(2,1,0);
   imgOps.MakeBoundingBoxOnChar();
   var output = ann.RunTest(imgOps.ExtractProjectionFeature(16));
   console.log(JSON.stringify(output));
}

function TrainNN()
{
   var neuralNet = new ann();
   
   for (var i=65; i<91; i++)
   {
      var imgOps = new imageOps(Canvas.id, Canvas.height, Canvas.width);
      imgOps.RenderCharacterToImg(String.fromCharCode(i), '80', 'sans-serif');
      imgOps.Threshold(2,1,0);
      imgOps.MakeBoundingBoxOnChar();
      neuralNet.AddTestCase({input:imgOps.ExtractProjectionFeature(16),output:i});
   }
   neuralNet.Train();
   var netAsString = JSON.stringify(neuralNet.net.toJSON());
   var postString = "action=put&annData=" + netAsString; 
   make_async("AnnDataServer.php", "errorBlock", "POST", postString);
}

function LoadNN()
{
   var postString = "action=get"; 
   make_async("AnnDataServer.php", "errorBlock", "POST", postString);
}

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
	    (topMost == 0) ? topMost = row : null;
	    (botMost < row) ? botMost = row : null;
	    (leftMost == 0) ? leftMost = col : null;
	    (rightMost < col) ? rightMost = col : null;
	 }
      }
   }
   var newRows = botMost - topMost+1;
   var newCols = rightMost - leftMost+1;
   canvasBuffer.width = newCols;
   canvasBuffer.height = newRows;
   //this bad boy does the bounding box
   imageData = ccontext.getImageData(leftMost, topMost, newCols, newRows);
   Canvas.height = newRows;
   Canvas.width = newCols;
   bufferCanvasContext.putImageData(imageData, 0, 0);
   for (var row=0; row<newRows; row++)
   {
      for (var col=0; col<newCols; col++)
      {
	 document.getElementById('errorBlock').innerHTML +=
	    ((imageData.data[MakeIndex(newCols, row, col, 3)] > 0) ? 1 : "&nbsp.");
      }
      document.getElementById('errorBlock').innerHTML += "<br>";
   }
}
function OutputNeuralNetToServer()
{
   var json = net.toJSON();
   var jqxhr = $.ajax({url:'http://www.cs.uleth.ca/~belz4851/ocr/AnnDataServer.php',
		       type:"POST",
		       data: {action: "put", annData: json},
      })
      .done(function(){
	   document.getElementById("errorBlock").innerHTML = "successfully sent to server";
	 });
}
function NeuralNetTrain(generatedInput, expectedOutput)
{
   // discretize between 0-1 the inputs
   var heighest = 0;
   var lowest = 0;
   for (var i=0; i<generatedInput.length; i++)
   {
      for (var j=0; j<generatedInput[i].length; j++)
      {
	 (generatedInput[i][j] > heighest) ? heighest = generatedInput[i][j] :
	    (generatedInput[i][j] < lowest) ? lowest = generatedInput[i][j] : null;
      }
   }
   (lowest == 0) ? lowest = heighest : null;
   for (var i=0; i<generatedInput.length; i++)
   {
      for (var j=0; j<generatedInput[i].length; j++)
      {
	 generatedInput[i][j] = (generatedInput[i][j]-lowest)/heighest;
      }
   }
//now do the output normalization to 0-1

   normalizedOutputNumber = expectedOutput / numOfPossibleOutputs;
   var combinedInput = generatedInput[0].concat(generatedInput[1]);
   for (var i=0; i<4000; i++)
   {
      net.train({input:combinedInput, output:normalizedOutputNumber});
   }

//var output = net.run(combinedInput);
   //document.getElementById("errorBlock").innerHTML += ("<br>" + output);
}

//adaptable to take user input aswell as loop through the letters in ascii table.
function CharSubmitted(inputChar)
{
   var tmpChar = String.fromCharCode(inputChar);
   return (tmpChar);
}

function DrawRenderedInput(aChar)
{
   ccontext.fillStyle = "#000000";
   ccontext.font = "20px sans-serif";
   ccontext.textBaseline = "top";
   ccontext.fillText(aChar.toString(), 0, 0);
}

function DrawImageBuffer()
{
   imgData = bufferCanvasContext.getImageData(0,0, canvasBuffer.width, canvasBuffer.height);
   ccontext.putImageData(imgData, 0, 0);
   SetPixelData();
}

function ClearCanvas()
{
   ccontext.save();
   ccontext.setTransform(1, 0, 0, 1, 0, 0);
   ccontext.clearRect(0, 0, Canvas.width, Canvas.height);
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
   var numOfHorizontalSlices = 6;
   var numOfVerticalSlices = 6;

   var sizeOfVerticalSlices = (w/numOfVerticalSlices);
   var sizeOfHorizontalSlices = (h/numOfHorizontalSlices);
   
   var horizontalSlice = [0,0,0,0,0,0];
   var verticalSlice = [0,0,0,0,0,0];

   var horizontalIntersects = 0;
   var verticalIntersects = 0;
   
   //for each position in the horizontal slice array
   for (var i = 0; i<numOfHorizontalSlices; i++)
   {
      //calculate the regular row number corresponding to this slice (horizontal slice @ i)
      var regRow = Math.floor((i+1)*sizeOfHorizontalSlices);
      for (var regCol = 0; regCol < w; regCol++)
      {
	 //increment horizontal slice at this i if one of the reg cols in this reg row >0 
	 (px[MakeIndex(w, regRow, regCol, 3)] > 0) ? horizontalSlice[i] += 1 : null;
      }
   }
   for (var i = 0; i<numOfVerticalSlices; i++)
   {
      var regCol = Math.floor((i+1)*sizeOfVerticalSlices);
      for (var regRow = 0; regRow < h; regRow++)
      {
	 (px[MakeIndex(w, regRow, regCol, 3)] > 0) ? verticalSlice[i] += 1 : null;
      }
   }
   var resultFeature = [horizontalSlice, verticalSlice];
   
   return resultFeature;
}

function NNDataReturned(data)
{
   ann = new ann();
   ann.MakeNeuralNetworkFromData(data);
}

/* Asynch loading/uploading training Data helpers */
function load_content_done(req, url, targ)
{
   if (req.readyState == 4 && req.status == 200)
   { 
      if(req.responseText)
      {
	 NNDataReturned(req.responseText);
      }
//document.getElementById(targ).innerHTML = req.responseText;
   }
}
function load_content(url, target, meth, postData)
{
   var req;
   if (window.XMLHttpRequest)
   {
      req = new XMLHttpRequest();
   }
   else if (window.ActiveXObject)
   {
      req = new ActiveXObject("Microsoft.XMLHTTP");
   }
   if (req !== undefined)
   {
      req.onreadystatechange = function()
	 {
	    load_content_done(req, url, target);
	 }
      if (meth == "POST")
      {
	 req.open("POST", url, true);
	 req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	 //req.setRequestHeader("Content-length", postData.length);
	 //req.setRequestHeader("Connection", "close");
	 req.send(postData);
      }
      else
      {
	 req.open("GET", url, true);
	 req.send();
      }
   }
}
function make_async(name, div, method, posted)
{
   load_content(name, div, method, posted);
}