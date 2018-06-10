// Define UI elements
var time;
var ti;
var red = 0;
var blue = 0;

var seconds;
var minutes;
var secondsDistance;
var minutesDistance;

var bt1countdownSecondsDistance;
var bt1Switch = false;
var bt2countdownSecondsDistance;
var bt2Switch = false;

var rt1countdownSecondsDistance;
var rt1Switch = false;
var rt2countdownSecondsDistance;
var rt2Switch = false;

var endSound = new Audio('final.mp3');

let ui = {
    timerStart: document.getElementById('timerStart'),
    timer: document.getElementById('timer'),
    blueScore: document.getElementById('blueScore'),
    redScore: document.getElementById('redScore'),
    reset: document.getElementById('reset'),
    frontRedTimer1: document.getElementById('frontRedLaserTimer1'),
    frontRedTimer2: document.getElementById('frontRedLaserTimer2'),
    frontBlueTimer1: document.getElementById('frontBlueLaserTimer1'),
    frontBlueTimer2: document.getElementById('frontBlueLaserTimer2'),
    redTimer1: document.getElementById('redLaserTimer1'),
    redTimer2: document.getElementById('redLaserTimer2'),
    blueTimer1: document.getElementById('blueLaserTimer1'),
    blueTimer2: document.getElementById('blueLaserTimer2'),

};

//ui.frontBlueTimer2.style.display = 'none'
//read firebase
// Set the configuration for your app
  // TODO: Replace with your project's config object
  var config = {
    databaseURL: "https://scoreboard2383.firebaseio.com/",
  };
  firebase.initializeApp(config);

  // Get a reference to the database service
  var database = firebase.database();
  
  var redListener = firebase.database().ref('redLaser'); 
  redListener.on('value', function(snapshot) {
  red = snapshot.val();
  redScore.innerText = red;
    });

  var offListener = firebase.database().ref('offLaser'); 
  offListener.on('value', function(snapshot) {
  off = snapshot.val();
    });

  var blueListener = firebase.database().ref('blueLaser'); 
  blueListener.on('value', function(snapshot) {
  blue = snapshot.val();
  blueScore.innerText = blue;
    });

  var timeListener = firebase.database().ref('timeLaser'); 
  timeListener.on('value', function(snapshot) {
  time = snapshot.val();
  timer.innerText = time;
    });

ui.timerStart.onclick = function () {
    if(off)
    {

    var startSound = new Audio('startSound.mp3');
    startSound.play();
    firebase.database().ref('offLaser').set(false);
    off = false
    var now = new Date().getTime();
    seconds = Math.floor((now % (1000 * 60)) / 1000);
    minutes = Math.floor((now % (1000 * 60 * 60)) / (1000 * 60));
    secondsDistance = seconds;
    minutesDistance =  minutes + 2;
    
    ui.timer.innerText = time;
    timeDestroyer();
    }
  
}

var timeDestroyer = function(){
    var now = new Date().getTime();
    seconds = Math.floor((now % (1000 * 60)) / 1000);
    minutes = Math.floor((now % (1000 * 60 * 60)) / (1000 * 60));
    seconds = secondsDistance - seconds;
    minutes = minutesDistance - minutes;
    
    if(seconds < 0)
    {
      seconds += 60;
      minutes--;
    }

    if(seconds <1 && minutes <1){
    	ui.timer.style.color = "red";
      ui.timer.innerText = "0:00";
      clearTimeout(ti);
    }
    else {
      if(seconds < 10)
      {
      time = minutes +":0" + seconds;
      }
      else
      {
      time = minutes +":" + seconds;
      }
      firebase.database().ref('timeLaser').set(time);
    	ui.timer.innerText = time;
      ti = setTimeout(timeDestroyer, 1000); // check again in a second
    }
}

ui.reset.onclick = function () {
    firebase.database().ref('offLaser').set(true);
    off = true;
    clearTimeout(ti);
    firebase.database().ref('timeLaser').set('2:00');
    firebase.database().ref('redLaser').set('0');
    firebase.database().ref('blueLaser').set('0');
}

