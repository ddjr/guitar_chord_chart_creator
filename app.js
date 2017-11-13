var chordsPerLine = 6;
var lines = 5;
// var strings = 6;
// var frets = 5;

var chords = [];
var numChords = chordsPerLine * lines;
window.onload = function() {
  var FPS = 30;
  for(let i=0; i<numChords; i++) {
    chords.push(new Chord());
  }
  //console.log(chords);
  setInterval(function() {
    draw();
  }, 1000/FPS);
}
function draw() {
  for(i = 0; i<numChords; i++) {
    chords[i].draw();
  }
}
