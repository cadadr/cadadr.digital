// index.js

'use strict';

let satorsq = document.querySelector("div#satorsq");
let satorStr = "satorarepotenetoperarotas";

// Set up the sator square animation scene.
[...satorStr].forEach(function (char) {
  var elem = document.createElement("span");
  elem.innerText = char.toUpperCase();
  elem.setAttribute("aria-hidden", true);
  satorsq.appendChild(elem);
});

if(! window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  document.querySelectorAll("div#satorsq > span").forEach(
    function (elem) {
      loopingSator(elem);
    }
  );
}

function hoverSator (elem) {
  return (function() {
    paintElementWithRandomColour(elem);

    setTimeout(
      function() { elem.style.opacity = "0%"; },
      Math.floor(Math.random() * 5000 + 500)
    );
  });
}

function loopingSator(elem) {
  setInterval(
    function() {
      if (Math.random() > 0.6)
        paintElementWithRandomColour(elem);
      else
        elem.style.opacity = "0%";
    },
    Math.floor(Math.random() * 5000 + 500)
  )
}

function randomColourPair() {
  let r = Math.ceil(Math.random() * 255).toString(16);
  let g = Math.ceil(Math.random() * 255).toString(16);
  let b = Math.ceil(Math.random() * 255).toString(16);
  let c1 = "#" + r + g + b;
  let c2 = contrastingColour(c1);
  return [c1, c2];
}

function paintElementWithRandomColour(elem) {
  let [c1, c2] = randomColourPair();
  elem.style.background = c1;
  elem.style.color = c2
  elem.style.opacity = "70%";
}

// Adapted from: https://stackoverflow.com/a/6511606
function contrastingColour(colour) {
  let l = luma(colour);
  return (l >= 165) ? '000' : 'fff';
}

// colour can be a hx string or an array of RGB values 0-255
function luma(colour) {
  let rgb = hexToRGBArray(colour);

  // SMPTE C, Rec. 709 weightings
  return (
    (0.2126 * rgb[0]) +
      (0.7152 * rgb[1]) +
      (0.0722 * rgb[2])
  );
}

function hexToRGBArray(colour) {
  if (colour.charAt(0) === '#')
    colour = colour.substring(1);

  var rgb = [];

  for (var i = 0; i <= 2; i++)
    rgb[i] = parseInt(colour.substr(i * 2, 2), 16);

  return rgb;
}