document.addEventListener('keydown', function(event) {
    if(event.keyCode == 13) {
        if(red < 999)
        {
        red++;
        firebase.database().ref('redLaser').set(red);
        ui.redScore.innerText = red;
        }
    }
    else if(event.keyCode == 16) {
        if(blue < 999)
        {
        blue++;
        firebase.database().ref('blueLaser').set(blue);
        ui.blueScore.innerText = blue;
        }

    }

ui.frontBlueTimer1.onclick = function () {
    if(bt1Switch)
    {
      ui.blueTimer1.innerText = "10";
      ui.blueTimer1.style.display = 'block';
      ui.frontBlueTimer1.innerText = "10";
      ui.frontBlueTimer1.style.color = 'blue';
    }
    else
    {
    ui.frontBlueTimer1.style.display = 'none'; 

    var bt1now = new Date().getTime();
    seconds = Math.floor((bt1now % (1000 * 60)) / 1000);
    minutes = Math.floor((bt1now % (1000 * 60 * 60)) / (1000 * 60));
    //So why do I subtract 50 cause time is in base 60 and the minutes will mess us up
    bt1countdownSecondsDistance = (seconds + 10 + minutes * 60);

    blue1Countdown();
    }
}
ui.frontBlueTimer2.onclick = function () {
    if(bt2Switch)
    {
      ui.blueTimer2.innerText = "20";
      ui.blueTimer2.style.display = 'block';
      ui.frontBlueTimer2.innerText = "20";
      ui.frontBlueTimer2.style.color = 'blue';
    }
    else
    {
    ui.frontBlueTimer2.style.display = 'none'; 

    var bt2now = new Date().getTime();
    seconds = Math.floor((bt2now % (1000 * 60)) / 1000);
    minutes = Math.floor((bt2now % (1000 * 60 * 60)) / (1000 * 60));
    //So why do I subtract 50 cause time is in base 60 and the minutes will mess us up
    bt2countdownSecondsDistance = (seconds + 20 + minutes * 60);

    blue2Countdown();
    }
}
ui.frontRedTimer1.onclick = function () {
    if(rt1Switch)
    {
      ui.redTimer1.innerText = "10";
      ui.redTimer1.style.display = 'block';
      ui.frontRedTimer1.innerText = "10";
      ui.frontRedTimer1.style.color = 'bred';
    }
    else
    {
    ui.frontRedTimer1.style.display = 'none'; 

    var rt1now = new Date().getTime();
    seconds = Math.floor((rt1now % (1000 * 60)) / 1000);
    minutes = Math.floor((rt1now % (1000 * 60 * 60)) / (1000 * 60));
    //So why do I subtract 50 cause time is in base 60 and the minutes will mess us up
    rt1countdownSecondsDistance = (seconds + 10 + minutes * 60);

    red1Countdown();
    }
}
ui.frontRedTimer2.onclick = function () {
    if(rt2Switch)
    {
      ui.redTimer2.innerText = "20";
      ui.redTimer2.style.display = 'block';
      ui.frontRedTimer2.innerText = "20";
      ui.frontRedTimer2.style.color = 'red';
    }
    else
    {
    ui.frontRedTimer2.style.display = 'none'; 

    var rt2now = new Date().getTime();
    seconds = Math.floor((rt2now % (1000 * 60)) / 1000);
    minutes = Math.floor((rt2now % (1000 * 60 * 60)) / (1000 * 60));
    //So why do I subtract 50 cause time is in base 60 and the minutes will mess us up
    rt2countdownSecondsDistance = (seconds + 20 + minutes * 60);

    red2Countdown();
    }
}

}
);

