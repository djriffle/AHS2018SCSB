 // Define UI elements
var time;
var ti;
var red = 0;
var blue = 0;

var seconds;
var minutes;
var secondsDistance;
var minutesDistance;

var bt1on;
var bt2on;
var rt1on;
var rt2on;

var bt1countdownSecondsDistance;
var bt1Switch = false;
var bt2countdownSecondsDistance;
var bt2Switch = false;

var rt1countdownSecondsDistance;
var rt1Switch = false;
var rt2countdownSecondsDistance;
var rt2Switch = false;

var b1c;
var b2c;
var r1c;
var r2c;

if(bt1on)
{
  ui.frontBlueTimer1.style.display = 'none'; 
}

var endSound = new Audio('final.mp3');
var finalSound = new Audio('end.mp3');

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

  var bt1Listener = firebase.database().ref('bt1'); 
  bt1Listener.on('value', function(snapshot) {
  bt1L = snapshot.val();
  ui.blueTimer1.innerText = bt1L;
  if(bt1L == 0)
  {
    ui.frontBlueTimer1.style.display = 'block';
    ui.blueTimer1.style.display = 'none';
    ui.frontBlueTimer1.style.color = 'purple';
    ui.frontBlueTimer1.innerText = "0";
    bt1Switch = true
    endSound.play();
  }
  if(bt1L==10)
  {
    ui.blueTimer1.innerText = "10";
    ui.blueTimer1.style.display = 'block';
    ui.frontBlueTimer1.innerText = "10";
    ui.frontBlueTimer1.style.color = 'blue';
  }
    });

  var bt2Listener = firebase.database().ref('bt2'); 
  bt2Listener.on('value', function(snapshot) {
  bt2L = snapshot.val();
  ui.blueTimer2.innerText = bt2L;
  if(bt2L == 0)
  {
    ui.frontBlueTimer2.style.display = 'block';
    ui.blueTimer2.style.display = 'none';
    ui.frontBlueTimer2.style.color = 'purple';
    ui.frontBlueTimer2.innerText = "0";
    bt2Switch = true
    endSound.play();
  }
  if(bt2L==20)
  {
     ui.blueTimer2.innerText = "20";
      ui.blueTimer2.style.display = 'block';
      ui.frontBlueTimer2.innerText = "20";
      ui.frontBlueTimer2.style.color = 'blue';
  }
    });

  var rt1Listener = firebase.database().ref('rt1'); 
  rt1Listener.on('value', function(snapshot) {
  rt1L = snapshot.val();
  ui.redTimer1.innerText = rt1L;
  if(rt1L == 0)
  {
    ui.frontRedTimer1.style.display = 'block';
    ui.redTimer1.style.display = 'none';
    ui.frontRedTimer1.style.color = 'purple';
    ui.frontRedTimer1.innerText = "0";
    rt1Switch = true
    endSound.play();
  }
   if(rt1L==10)
  {
     ui.redTimer1.innerText = "10";
      ui.redTimer1.style.display = 'block';
      ui.frontRedTimer1.innerText = "10";
      ui.frontRedTimer1.style.color = 'red';
  }
    });

  var rt2Listener = firebase.database().ref('rt2'); 
  rt2Listener.on('value', function(snapshot) {
  rt2L = snapshot.val();
  ui.redTimer2.innerText = rt2L;
  if(rt2L == 0)
  {
    ui.frontRedTimer2.style.display = 'block';
    ui.redTimer2.style.display = 'none';
    ui.frontRedTimer2.style.color = 'purple';
    ui.frontRedTimer2.innerText = "0";
    rt2Switch = true
    endSound.play();
  }
  if(rt2L==20)
  {
     ui.redTimer2.innerText = "20";
      ui.redTimer2.style.display = 'block';
      ui.frontRedTimer2.innerText = "20";
      ui.frontRedTimer2.style.color = 'red';
  }
    });
  //--------
  var bt1onListener = firebase.database().ref('bt1on'); 
  bt1onListener.on('value', function(snapshot) {
    bt1on = snapshot.val();
    if(bt1on)
      {
       ui.frontBlueTimer1.style.display = 'none'; 
      }
    else
      {
      ui.frontBlueTimer1.style.display = 'block';   
      }
    });

  if(bt1on)
    {
      ui.frontBlueTimer1.style.display = 'none';
    }
  
  var bt2onListener = firebase.database().ref('bt2on'); 
  bt2onListener.on('value', function(snapshot) {
    bt2on = snapshot.val();
    if(bt2on)
      {
       ui.frontBlueTimer2.style.display = 'none'; 
      }
    else
      {
      ui.frontBlueTimer2.style.display = 'block';   
      }
    });

  if(bt2on)
    {
      ui.frontBlueTimer2.style.display = 'none';
    }

  var rt1onListener = firebase.database().ref('rt1on'); 
  rt1onListener.on('value', function(snapshot) {
    rt1on = snapshot.val();
    if(rt1on)
      {
       ui.frontRedTimer1.style.display = 'none'; 
      }
    else
      {
      ui.frontRedTimer1.style.display = 'block';   
      }
    });

  if(rt1on)
    {
      ui.frontRedTimer1.style.display = 'none';
    }

  var rt2onListener = firebase.database().ref('rt2on'); 
  rt2onListener.on('value', function(snapshot) {
    rt2on = snapshot.val();
    if(rt2on)
      {
       ui.frontRedTimer2.style.display = 'none'; 
      }
    else
      {
      ui.frontRedTimer2.style.display = 'block';   
      }
    });

  if(rt2on)
    {
      ui.frontRedTimer2.style.display = 'none';
    }


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
    	ui.timer.style.color = "purple";
      ui.timer.innerText = "0:00";
      finalSound.play();
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
    ui.timer.style.color = 'cyan';
    firebase.database().ref('redLaser').set(0);
    firebase.database().ref('blueLaser').set(0);

    clearTimeout(b1c);
    clearTimeout(b2c);
    clearTimeout(r1c);
    clearTimeout(r2c);

    firebase.database().ref('bt1').set('10');
    firebase.database().ref('bt2').set('20');
    firebase.database().ref('rt1').set('10');
    firebase.database().ref('rt2').set('20');   

    firebase.database().ref('bt1on').set(false);
    firebase.database().ref('bt2on').set(false);
    firebase.database().ref('rt1on').set(false);
    firebase.database().ref('rt2on').set(false);
}

