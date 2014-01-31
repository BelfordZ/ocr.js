var dewit = function() {
    var opts = {
        beforeSegment: function(ctx) {
            console.log("b4 seggies");
        },
        afterSegment: function(ctx) {
            console.log("afta seggies");
        }
    };

    var ocrjs = new ocr("sample", opts);
    ocrjs.canvas.renderCharacter("a", "arial", 32)
    ocrjs.canvas.deconstructor()
};
