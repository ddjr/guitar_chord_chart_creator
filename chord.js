function Chord() {
  this.canvas = document.createElement('canvas');
  this.canvas.width = 150;
  this.canvas.hieght = 120;
  var canvas = this.canvas;
  var canvasContext = canvas.getContext('2d');
  var body = document.getElementsByTagName("body")[0];
  var width = this.canvas.width;
  var hieght = this.canvas.hieght;

  var frets = 5;
  var strings = 6;
  var offset_top = 0;
  var offset_left = 0;

  var fingerings = [];
  for(let i=0; i<strings*frets; i++) {
    fingerings.push(0);
  }
  var openStrings = [];
  for(let i=0; i<strings; i++) {
    openStrings.push(0);
  }

  // console.log(fingerings.length);


  body.appendChild(canvas);
  this.canvas.addEventListener('click', function(evt) {
    var mousePos = calculateMousePos(evt);

    if(mousePos.y > 0 && mousePos.y < 10){
      console.log("here");
    }
    if(mousePos.x > 0 && mousePos.x < width &&
       mousePos.y > 0 && mousePos.y < hieght) {


      var string = Math.floor(mousePos.x / (width/strings));
      var fret = Math.floor((mousePos.y) / (hieght/frets));
      var index = (fret * strings) + string;
      console.log(index);
      if(fingerings[index] == 0) {
        fingerings[index] = 1;
      } else {
        fingerings[index] = 0;
      }
    }
  });

  this.draw = function() {
    this.drawFretboard();
    this.drawingFingering();
  }
  this.drawingFingering = function() {

    for(let i=0; i<fingerings.length; i++) {
      if(fingerings[i] == 1) {
        var currentString = (i % strings) + 1;
        var currentFret = Math.floor(i/strings);


        var string_offset = width/(strings*2);
        fingerX = (currentString-1)*(width/strings) + string_offset;
        fingerY = hieght*currentFret/frets + hieght*1/(frets*2);
        radius = hieght/(frets*3.3);

        drawCircle(fingerX,fingerY, radius, "black");

      }
    }
  }
  this.drawFretboard = function() {
    // clear background
    drawRect(0, 0, width, hieght, "white");

    var string_offset = width/(strings*2);
    // draw strings
    for(let i=0; i<strings; i++){
      var string_spacing = width/strings;
      drawRect(i*string_spacing + string_offset, 0, 1, hieght, "black");
    }
    // draw frets
    for(let i=0; i<=frets; i++) {
      var fret_width = (strings-1)*(width/strings);
      if(i == 0) {
        drawRect(string_offset, i*(hieght/frets), fret_width,1,  "black");
      }
      drawRect(string_offset, i*(hieght/frets) - 1, fret_width ,1,  "black");
    }

  }

  function drawCircle(centerX, centerY, radius, color) {
    canvasContext.fillStyle = color;
    canvasContext.beginPath();
    canvasContext.arc(centerX, centerY, radius, 0, Math.PI*2, true);
    canvasContext.fill();
  }
  function drawRect(x,y, width, height, color) {
    canvasContext.fillStyle = color;
    canvasContext.fillRect(x,y,width,height);
  }
  function colorText(showWords, textX,textY, fillColor) {
    canvasContext.fillStyle = fillColor;
    canvasContext.fillText(showWords, textX,textY);
  }

  function calculateMousePos(evt) {
  var rect = canvas.getBoundingClientRect();
  var root = document.documentElement;
  var mouseX = evt.clientX - rect.left - root.scrollLeft;
  var mouseY = evt.clientY - rect.top - root.scrollTop;
  return {
    x: mouseX,
    y: mouseY
  };
}



}
