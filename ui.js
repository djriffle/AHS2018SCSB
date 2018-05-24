// Define UI elements
var time;
var red = 0;
var blue = 0;
let ui = {
    timerStart: document.getElementById('timerStart'),
    timer: document.getElementById('timer'),
    blueScore: document.getElementById('blueScore'),
    redScore: document.getElementById('redScore')
    
};

ui.timerStart.onclick = function () {
    time = 120
    ui.timer.innerText = time;
    timeDestroyer();
    }

var timeDestroyer = function(){
    if(time == 0){
    	ui.timer.style.color = "red";
        ui.timer.innerText = "0";
    }
    else {
    	
    	time= time - 1;
    	ui.timer.innerText = time;
        setTimeout(timeDestroyer, 1000); // check again in a second
    }
}

document.addEventListener('keydown', function(event) {
    if(event.keyCode == 13) {
        red++;
        ui.redScore.innerText = red;
    }
    else if(event.keyCode == 16) {
        blue++;
        ui.blueScore.innerText = blue;

    }
});

