// Define UI elements
var time;
var ti;
var red = 0;
var blue = 0;
var off = true;
let ui = {
    timerStart: document.getElementById('timerStart'),
    timer: document.getElementById('timer'),
    blueScore: document.getElementById('blueScore'),
    redScore: document.getElementById('redScore'),
    reset: document.getElementById('reset')
};

//read firebase
// Set the configuration for your app
  // TODO: Replace with your project's config object
  var config = {
    databaseURL: "https://scoreboard2383.firebaseio.com/",
  };
  firebase.initializeApp(config);

  // Get a reference to the database service
  var database = firebase.database();
  
  var redListener = firebase.database().ref('red'); 
  redListener.on('value', function(snapshot) {
  red = snapshot.val();
  redScore.innerText = red;
    });

  var blueListener = firebase.database().ref('blue'); 
  blueListener.on('value', function(snapshot) {
  blue = snapshot.val();
  blueScore.innerText = blue;
    });

  var timeListener = firebase.database().ref('time'); 
  timeListener.on('value', function(snapshot) {
  time = snapshot.val();
  timer.innerText = time;
    });

ui.timerStart.onclick = function () {
    if(off)
    {
    time = 120
    ui.timer.innerText = time;
    timeDestroyer();
    }
}

var timeDestroyer = function(){
    
    if(time == 0){
    	ui.timer.style.color = "red";
        ui.timer.innerText = "0";
    }
    else {
    	
    	time= time - 1;
        firebase.database().ref('time').set(time);
    	ui.timer.innerText = time;
        ti = setTimeout(timeDestroyer, 1000); // check again in a second
    }
}

ui.reset.onclick = function () {
    clearTimeout(ti);
    time = 120;
    firebase.database().ref('time').set('120');
    firebase.database().ref('red').set('0');
    firebase.database().ref('blue').set('0');
}

document.addEventListener('keydown', function(event) {
    if(event.keyCode == 13) {
        red++;
        firebase.database().ref('red').set(red);
        ui.redScore.innerText = red;
    }
    else if(event.keyCode == 16) {
        blue++;
        firebase.database().ref('blue').set(blue);
        ui.blueScore.innerText = blue;

    }
}
);
//





