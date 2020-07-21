
function uni_move(){
    if(!finalHex.base&&!finalHex.enemy){
    finalHex.army+=originHex.army;
    if(finalHex.army<10)
      originHex.army=0;
    else{
      originHex.army=finalHex.army-10;
      finalHex.army=10;
    }
  }
}
function uni_conquist(){
  var i=0;
  var j=0;
  if(turn==1){
    i=0;
    j=1;
  }else{
    i=1;
    j=0;
  }
  soundtrack = territory.game.add.audio('take');
  soundtrack.play();
  finalHex.base=false;
  finalHex.owner=originHex.owner;
  gamePlayer[i].territories++;
  if(finalHex.camada){
    spawnBaseArmyNoCost();
    if(finalHex.camada==2)
      spawnBaseArmyNoCost();
    finalHex.camada=0;
  }
}
function uni_atack(){
  var i=0;
  var j=0;
  if(turn==1){
    i=0;
    j=1;
  }else{
    i=1;
    j=0;
  }
  if(!finalHex.base){
    if(territory.game.rnd.integerInRange(0,1)==0)
      soundtrack = territory.game.add.audio('fightingcat');
    else
      soundtrack = territory.game.add.audio('screamcat');
    soundtrack.play();
    soundtrack = territory.game.add.audio('punch');
    soundtrack.play();
    soundtrack = territory.game.add.audio('cathurt');
    soundtrack.play();
    if(originHex.army>=finalHex.army){
      gamePlayer[i].army-=finalHex.army;
      gamePlayer[j].army-=finalHex.army;
      gamePlayer[j].territories--;
      originHex.army-=finalHex.army;
      finalHex.army=0;
      finalHex.owner=0;
      if(originHex.army>0){
        uni_conquist();
        uni_move();
      }
    }
    else {
      gamePlayer[i].army-=originHex.army;
      gamePlayer[j].army-=originHex.army;
      finalHex.army-=originHex.army;
      originHex.army=0;
    }
  }
  else{
    if(originHex.army>=finalHex.defense){
      gamePlayer[i].army-=finalHex.defense;
      gamePlayer[j].territories--;
      gamePlayer[j].bases--;
      originHex.army-=finalHex.defense;
      finalHex.defense=0;
      finalHex.owner=0;
      finalHex.base=0;
      soundtrack = territory.game.add.audio('punch');
      soundtrack.play();
      soundtrack = territory.game.add.audio('explosion');
      soundtrack.play();
      finalHex.destroyBase();
      if(originHex.army>0){
        uni_conquist();
        uni_move();
      }
    }
    else {
        soundtrack = territory.game.add.audio('punch');
        gamePlayer[i].army-=originHex.army;
        finalHex.defense-=originHex.army;
        originHex.army=0;
    }
  }
}

function crossTunnel(){
  if(originHex.owner==turn&&hex_distance(tunnelExit,finalHex)==1&&!finalHex.enemy){
    switch (finalHex.owner) {
      case 0:
        //si el destino no es tunel
        if(finalHex.terrainType!=3){
          if(originHex.army>0){
            uni_conquist();
            uni_move();
          }
        }
        break;
      case turn:
        uni_move();
        break;
      default:
        uni_atack();
    }
    //update hex state
    finalHex.idle=false;
  }
  //updateSprites
  originHex.drawSprite();
  finalHex.drawSprite();
  //unselect
  moving=false;
  tunnelCrossing=false;
  originHex.clicked = 0;
  finalHex.clicked = 0;
  originHex.sprite.alpha = 1;
  finalHex.sprite.alpha = 1;
  clicked=0;
}

function action(){
  // originHex.idle=true;
  if(originHex.owner==turn&&hex_distance(originHex,finalHex)<=gamePlayer[turn-1].velocity&&!finalHex.enemy&&originHex.idle){
    switch (finalHex.owner) {
      case 0:
        //si el destino no es tunel
        if(finalHex.terrainType!=3){
          if(originHex.army>0){
            uni_conquist();
            uni_move();
          }
        }
        else {
          tunnelCrossing=true;
          tunnelExit=finalHex.exit;
        }
        break;
      case turn:
        if(territory.game.rnd.integerInRange(0,1)==0)
          soundtrack = territory.game.add.audio('catmew',0.5);
        else
          soundtrack = territory.game.add.audio('catmew2',0.2);
        soundtrack.play();
        uni_move();
        break;
      default:
        uni_atack();
    }
    //update hex state
    finalHex.idle=false;
  }
  if(finalHex.terrainType!=3||!tunnelCrossing){
    //updateSprites
    originHex.drawSprite();
    finalHex.drawSprite();
    //unselect
    moving=false;
    originHex.clicked = 0;
    finalHex.clicked = 0;
    originHex.sprite.alpha = 1;
    finalHex.sprite.alpha = 1;
    clicked=0;
  }
  else{
    finalHex.clicked = 0;
    finalHex.alpha = 1;
    clicked=1;
    moving=false;
  }
}

function putBase(){
  if(!originHex.army&&originHex.owner==turn&&gamePlayer[turn-1].bases<3&&originHex.terrainType!=1){
    originHex.base=true;
    originHex.defense=startDef;
    originHex.drawSprite();
    gamePlayer[turn-1].bases++;
    gamePlayer[turn-1].recursos-=baseCost;
  }
  else{
    if(originHex.army)
      console.log("el terreno debe no puede tener ejercito");
    if(originHex.owner!=turn)
      console.log("el terreno no es tuyo");
    if(gamePlayer[turn-1].bases>=3)
      console.log("has alcanzado el limite de bases");
    if(originHex.terrainType==1)
      console.log("solo se pueden poner baces en terrenos planos");
  }
  clicked=0;
  originHex.clicked=0;
  clicked=false
  putingBase=false;
}
