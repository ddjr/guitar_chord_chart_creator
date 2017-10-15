var chords = [];
var numChords = 6;
window.onload = function() {
  var FPS = 30;
  for(i = 0; i<numChords; i++) {
    chords.push(new Chord());
  }
  console.log(chords);
  setInterval(function() {
    draw();
  }, 1000/FPS);

}

function draw() {
  for(i = 0; i<5; i++) {
    chords[i].draw();
  }
}