var blue1Countdown = function(){
    var bt1now = new Date().getTime();
    var bt1countdownSeconds = Math.floor((bt1now % (1000 * 60)) / 1000) + 
    Math.floor((bt1now % (1000 * 60 * 60)) / (1000 * 60)) * 60;
    bt1countdownSeconds = bt1countdownSecondsDistance - bt1countdownSeconds;

    if(bt1countdownSeconds < 1 ){
      ui.frontBlueTimer1.style.display = 'block';
      ui.blueTimer1.style.display = 'none';
      ui.frontBlueTimer1.style.color = 'purple';
      ui.frontBlueTimer1.innerText = "0";
      bt1Switch = true

      endSound.play();

      clearTimeout(b1c);
    }
    else {
      //firebase.database().ref('timeLaser').set(time);
      ui.blueTimer1.innerText = bt1countdownSeconds;
      b1c = setTimeout(blue1Countdown, 1000); // check again in a second
    }
}

var blue2Countdown = function(){
    var bt2now = new Date().getTime();
    var bt2countdownSeconds = Math.floor((bt2now % (1000 * 60)) / 1000) + 
    Math.floor((bt2now % (1000 * 60 * 60)) / (1000 * 60)) * 60;
    bt2countdownSeconds = bt2countdownSecondsDistance - bt2countdownSeconds;

    if(bt2countdownSeconds < 1 ){
      ui.frontBlueTimer2.style.display = 'block';
      ui.blueTimer2.style.display = 'none';
      ui.frontBlueTimer2.style.color = 'purple';
      ui.frontBlueTimer2.innerText = "0";
      bt2Switch = true

      endSound.play();

      clearTimeout(b2c);
    }
    else {
      //firebase.database().ref('timeLaser').set(time);
      ui.blueTimer2.innerText = bt2countdownSeconds;
      b2c = setTimeout(blue2Countdown, 1000); // check again in a second
    }
}

var red1Countdown = function(){
    var rt1now = new Date().getTime();
    var rt1countdownSeconds = Math.floor((rt1now % (1000 * 60)) / 1000) + 
    Math.floor((rt1now % (1000 * 60 * 60)) / (1000 * 60)) * 60;
    rt1countdownSeconds = rt1countdownSecondsDistance - rt1countdownSeconds;

    if(rt1countdownSeconds == -1 ){
      ui.frontredTimer1.style.display = 'block';
      ui.redTimer1.style.display = 'none';
      ui.frontRedTimer1.style.color = 'purple';
      ui.frontRedTimer1.innerText = "0";
      rt1Switch = true

      endSound.play();

      clearTimeout(r1c);
    }
    else if(rt1countdownSeconds == 0 ){
      ui.frontredTimer1.style.display = 'block';
      ui.redTimer1.style.display = 'none';
      ui.frontRedTimer1.style.color = 'purple';
      ui.frontRedTimer1.innerText = "0";
      rt1Switch = true

      endSound.play();

      clearTimeout(r1c);
    }
    else {
      //firebase.database().ref('timeLaser').set(time);
      ui.redTimer1.innerText = rt1countdownSeconds;
      r1c = setTimeout(red1Countdown, 1000); // check again in a second
    }
}

var red2Countdown = function(){
    var rt2now = new Date().getTime();
    var rt2countdownSeconds = Math.floor((rt2now % (1000 * 60)) / 1000) + 
    Math.floor((rt2now % (1000 * 60 * 60)) / (1000 * 60)) * 60;
    rt2countdownSeconds = rt2countdownSecondsDistance - rt2countdownSeconds;

    if(rt2countdownSeconds < 1 ){
      ui.frontRedTimer2.style.display = 'block';
      ui.redTimer2.style.display = 'none';
      ui.frontRedTimer2.style.color = 'purple';
      ui.frontRedTimer2.innerText = "0";
      rt2Switch = true

      endSound.play();

      clearTimeout(b2c);
    }
    else {
      //firebase.database().ref('timeLaser').set(time);
      ui.redTimer2.innerText = rt2countdownSeconds;
      r2c = setTimeout(red2Countdown, 1000); // check again in a second
    }
}
//