document.addEventListener('keydown', function(event) {
    if(event.keyCode == 65) {
        if(red < 999)
        {
        red += 50;
        firebase.database().ref('redLaser').set(red);
        ui.redScore.innerText = red;
        }
    }
    else if(event.keyCode == 75) {
        if(blue < 999)
        {
        blue += 50;
        firebase.database().ref('blueLaser').set(blue);
        ui.blueScore.innerText = blue;
        }

    }
    else if(event.keyCode == 83) {
        if(red < 1001 && red > 0)
        {
        red -= 50;
        firebase.database().ref('redLaser').set(red);
        ui.redScore.innerText = red;
        }

    }
    else if(event.keyCode == 76) {
        if(blue < 1001 && blue > 0)
        {
        blue -= 50;
        firebase.database().ref('blueLaser').set(blue);
        ui.blueScore.innerText = blue;
        }

    }
  });

ui.frontBlueTimer1.onclick = function () {
    if(bt1Switch)
    {
      firebase.database().ref('bt1').set(10);
      ui.blueTimer1.innerText = "10";
      ui.blueTimer1.style.display = 'block';
      ui.frontBlueTimer1.innerText = "10";
      ui.frontBlueTimer1.style.color = 'blue';
      firebase.database().ref('bt1').set(10);
      bt1Switch = false;
    }
    else
    {
    ui.frontBlueTimer1.style.display = 'none'; 

    var bt1now = new Date().getTime();
    seconds = Math.floor((bt1now % (1000 * 60)) / 1000);
    minutes = Math.floor((bt1now % (1000 * 60 * 60)) / (1000 * 60));
    
    bt1countdownSecondsDistance = (seconds + 10 + minutes * 60);
    firebase.database().ref('bt1on').set(true);
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
      firebase.database().ref('bt2').set(20);
      bt2Switch = false;
    }
    else
    {
    ui.frontBlueTimer2.style.display = 'none'; 

    var bt2now = new Date().getTime();
    seconds = Math.floor((bt2now % (1000 * 60)) / 1000);
    minutes = Math.floor((bt2now % (1000 * 60 * 60)) / (1000 * 60));
    
    bt2countdownSecondsDistance = (seconds + 20 + minutes * 60);
    firebase.database().ref('bt2on').set(true);
    blue2Countdown();
    }
}
ui.frontRedTimer1.onclick = function () {
    if(rt1Switch)
    {
      firebase.database().ref('rt1').set(10);
      ui.redTimer1.innerText = "10";
      ui.redTimer1.style.display = 'block';
      ui.frontRedTimer1.innerText = "10";
      ui.frontRedTimer1.style.color = 'red';
      firebase.database().ref('rt1').set(10);
      rt1Switch = false;
    }
    else
    {
    ui.frontRedTimer1.style.display = 'none'; 

    var rt1now = new Date().getTime();
    seconds = Math.floor((rt1now % (1000 * 60)) / 1000);
    minutes = Math.floor((rt1now % (1000 * 60 * 60)) / (1000 * 60));
    
    rt1countdownSecondsDistance = (seconds + 10 + minutes * 60);
    firebase.database().ref('rt1on').set(true);
    red1Countdown();
    }
}
ui.frontRedTimer2.onclick = function () {
    if(rt2Switch)
    {
      firebase.database().ref('rt2').set(20);
      ui.redTimer2.innerText = "20";
      ui.redTimer2.style.display = 'block';
      ui.frontRedTimer2.innerText = "20";
      ui.frontRedTimer2.style.color = 'red';
      firebase.database().ref('rt2').set(20);
      rt2Switch = false;
    }
    else
    {
    ui.frontRedTimer2.style.display = 'none'; 

    var rt2now = new Date().getTime();
    seconds = Math.floor((rt2now % (1000 * 60)) / 1000);
    minutes = Math.floor((rt2now % (1000 * 60 * 60)) / (1000 * 60));
    
    rt2countdownSecondsDistance = (seconds + 20 + minutes * 60);
    firebase.database().ref('rt2on').set(true);
    red2Countdown();
    }
}




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
      firebase.database().ref('bt1').set(0);
      bt1Switch = true

      endSound.play();

      clearTimeout(b1c);
    }
    else {
      
      ui.blueTimer1.innerText = bt1countdownSeconds;
      firebase.database().ref('bt1').set(bt1countdownSeconds);
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
      firebase.database().ref('bt2').set(0);
      endSound.play();

      clearTimeout(b2c);
    }
    else {
      
      ui.blueTimer2.innerText = bt2countdownSeconds;
      firebase.database().ref('bt2').set(bt2countdownSeconds);
      b2c = setTimeout(blue2Countdown, 1000); // check again in a second
    }
}

var red1Countdown = function(){
    var rt1now = new Date().getTime();
    var rt1countdownSeconds = Math.floor((rt1now % (1000 * 60)) / 1000) + 
    Math.floor((rt1now % (1000 * 60 * 60)) / (1000 * 60)) * 60;
    rt1countdownSeconds = rt1countdownSecondsDistance - rt1countdownSeconds;

    if(rt1countdownSeconds < 1 ){
      ui.frontRedTimer1.style.display = 'block';
      ui.redTimer1.style.display = 'none';
      ui.frontRedTimer1.style.color = 'purple';
      ui.frontRedTimer1.innerText = "0";
      rt1Switch = true
      firebase.database().ref('rt1').set(0);
      endSound.play();

      clearTimeout(r1c);
    }
    else {
      firebase.database().ref('rt1').set(rt1countdownSeconds);
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
      firebase.database().ref('rt2').set(0);
      endSound.play();

      clearTimeout(r2c);
    }
    else {
      //firebase.database().ref('timeLaser').set(time);
      firebase.database().ref('rt2').set(rt2countdownSeconds);
      ui.redTimer2.innerText = rt2countdownSeconds;
      r2c = setTimeout(red2Countdown, 1000); // check again in a second
    }}

//





