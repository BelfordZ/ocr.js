function ann()
{
   this.net = new brain.NeuralNetwork({learingRate:0.99});
   this.trainingSet = new Array();
   this.numOfChars = 25;
};

ann.prototype.MakeNeuralNetworkFromData = function(dat)
{
   var tmp = JSON.parse(dat);
   this.net = new brain.NeuralNetwork().fromJSON(tmp);
};

ann.prototype.AddTestCase = function(testData)
{
   //testData.input = this.NormalizeInputs(testData.input);
   testData.input = Normalize(testData.input, 0, 80);
   //testData.output.chr = this.AsciiToCharNumber(testData.output.chr);
   testData.output.chr = AsciiToCharNumber(testData.output.chr);
   //testData.output.chr = this.NormalizeOutputs(testData.output.chr);
   testData.output.chr = Normalize(testData.output.chr, 0, 26);
   this.trainingSet.push(testData);
};

ann.prototype.Train = function()
{
   var tmpOut = this.net.train(this.trainingSet, {errorThresh: 0.0001, iterations: 5000,
						  log: true, logPeriod: 10});
};

ann.prototype.NormalizeOutputs = function(val)
{
   return val/this.numOfChars;
};
   
ann.prototype.AsciiToCharNumber = function(ascii)
{
   if (ascii < 91 && ascii > 64)
   {
      ascii -= 65;
   }
   if (ascii > 90 && ascii < 123)
   {
      ascii -= 97;
   }
   return ascii;
};

ann.prototype.CharNumberToAscii = function(charNum)
{
   if (charNum <= 26 && charNum > 0)
   {
      charNum += 65;
   }
   if (charNum > 26 && charNum <= 52)
   {
      charNum += 97;
   }
   return charNum;
};

ann.prototype.NormalizeInputs = function(arr)
{
   //should be the size of the font
   var largest = 80//Math.max.apply(Math, arr);
   var smallest = 0//Math.min.apply(Math, arr);
   for(var i = 0; i<arr.length; i++)
   {
      arr[i] = ((arr[i] - smallest) / largest);
   }
   return arr;
};

ann.prototype.RunTest = function(testFeatures)
{
   testFeatures = this.NormalizeInputs(testFeatures);
   this.run = this.net.toFunction();
   var out = this.run(testFeatures);
   return(out);
};