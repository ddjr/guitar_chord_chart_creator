'use strict';
// PDF format varibles
var pageWidth = 210;
var pageHeight = 300;
var pageMarginX = 5;
var pageMarginY = 25;
var lineGap = 12;

var chordsPerLine = 5;
var lines = 5;
var strings = 6;
var frets = 5;

// Chord Variables
var chordSpacing = (pageWidth - (2*pageMarginX))/chordsPerLine;
var height = chordSpacing;
var width = chordSpacing*.7;
var chordMarginX = chordSpacing*.15;
var title;
const TILE_FONT_SIZE = 20;
var titleX = pageWidth/2;
var titleY = pageMarginY/2;
// Footer Variables
var footer = '- Built with ChordChartsForGuitar.com 2018 -';
const FOOTER_FONT_SIZE = 10;
var footerX = pageWidth/2;
var footerY = pageHeight - 10;


var doc;
var font = 'helvetica';

function createPDF() {
  console.log("creating PDF...");
  doc = new jsPDF();
  doc.setFont = font;
  drawFretboards();
  title = document.getElementById('song_title').value;
  drawCenteredText(title, titleX,titleY, TILE_FONT_SIZE);
  drawCenteredText(footer, footerX,footerY, FOOTER_FONT_SIZE);
  doc.save('pdfChords.pdf');
}

function drawCenteredText(text, x,y, fontSize) {
  if(!text || !x || !y || !fontSize) {return;}
  doc.setFontSize(fontSize);
  var centeredTextModifer = CalculateCenteredTextModifer(text.length, fontSize);
  doc.text(x-centeredTextModifer,y,text);
}
function CalculateCenteredTextModifer(text_length,fontSize){
  var fontSizeModifer = fontSize * 0.085;
  return text_length * fontSizeModifer;
}
//
// function drawTitleLine(x,y,centeredTextModifer) {
//   var line_extender = 20;
//   doc.line(pageWidth/2 - centeredTextModifer - line_extender , pageMarginY/2, pageWidth/2 + centeredTextModifer + line_extender, pageMarginY/2);
// }
function drawFretboards() {
  for(let i=0; i<lines; i++){
    for(let ii=0; ii<chordsPerLine; ii++) {
      var x = pageMarginX + ii*chordSpacing;
      var y = pageMarginY + i*(chordSpacing + lineGap);
      drawFretboard(x+ chordMarginX,y);

      var chordNum = ii + (i*chordsPerLine);
      var currentChord = chords[chordNum];
      if(currentChord !== undefined) {
        drawChord(x,y,currentChord);
      } // end if currentChord
    } // end for ii<chordsPerLine
  } // end for i<lines
} // end draw drawFretboards()

function drawChord(x,y,chord){
  drawChordName(x,y, chord.chordName.value);
  drawFretNumber(x+chordMarginX,y, chord.fretNumber.value);
  drawFingerings(x+chordMarginX,y, chord.fingerings, chord.melodyNotes);
  drawOpenStringsSymbols(x+chordMarginX,y, chord.openStrings);

}
function drawFretboard(x,y) {
  // draw strings
  for(let i=0; i<strings; i++){
    var stringX = i*(width/(strings-1)) + x;
    doc.line(stringX, y, stringX, height + y);
  }
  // draw frets
  for(let i=0; i<=frets; i++) {
    var fretY = i*(height/frets) + y;
    doc.line(x,fretY, width+x,fretY);
  }
} // end drawFretboard()

