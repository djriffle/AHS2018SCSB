// Define UI elements
var time;
var ti;
var red = 0;
var blue = 0;
var seconds;
var minutes;
var secondsDistance;
var minutesDistance;

let ui = {
    session1: document.getElementById('session1'),
    session2: document.getElementById('session2'),
    session3: document.getElementById('session3')
};

//read firebase
// Set the configuration for your app
  // TODO: Replace with your project's config object
  

ui.session1.onclick = function () {
    window.location.href = "Laser Counter/index.html";
}


ui.session3.onclick = function () {
    window.location.href = "Scale Counter/index.html";
}
ui.session2 .onclick = function () {
    window.location.href = "Pirate Counter/index.html";
}

//





