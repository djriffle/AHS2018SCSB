// Define UI elements
var score;
var color = '';
var data;


let ui = {
    timerStart: document.getElementById('timerStart'),
    timer: document.getElementById('timer'),
    score: document.getElementById('score'),

    reset: document.getElementById('reset'),
    redFlag: document.getElementById('redFlag'),
    blueFlag: document.getElementById('blueFlag'),
    add10: document.getElementById('add10'),
    add50: document.getElementById('add50'),
    sub10: document.getElementById('sub10'),
    sub50: document.getElementById('sub50')



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
  
  
    

  

ui.redFlag.onclick = function () {
      ui.redFlag.style.display = 'none';
      ui.blueFlag.style.display = 'none';
      //color split     

      var redListener = firebase.database().ref('redPirate'); 
      redListener.on('value', function(snapshot) {
      
      score = snapshot.val();
      ui.score.innerText = score;
      });

      data = 'redPirate'
      ui.score.style.color = "red";
      }

ui.blueFlag.onclick = function () {
      ui.redFlag.style.display = 'none';
      ui.blueFlag.style.display = 'none';
      //color split

      var blueListener = firebase.database().ref('bluePirate'); 
      blueListener.on('value', function(snapshot) {
      
      score = snapshot.val();
      ui.score.innerText = score;
      });

      data = 'bluePirate'
      ui.score.style.color = "blue";
      }

ui.add10.onclick = function () {
      score += 10;
      ui.score.innerText= score;
      firebase.database().ref(data).set(score);
      }

ui.add50.onclick = function () {
      score += 50;
      ui.score.innerText= score;
      firebase.database().ref(data).set(score);
      }

ui.sub10.onclick = function () {
      score -= 10;
      ui.score.innerText= score;
      firebase.database().ref(data).set(score);
      }

ui.sub50.onclick = function () {
      score -= 50;
      ui.score.innerText= score;
      firebase.database().ref(data).set(score);
      }




//





