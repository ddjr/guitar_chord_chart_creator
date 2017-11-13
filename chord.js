function Chord() {
  // ------------------------
  // |    Variable Setup    |
  // ------------------------
  var canvas = document.createElement('canvas');
  var canvasContext = canvas.getContext('2d');
  canvas.width = 150;
  canvas.height = 200;

  // offsets
  var chord_name_offset = 0;
  var open_string_offet = 15;
  var fret_number_offset = 15;

  var width = canvas.width - fret_number_offset;
  var height = canvas.height - (chord_name_offset + open_string_offet);
  var frets = 5;
  var strings = 6;

  var radius = height/(frets*3.5);

  this.fingerings = [];
  var fingerings = [];
  for(let i=0; i<strings*frets; i++) {
    this.fingerings.push(0);
  }
  fingerings = this.fingerings;
  this.openStrings = [];
  var openStrings = [];
  for(let i=0; i<strings; i++) {
    this.openStrings.push(0);
  }
  openStrings = this.openStrings;

  // HTML (DOM) Setup
  var div1 = document.createElement('div');
  var div2 = document.createElement('div');
  this.container = document.createElement('div');
  this.container.className += ' col-6 col-sm-3 col-md-2';
  div2.style.width = 'fit-content';
  this.chordName = document.createElement('input');
  this.fretNumber = document.createElement('input');
  this.chordName.placeholder = " ";
  this.fretNumber.placeholder = "1";
  this.container.appendChild(div1);
  div1.appendChild(this.chordName);
  div1.appendChild(this.fretNumber);
  this.chordName.align = "center";
  this.container.appendChild(div2);
  div2.appendChild(canvas);
  document.getElementsByTagName('div')[1].appendChild(this.container);




  // ------------------------
  // |     Mouse Events     |
  // ------------------------
  canvas.addEventListener('click', function(evt) {
    var mousePos = calculateMousePos(evt);

    mouseX = mousePos.x - fret_number_offset;
    mouseY = mousePos.y - chord_name_offset;

    // handles clicking on open string/mute string symbols
    if( mouseX > 0 && mouseX < width &&
        mouseY > 0 && mouseY < open_string_offet) {
        var index = Math.floor(mouseX / (width/strings));
        openStrings[index] = (openStrings[index]+1) % 3;
    }

    mouseY -= open_string_offet;
    // handles clicking on frets
    if(mouseX > 0 && mouseX < width &&
       mouseY > 0 && mouseY < height) {

      var string = Math.floor(mouseX / (width/strings)) +1;
      var fret = Math.floor(mouseY / (height/frets)) +1 ;
      var index = ((fret-1) * strings) + (string -1);
      if(fingerings[index] == 0) {
        fingerings[index] = 1;
      } else {
        fingerings[index] = 0;
      }
    }
  });

  // ------------------------
  // |      Draw Chord      |
  // ------------------------
  this.draw = function() {
    this.fingerings = fingerings;
    this.openStrings = openStrings;
    // clear background
    drawRect(0, 0, canvas.width, canvas.height, "white");
    canvasContext.save();
    this.drawFretNumber();
    canvasContext.translate(fret_number_offset, chord_name_offset);
    this.drawOpenStringsSymbols();
    canvasContext.translate(0, open_string_offet);
    this.drawFretboard();
    this.drawFingering();
    canvasContext.restore();
  }
  this.drawOpenStringsSymbols = function() {
    canvasContext.font = "12px helvetica";
    for(let i=0; i<openStrings.length; i++) {
      var string_offset = width/(strings*2);
      if(openStrings[i] == 1) {
        colorText("O", (i)*(width/strings) + string_offset-4, open_string_offet-4, "black");
      } else if (openStrings[i] == 2) {
        colorText("X", (i)*(width/strings) + string_offset-4, open_string_offet-4, "black");
      }
    }
  }
  this.drawFingering = function() {
    var string_offset = width/(strings*2);
    var distance_to_center_of_fret = height/(frets*2);
    for(let i=0; i<this.fingerings.length; i++) {
      var currentString = (i % strings) + 1;
      var currentFret = Math.floor(i/strings);
      var fingerX = (currentString-1) * (width/strings) + string_offset;
      var fingerY = currentFret * (height/frets) + distance_to_center_of_fret;

      if(this.fingerings[i] == 1) {
        drawCircle(fingerX,fingerY, radius, "black");
      }
      // console.log();
      // // debugConsoleLog();
      // if(this.fingerings[i] == 1) {
      //   drawCircle(fingerX,fingerY, radius, "black");
      //   drawCircle(fingerX,fingerY, radius*.9, "white");
      //   colorText("1", fingerX-3,fingerY+3, "black");
      // }
    }
  }
  this.drawFretboard = function() {
    var string_offset = width/(strings*2);
    // draw strings
    for(let i=0; i<strings; i++){
      var string_spacing = width/strings;
      drawRect(i*string_spacing + string_offset, 0, 1, height, "black");
    }
    // draw frets
    for(let i=0; i<=frets; i++) {
      var fret_width = (strings-1)*(width/strings);
      if(i == 0) {
        drawRect(string_offset, i*(height/frets), fret_width,1,  "black");
      }
      drawRect(string_offset, i*(height/frets) - 1, fret_width ,1,  "black");
    }
  }

  this.drawFretNumber = function() {
    canvasContext.font = "20px helvetica";
    colorText(this.fretNumber.value,1,height/(frets) +3,"black");
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
    canvasContext.alignText = "center";
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
  function debugConsoleLog() {
    console.log();
  }
}
