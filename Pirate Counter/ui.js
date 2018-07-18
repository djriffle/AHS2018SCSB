// Define UI elements
var time;
var ti;
var red = 0;
var blue = 0;
var seconds;
var minutes;
var secondsDistance;
var minutesDistance;

var adder = false;


let ui = {
    timerStart: document.getElementById('timerStart'),
    timer: document.getElementById('timer'),
    blueScore: document.getElementById('blueScore'),
    redScore: document.getElementById('redScore'),
    reset: document.getElementById('reset'),
    leftFlag: document.getElementById('leftFlag'),
    rightFlag: document.getElementById('rightFlag'),

    rightPlus: document.getElementById('rightPlus'),
    rightMinus: document.getElementById('rightMinus'),

    leftPlus: document.getElementById('leftPlus'),
    leftMinus: document.getElementById('leftMinus'),
    redAdd: document.getElementById('redAdd'),
    blueAdd: document.getElementById('blueAdd')

};


ui.redAdd.style.display= 'none';
        ui.blueAdd.style.display= 'none';
        ui.rightMinus.style.display = 'none';
        ui.rightPlus.style.display = 'none';
        ui.leftMinus.style.display = 'none';
        ui.leftPlus.style.display = 'none';

//read firebase
// Set the configuration for your app
  // TODO: Replace with your project's config object
  var config = {
    databaseURL: "https://scoreboard2383.firebaseio.com/",
  };
  firebase.initializeApp(config);

  // Get a reference to the database service
  var database = firebase.database();
  
  var redListener = firebase.database().ref('redPirate'); 
  redListener.on('value', function(snapshot) {
  red = snapshot.val();
  redScore.innerText = red;
    });

  var offListener = firebase.database().ref('offPirate'); 
  offListener.on('value', function(snapshot) {
  off = snapshot.val();
    });

  var blueListener = firebase.database().ref('bluePirate'); 
  blueListener.on('value', function(snapshot) {
  blue = snapshot.val();
  blueScore.innerText = blue;
    });

  var timeListener = firebase.database().ref('timePirate'); 
  timeListener.on('value', function(snapshot) {
  time = snapshot.val();
  timer.innerText = time;
    });

ui.timerStart.onclick = function () {
    if(off)
    {

    var startSound = new Audio('startSound.mp3');
    startSound.play();
    firebase.database().ref('offPirate').set(false);
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
      firebase.database().ref('timePirate').set(time);
    	ui.timer.innerText = time;
      ti = setTimeout(timeDestroyer, 1000); // check again in a second
    }
}

ui.reset.onclick = function () {
    firebase.database().ref('offPirate').set(true);
    off = true;
    clearTimeout(ti);
    ui.timer.style.color = "green";
    firebase.database().ref('timePirate').set('2:00');
    firebase.database().ref('redPirate').set(0);
    firebase.database().ref('bluePirate').set(0);
}

ui.rightFlag.onclick = function () {
    if(blue < 9990)
        {
        blue +=250;
        firebase.database().ref('bluePirate').set(blue);
        ui.blueScore.innerText = blue;
        }
      }

ui.leftFlag.onclick = function () {
    if(red < 9990)
        {
        red +=250;
        firebase.database().ref('redPirate').set(red);
        ui.redScore.innerText = red;
        }
      }

ui.leftPlus.onclick = function () {
    if(red < 9990)
        {
        red += parseInt(ui.redAdd.value, 10);
        firebase.database().ref('redPirate').set(red);
        ui.redScore.innerText = red;
        }
      }

ui.leftMinus.onclick = function () {
    if(red > -9990)
        {
        red -= parseInt(ui.redAdd.value , 10);
        firebase.database().ref('redPirate').set(red);
        ui.redScore.innerText = red;
        }
      }

ui.rightPlus.onclick = function () {
    if(blue < 9990)
        {
        blue += parseInt(ui.blueAdd.value, 10);
        firebase.database().ref('bluePirate').set(blue);
        ui.blueScore.innerText = blue;
        }
      }

ui.rightMinus.onclick = function () {
    if(blue > -9990)
        {
        blue -= parseInt(ui.blueAdd.value , 10);
        firebase.database().ref('bluePirate').set(blue);
        ui.blueScore.innerText = blue;
        }
      }


document.addEventListener('keydown', function(event) {
    if(event.keyCode == 13) {
        if(red < 9990)
        {
        red += 10;
        firebase.database().ref('redPirate').set(red);
        ui.redScore.innerText = red;
        }
    }
    else if(event.keyCode == 16) {
        if(blue < 9990)
        {
        blue += 10;
        firebase.database().ref('bluePirate').set(blue);
        ui.blueScore.innerText = blue;
        }

    }

    else if(event.keyCode == 65) {
        if(!adder)
        {
        ui.redAdd.style.display= 'none';
        ui.blueAdd.style.display= 'none';
        ui.rightMinus.style.display = 'none';
        ui.rightPlus.style.display = 'none';
        ui.leftMinus.style.display = 'none';
        ui.leftPlus.style.display = 'none';

        adder = !adder;
        }

        else
        {
        ui.redAdd.style.display= 'block';
        ui.blueAdd.style.display= 'block';

        ui.rightMinus.style.display = 'block';
        ui.rightPlus.style.display = 'block';

        ui.leftMinus.style.display = 'block';
        ui.leftPlus.style.display = 'block';

        adder = !adder;
        }

    }
}
);
//





