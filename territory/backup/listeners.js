
  function hexOver(object, pointer) {
    if(object.terrainType!=2){
      object.alpha = 0.5;
      if(turn!=0)
        mostrarInfo(this.game,0,object);
    //console.log(object.enemy);
    }

  };
 function hexOut(object, pointer) {
    if(object.clicked==0&&object.terrainType!=2)
    object.alpha = 1;
    mostrarInfo(this.game,1,object);

  };
  function hexCLick(object, pointer) {
    if(object.terrainType!=2&&(object.owner==turn||clicked==1)&&clicked<2)
      if(object.clicked==0){
        object.clicked = 1;
        if(clicked==0)
          originHex=object;
        else{
          finalHex=object;
          console.log(hex_distance(originHex, finalHex));
        }
        clicked++;
      }
      else {
        object.clicked = 0;
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
    moveEnemy();
    if(turn==1)
      turn=2;
    else {
      collectResources();
      spawnBaseArmy();
      turn=1;
    }
  }
  function click_newBase(){
    putingBase=true;
  }
