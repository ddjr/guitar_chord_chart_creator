'use strict';
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
  for(let i = 0; i<numChords; i++) {
    chords[i].draw();
  }
}

// var LL = new LinkList();
// LL.removeValueFromEnd(5);
// LL.push(5);
// LL.push(2);
// LL.push(3);
// LL.push(4);
// LL.push(5);
// LL.push(5);
// LL.push(5);
// console.log(LL.allIndexOfValue(5));
// LL.removeValueFromEnd(5);
// console.log(LL.allIndexOfValue(5));
// LL.removeValueFromEnd(5);
// LL.removeValueFromEnd(5);
// LL.removeValueFromEnd(5);
// LL.push(4);
// LL.removeValueFromEnd(5);
// LL.removeValueFromEnd(5);
// console.log(LL.allIndexOfValue(5));
// console.log(LL);

//
// console.log(LL.length());
// console.log(LL);
// LL.removeValue(2);
// console.log(LL);
// console.log(LL.indexOfValue(3));
// LL.push(6);
// console.log(LL.indexOfValue(4));
// console.log(LL.indexOfValue(2));
// console.log(LL.length());