function drawChordName(x,y,name) {
  if(name !== null) {
    doc.setFontSize(18);
    var centered_text_offset = name.length - 3;
    doc.text(x + width/2 - centered_text_offset, y - 4, name);
  }
}
function drawSolidMelodyNote(x,y,number) {
  var radius = 2;
  var fill = "F";
  var black = 0;
  var white = 255;
  doc.setDrawColor(white);
  doc.setFillColor(white);
  doc.circle(stringX,fretY,radius,"F");
  doc.setDrawColor(black);
  doc.setFillColor(black);
  doc.circle(x,y,radius,"");
  doc.circle(x,y,radius* 0.9,"F");
  doc.setTextColor(255,255,255);
  doc.setFontSize(11);
  doc.text(x -1, y + 1.3, number);
}
function drawFingerings(x,y,fingerings, melodyNotes) {
  if(fingerings!== null) {
    for(let i=0; i<fingerings.length; i++) {
      if(fingerings[i] == 1) {
        var fret = Math.floor(i/strings);
        var string = i % strings;
        var fretY = fret*(height/frets) + y + (height/frets)/2;

        var stringX = string*(width/(strings-1)) + x;
        var radius = 2;
        var fill = "F";
        var black = 0;
        doc.setDrawColor(black);
        doc.setFillColor(black);
        doc.circle(stringX,fretY,radius,fill);
      } // END if fingerings
      if(fingerings[i] == 10) {
        var fret = Math.floor(i/strings);
        var string = i % strings;
        var fretY = fret*(height/frets) + y + (height/frets)/2;
        var stringX = string*(width/(strings-1)) + x;

        var melodyNumber = 1 + melodyNotes.indexOfValue(i) + "";
        var radius = 2;
        var fill = "";
        var black = 0;
        var white = 255;
        doc.setDrawColor(white);
        doc.setFillColor(white);
        doc.circle(stringX,fretY,radius,"F");
        doc.setDrawColor(black);
        doc.setFillColor(black);
        doc.circle(stringX,fretY,radius,"");

        doc.setFontSize(11);
        doc.setTextColor(0,0,0);
        doc.text(stringX -1, fretY + 1.3, melodyNumber);
      } // END if fingerings 10
      if(fingerings[i] == 11) {
        var fret = Math.floor(i/strings);
        var string = i % strings;
        var fretY = fret*(height/frets) + y + (height/frets)/2;
        var stringX = string*(width/(strings-1)) + x;
        var melodyNumber = 1 + melodyNotes.indexOfValue(i) + "";

        drawSolidMelodyNote(stringX,fretY,melodyNumber);
        // var radius = 2;
        // var fill = "F";
        // var black = 0;
        // var white = 255;
        // doc.setDrawColor(white);
        // doc.setFillColor(white);
        // doc.circle(stringX,fretY,radius,"F");
        // doc.setDrawColor(black);
        // doc.setFillColor(black);
        // doc.circle(stringX,fretY,radius,"");
        // doc.circle(stringX,fretY,radius* 0.9,"F");
        // doc.setTextColor(255,255,255);
        //
        // doc.setFontSize(11);
        // doc.text(stringX -1, fretY + 1.3, melodyNumber);
      } // END if fingerings 11
    } // END for fingerings.length
  } // END if fingerings!== null
  doc.setTextColor(0,0,0);
} // END function  drawFingerings()

function drawOpenStringsSymbols(x,y, openStrings) {
  doc.setTextColor(0,0,0);
  if(openStrings!== null) {
    y--; // spaces "o"/"x" just above chord
    for(let i=0; i<openStrings.length; i++) {
      if(openStrings[i] > 0) {
        var string = x + i*(width/(strings-1));
        if(openStrings[i] == 1) {
          drawCenteredText("o", string,y, 8);
        } else if (openStrings[i] == 2) {
          drawCenteredText("x", string,y, 8);
        } // END else if (openStrings[i] == 2)
      } // END if if(openStrings[i] > 0)
    } // END for openStrings.length
  } // END if(openStrings!== null)
} // END drawOpenStringsSymbols()

function drawFretNumber(x,y, fretNumber) {
  doc.setTextColor(0,0,0);
  if(fretNumber!== null && fretNumber > 3) {
    var offset = height/(frets*2)+1;
    x -= 3;
    fretNumber = fretNumber + "";
    drawCenteredText(fretNumber, x,y+offset, 8);
  } // END if(fretNumber!== null)
}
