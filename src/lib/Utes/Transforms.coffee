

AsciiToCharNumber = (ascii) ->
  if ascii < 91 && ascii > 64
    ascii -= 65

  if ascii > 90 && ascii < 123
    ascii -= 97

  return ascii

CharNumberToAscii = (charNum) ->
  if charNum <= 26 && charNum > 0
    charNum += 65

  if charNum > 26 && charNum <= 52
    charNum += 97

  return charNum

greyScaleToRgb = () ->
  #Scale values for grayscaling RGB (taken from http://www.mathworks.com/help/toolbox/images/ref/rgb2gray.html )
  return r * 0.2989 + g * 0.5870 + b * 0.1140


#  arr -- 1 dimensional array containing values to normalize
#  smallest -- lowest value possible
#  largest -- largest value possible
#  return -- the value represented as a float in the range [0,1]e
normalize = (val, min, max) ->
  return (val - min) / max


module.exports =
  normalizedCharCode: AsciiToCharNumber
  normalizedCharFromCode: CharNumberToAscii
  normalize: normalize
