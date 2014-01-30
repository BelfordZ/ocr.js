var ocr_utils =
{
    AsciiToCharNumber: function(ascii) {
        if (ascii < 91 && ascii > 64)
            ascii -= 65;

        if (ascii > 90 && ascii < 123)
            ascii -= 97;
        return ascii;
    },
    CharNumberToAscii: function(charNum) {
        if (charNum <= 26 && charNum > 0)
            charNum += 65;

        if (charNum > 26 && charNum <= 52)
            charNum += 97;

        return charNum;
    },

    //  arr -- 1 dimensional array containing values to normalize
    //  smallest -- lowest value possible
    //  largest -- largest value possible
    //  return -- the value represented as a float in the range [0,1]
    Normalize: function(val, smallest, largest) {
        smallest = (typeof smallest !== 'undefined') ? a : 0;
        (typeof val == 'number') ? return (val/largest) : null;
        for(var i = 0; i<arr.length; i++)
	       arr[i] = ((arr[i] - smallest) / largest);

     return arr;
  }
};
