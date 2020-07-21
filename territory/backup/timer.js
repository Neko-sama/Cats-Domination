
var seconds = 0;
var minutes = 0;


function updateTimer(game,timer) {

minutes = Math.floor(game.time.totalElapsedSeconds()/60) % 60;

seconds = Math.floor(game.time.totalElapsedSeconds()) % 60;


if (59-seconds < 10)
  seconds = '0' + (59-seconds);
else {
  seconds=(59-seconds);
}


if (9-minutes <= 9)
  minutes = '0'+(4 - minutes);
else if(1-minutes==0){
  minutes='00';
}
else {
  minutes=(1-minutes);
}

timer.setText(minutes + ':'+ seconds);

}
