Canvas = document.createElement('canvas');
Canvas.id = 'Canvas';

canvasBuffer = document.createElement('canvas');
canvasBuffer.id = 'canvasBuffer';

//set this based on size of char n shit
Canvas.width;
Canvas.height;

ccontext = null;
bufferCanvasContext = null;
ann = null;

$(document).ready(function(){$('body').prepend(Canvas);});

function Test() {
   var inputChar = document.getElementById("inputChar").value;
   var imgOps = new imageOps(Canvas.id, Canvas.height, Canvas.width);
   imgOps.RenderCharacterToImg(inputChar, '80', 'sans-serif');
   imgOps.Threshold(2,1,0);
   imgOps.MakeBoundingBoxOnChar();
   var output = ann.RunTest(imgOps.ExtractProjectionFeature(16));
   var normalizedOutput = normOut(output);
   document.getElementById('errorBlock').innerHTML = normalizedOutput;
}

function normOut(data) {
   numberOfCharacters = 26;
   return String.fromCharCode((ann.CharNumberToAscii(Math.ceil(numberOfCharacters*data.chr)))-1);
}

function TrainNN() {
   var neuralNet = new ann();

   for (var i=65; i<91; i++) {
      var imgOps = new imageOps(Canvas.id, Canvas.height, Canvas.width);
      imgOps.RenderCharacterToImg(String.fromCharCode(i), '80', 'sans-serif');
      imgOps.Threshold(2,1,0);
      imgOps.MakeBoundingBoxOnChar();
      neuralNet.AddTestCase({input:imgOps.ExtractProjectionFeature(16),output:{chr: i}});
   }
   neuralNet.Train();
   var netAsString = JSON.stringify(neuralNet.net.toJSON());
   //var netAsString = neuralNet.net.toJSON();
   var postString = "action=put&annData=" + netAsString;
   make_async("AnnDataServer.php", "errorBlock", "POST", postString);
}

function LoadNN() {
   var postString = "action=get";
   make_async("AnnDataServer.php", "errorBlock", "POST", postString);
}

function NNDataReturned(data) {
   ann = new ann();
   ann.MakeNeuralNetworkFromData(data);
}

/* Asynch loading/uploading training Data helpers */
function load_content_done(req, url, targ) {
   if (req.readyState == 4 && req.status == 200)
   {
      if(req.responseText)
      {
	 NNDataReturned(req.responseText);
      }
   }
}

function load_content(url, target, meth, postData) {
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
	 req.send(postData);
      }
      else
      {
	 req.open("GET", url, true);
	 req.send();
      }
   }
}

function make_async(name, div, method, posted) { load_content(name, div, method, posted); }
