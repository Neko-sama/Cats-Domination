

function updateTimer() {
var tsec;
var tmin;
//console.log("tiempo que ha pasado:"+seconds);
if (seconds-1 < 10&&seconds>1){
  seconds--;
  tsec = '0' + (seconds);
}else if(seconds==0){
    seconds=59;
    tsec=seconds;
    minutes--;
}else if(seconds==1){
  seconds--;
    tsec="00";
}else{
  seconds--;
  tsec=seconds;
}
if (minutes-1 < 10)
  tmin = '0'+(minutes);
else if(minutes==0){
  tmin='00';
}else{
tmin=minutes;
}
timer.setText(tmin + ':'+ tsec);
//turnos
if(timeturn==0){
  click_endTurn();
}else{
  timeturn--;
}

}
