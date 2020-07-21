
function hexOver(object, pointer) {
  //console.log(">"+object.par.x+","+object.par.y)
  if(object.par.terrainType!=2){
    object.alpha = 0.5;
    if(turn!=0)
      state=0;
      hexOverObject=object.par;
  }
};
function hexOut(object, pointer) {
  if(object.par.clicked==0&&object.par.terrainType!=2)
    object.alpha = 1;
  state=1;
};
function hexCLick(object, pointer) {
  if(object.par.terrainType!=2&&(object.par.owner==turn||clicked==1)&&clicked<2)
    if(object.par.clicked==0){
      object.par.clicked = 1;
      if(clicked==0)
        originHex=object.par;
      else{
        finalHex=object.par;
      }
      clicked++;
    }
    else {
      object.par.clicked = 0;
      clicked--;
    }
  if(clicked==2){
    if(!tunnelCrossing){
      action();
    }
    else {
      crossTunnel();
    }
  }
  if(putingBase&&clicked==1)
    putBase();
};

//funciones de los botones de jugador rojo y azul
function click_endTurn(){
  turns++;
  moveEnemy();
  spawnCamada();
  timeturn=30;
  if(turn==1)
    turn=2;
  else {
    collectResources();
    spawnBaseArmy(false);
    turn=1;
  }
  spawnEnemy();
}
function click_newBase(){
  putingBase=true;
}
