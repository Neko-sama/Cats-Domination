var hexowner;
var hextype;
var graphics1;
var graphics2;
var frame1;
var frame2;
var frameinfo1;
var frameinfo2;


function mostrarInfo(game,state,hexagon){
  var textowner;
  var texttype;
  if(hexagon.owner==0){
    textowner="El terreno no tiene dueño.";
  }else{
    var textarmy;
    if(hexagon.base==false){
      if(hexagon.army==0){
        textarmy="El terreno no tene ejercito.";
      }else{
        textarmy="Tiene "+hexagon.army+" ejercitos.";
      }
      textowner="Pertenece a jugador "+(hexagon.owner) + "\n"+textarmy;
    }else{
      textowner="Pertenece a jugador "+(hexagon.owner)+"\nEste Terreno tiene una base\n \nDefensa restante: "+hexagon.defense;
    }
  }
  hexowner.text = textowner;
  if(hexagon.terrainType==0){
    texttype="Normal";
  }else if (hexagon.terrainType==1) {
    texttype="Recurso"+"\nGenera "+ hexagon.resoursePerTurn+" recursos.";
    //poner cantidad de recuersos
  }else{
    texttype="Túnel";
  }
  hextype.text = "\nTipo: "+texttype;

  //territorios1 = game.add.text(0,0, "Territorios: "+gamePlayer[0].territories, { font: "20px "+panel.fontName, fill: panel.fontColor, align: "left" });
//  recursos1 = game.add.text(0,0, "Recursos: "+gamePlayer[0].recursos, { font: "20px "+panel.fontName, fill: panel.fontColor, align: "left" });
//  army1 = game.add.text(0,0, "Ejercitos: "+gamePlayer[0].army, { font: "20px "+panel.fontName, fill: panel.fontColor, align: "left" });
/*hexagonTile.owner = 0
hexagonTile.terrainType = type;
hexagonTile.base = false;
hexagonTile.defense = 0;
hexagonTile.army = 0;
*/
  if(state==0){
    hexowner.visible=true;
    hextype.visible=true;
    if(turn==1){
      hexowner.cameraOffset.setTo(panel.offset*2+20,350);
      hextype.cameraOffset.setTo(panel.offset*2+20, 350+20);
      //territorios1.cameraOffset.setTo(panel.offset+20, panel.gridSize*1.6+panel.offset+10);
      //recursos1.cameraOffset.setTo(panel.offset+20, panel.gridSize*2.2+panel.offset+10);
      //army1.cameraOffset.setTo(panel.offset+20, panel.gridSize*2.8+panel.offset+10);
    }else{
      hexowner.cameraOffset.setTo(screenWidth-170,350);
      hextype.cameraOffset.setTo(screenWidth-170, 350+20);
    }
  }else{
    hexowner.visible=false;
    hextype.visible=false;
  }
}

function EndGame(game,winnerplayer){
  var mensaje = game.add.text(0,0, "  Fin del juego \n¡Victoria del Jugador "+winnerplayer+"!", { font: "40px "+panel.fontName, fill: panel.fontColor, align: "left" });
  if(winnerplayer==0)
    mensaje.text="Fin del Juego \n¡Empate!";
  mensaje.stroke = "#000000";
  mensaje.strokeThickness = 2;
  mensaje.setShadow(2, 2, "#000000", 2, true, false);
  mensaje.fixedToCamera = true;
  mensaje.cameraOffset.setTo(screenWidth/2-100,screenHeight/2-50);
}


function playerWinner(){
  var finalscore1=gamePlayer[0].recursos*1+gamePlayer[0].territories*5+gamePlayer[0].army*1+gamePlayer[0].bases*10;
  var finalscore2=gamePlayer[1].recursos*1+gamePlayer[1].territories*5+gamePlayer[1].army*1+gamePlayer[1].bases*10;
  if(finalscore1>finalscore2){
    return 1;
  }else if(finalscore1<finalscore2){
    return 2;
  }else{
    return 0;
  }
}

function createPanel(game,hexagon){

  //panel2
  paperLeft = game.add.tileSprite(0, 0, panel.width, panel.height, paperTile.spriteName);
  paperLeft.fixedToCamera=true;
  paperLeft.cameraOffset.setTo(0,0);
  cat1 = game.add.sprite(0,0,"redCat");
  walk = cat1.animations.add('walk');
  cat1.animations.play('walk', 5, true);
  raza1 = game.add.text(0,0, gamePlayer[0].raza, { font: panel.fontSize+"px "+panel.fontName, fill: panel.fontColor, align: "left" });
  hab1 = game.add.text(0,0, "Habilidad: \nReclutamiento Acelerado", { font: "14px "+panel.fontName, fill: panel.fontColor, align: "left" });
  bases1 = game.add.text(0,0, "Bases: "+gamePlayer[0].bases, { font: "20px "+panel.fontName, fill: panel.fontColor, align: "left" });
  territorios1 = game.add.text(0,0, "Territorios: "+gamePlayer[0].territories, { font: "20px "+panel.fontName, fill: panel.fontColor, align: "left" });
  recursos1 = game.add.text(0,0, "Recursos: "+gamePlayer[0].recursos, { font: "20px "+panel.fontName, fill: panel.fontColor, align: "left" });
  army1 = game.add.text(0,0, "Ejercitos: "+gamePlayer[0].army, { font: "20px "+panel.fontName, fill: panel.fontColor, align: "left" });
  //button_move_red = game.add.button(0,0, 'moveButton', click_move, this,'over', 'out', 'down');
  //button_attack_red = game.add.button(0,0, 'attackButton', click_attack, this,'over', 'out', 'down');
  button_newbase_red = game.add.button(0,0, 'newBaseButton', click_newBase, this,'over', 'out', 'down');
  button_endturn_red = game.add.button(0,0, 'endTurnButton', click_endTurn, this,'over', 'out', 'down');


  //panel 2 items
  paperRight = game.add.tileSprite(0,0, panel.width, panel.height, paperTile.spriteName);
  paperRight.fixedToCamera=true;
  paperRight.cameraOffset.setTo(screenWidth-panel.width, 0);
  cat2 = game.add.sprite(0,0,"blueCat");
  cat2.animations.add('walk');
  cat2.animations.play('walk', 5, true);
  raza2 = game.add.text(0,0, gamePlayer[1].raza, { font: panel.fontSize+"px "+panel.fontName, fill: panel.fontColor, align: "left" });
  hab2 = game.add.text(0,0, "Habilidad: \nMovilidad Aumentada", { font: "14px "+panel.fontName, fill: panel.fontColor, align: "left" });
  bases2 = game.add.text(0,0, "Bases: "+gamePlayer[1].bases, { font: "20px "+panel.fontName, fill: panel.fontColor, align: "left" });
  territorios2 = game.add.text(0,0, "Territorios: "+gamePlayer[1].territories, { font: "20px "+panel.fontName, fill: panel.fontColor, align: "left" });
  recursos2 = game.add.text(0,0, "Recursos: "+gamePlayer[1].recursos, { font: "20px "+panel.fontName, fill: panel.fontColor, align: "left" });
  army2 = game.add.text(0,0, "Ejercitos: "+gamePlayer[1].army, { font: "20px "+panel.fontName, fill: panel.fontColor, align: "left" });
  //button_move_blue = game.add.button(0,0, 'moveButton', click_move, this,'over', 'out', 'down');
  //button_attack_blue = game.add.button(0,0, 'attackButton', click_attack,this,'over', 'out', 'down');
  button_newbase_blue = game.add.button(0,0, 'newBaseButton', click_newBase, this,'over', 'out', 'down');
  button_endturn_blue = game.add.button(0,0, 'endTurnButton', click_endTurn, this,'over', 'out', 'down');
  hexowner= game.add.text(0,0, 'Pertenece a jugador ', {font: "20 px "+panel.fontName, fill: panel.fontColor, align: "left" });
  hextype= game.add.text(0,0, 'Tipo: ', { font: "20 px "+panel.fontName, fill: panel.fontColor, align: "left" });

  //panel 1 apply stroke and shadows
  raza1.stroke = "#000000";
  raza1.strokeThickness = 2;
  raza1.setShadow(2, 2, "#000000", 2, true, false);
  hab1.stroke = "#000000";
  hab1.strokeThickness = 1;
  hab1.setShadow(1, 1, "#000000", 2, true, false);
  bases1.stroke = "#000000";
  bases1.strokeThickness = 1;
  bases1.setShadow(1, 1, "#000000", 2, true, false);
  territorios1.stroke = "#000000";
  territorios1.strokeThickness = 1;
  territorios1.setShadow(1, 1, "#000000", 2, true, false);
  recursos1.stroke = "#000000";
  recursos1.strokeThickness = 1;
  recursos1.setShadow(1, 1, "#000000", 2, true, false);
  army1.stroke = "#000000";
  army1.strokeThickness = 1;
  army1.setShadow(1, 1, "#000000", 2, true, false);

  //panel 2 apply stroke and shadows
  raza2.stroke = "#000000";
  raza2.strokeThickness = 2;
  raza2.setShadow(1, 1, "#000000", 2, true, false);
  hab2.stroke = "#000000";
  hab2.strokeThickness = 1;
  hab2.setShadow(1, 1, "#000000", 2, true, false);
  bases2.stroke = "#000000";
  bases2.strokeThickness = 1;
  bases2.setShadow(1, 1, "#000000", 2, true, false);
  territorios2.stroke = "#000000";
  territorios2.strokeThickness = 1;
  territorios2.setShadow(1, 1, "#000000", 1, true, false);
  recursos2.stroke = "#000000";
  recursos2.strokeThickness = 1;
  recursos2.setShadow(1, 1, "#000000", 1, true, false);
  army2.stroke = "#000000";
  army2.strokeThickness = 1;
  army2.setShadow(1, 1, "#000000", 1, true, false);

  //fix panel 1 to camera
  cat1.fixedToCamera = true;
  raza1.fixedToCamera = true;
  hab1.fixedToCamera = true;
  bases1.fixedToCamera = true;
  territorios1.fixedToCamera = true;
  recursos1.fixedToCamera = true;
  army1.fixedToCamera = true;
  //button_move_red.fixedToCamera = true;
  //button_attack_red.fixedToCamera = true;
  button_endturn_red.fixedToCamera = true;
  button_newbase_red.fixedToCamera = true;

  cat1.cameraOffset.setTo(panel.offset+20, panel.offset+10);
  raza1.cameraOffset.setTo(catSprite.width+20+panel.offset*2,panel.offset+10);
  hab1.cameraOffset.setTo(panel.offset+20, panel.gridSize+panel.offset+10);
  bases1.cameraOffset.setTo(panel.offset+20, panel.gridSize*2+panel.offset+10);
  territorios1.cameraOffset.setTo(panel.offset+20, panel.gridSize*2.6+panel.offset+10);
  recursos1.cameraOffset.setTo(panel.offset+20, panel.gridSize*3.2+panel.offset+10);
  army1.cameraOffset.setTo(panel.offset+20, panel.gridSize*3.8+panel.offset+10);
  //button_move_red.cameraOffset.setTo(panel.offset+20, panel.gridSize*4+panel.offset);
  //button_attack_red.cameraOffset.setTo(panel.offset+20, panel.gridSize*5+panel.offset);
  button_newbase_red.cameraOffset.setTo(panel.offset+20, panel.gridSize*6+panel.offset);
  button_endturn_red.cameraOffset.setTo(panel.offset+20, panel.gridSize*12+panel.offset);

  cat2.fixedToCamera = true;
  raza2.fixedToCamera = true;
  hab2.fixedToCamera = true;
  bases2.fixedToCamera = true;
  territorios2.fixedToCamera = true;
  recursos2.fixedToCamera = true;
  army2.fixedToCamera = true;
  timer.fixedToCamera = true;
  //button_move_blue.fixedToCamera = true;
  //button_attack_blue.fixedToCamera = true;
  button_endturn_blue.fixedToCamera = true;
  button_newbase_blue.fixedToCamera = true;

  //donde va ala info
  graphics1 = game.add.graphics(20,-50+3*panel.height/5);
  graphics1.lineStyle(1, 0x000000, 1);
  frameinfo1 = graphics1.drawRect(0, 20, panel.width-40, panel.height/3);
  graphics2 = game.add.graphics(20,-50+3*panel.height/5);
  graphics2.lineStyle(1, 0x000000, 1);
  frameinfo2 = graphics2.drawRect(screenWidth - panel.width, 20, panel.width-40 , panel.height/3);
  frameinfo1.fixedToCamera = true;
  frameinfo2.fixedToCamera = true;
  //mostrar infro
  //panel 1 apply stroke and shadows
  hexowner.stroke = "#000000";
  hexowner.strokeThickness = 2;
  hexowner.setShadow(2, 2, "#000000", 2, true, false);
  hextype.stroke = "#000000";
  hextype.strokeThickness = 2;
  hextype.setShadow(2, 2, "#000000", 2, true, false);
  //territorios1.stroke = "#000000";
  //territorios1.strokeThickness = 1;
  //territorios1.setShadow(1, 1, "#000000", 2, true, false);
  //recursos1.stroke = "#000000";
  //recursos1.strokeThickness = 1;
  //recursos1.setShadow(1, 1, "#000000", 2, true, false);
  //army1.stroke = "#000000";
  //army1.strokeThickness = 1;
  //army1.setShadow(1, 1, "#000000", 2, true, false);

  //fix panel 1 to camera

  hexowner.fixedToCamera = true;
  hextype.fixedToCamera = true;
  hexowner.visible=false;
  hextype.visible=false;
  //territorios1.fixedToCamera = true;
  //recursos1.fixedToCamera = true;
  //army1.fixedToCamera = true;
  //marcos
  graphics1 = game.add.graphics(panel.width, panel.height);
  graphics1.lineStyle(panel.borderSize, 0x880000, 1);
  frame1 = graphics1.drawRect(panel.borderSize/2, 0, panel.width - panel.borderSize, panel.height);
  graphics2 = game.add.graphics(panel.width, panel.height);

  graphics2.lineStyle(panel.borderSize, 0x000088, 1);
  frame2 = graphics2.drawRect(screenWidth - panel.width+panel.borderSize/2, 0, panel.width - panel.borderSize, panel.height);

  frame1.fixedToCamera = true;
  frame1.cameraOffset.setTo(0,0);
  frame2.fixedToCamera = true;
  frame2.cameraOffset.setTo(0,0);

  cat2.cameraOffset.setTo(screenWidth - panel.width + panel.offset+20, panel.offset+10);
  raza2.cameraOffset.setTo(screenWidth - panel.width +catSprite.width+20+panel.offset*2, panel.offset+10);
  hab2.cameraOffset.setTo(screenWidth - panel.width+20+panel.offset,panel.gridSize+panel.offset+10);
  bases2.cameraOffset.setTo(screenWidth - panel.width+20+panel.offset,panel.gridSize*2+panel.offset+10);
  territorios2.cameraOffset.setTo(screenWidth - panel.width+panel.offset+20, panel.gridSize*2.6+panel.offset+10);
  recursos2.cameraOffset.setTo(screenWidth - panel.width+panel.offset+20, panel.gridSize*3.2+panel.offset+10);
  army2.cameraOffset.setTo(screenWidth - panel.width+panel.offset+20, panel.gridSize*3.8+panel.offset+10);
  //button_move_blue.cameraOffset.setTo(screenWidth - panel.width + panel.offset+20, panel.gridSize*4+panel.offset);
  //button_attack_blue.cameraOffset.setTo(screenWidth - panel.width + panel.offset+20, panel.gridSize*5+panel.offset);
  button_newbase_blue.cameraOffset.setTo(screenWidth - panel.width + panel.offset+20, panel.gridSize*6+panel.offset);
  button_endturn_blue.cameraOffset.setTo(screenWidth - panel.width + panel.offset+20, panel.gridSize*12+panel.offset);
}

function updatePanel(game){
  //panel2
  bases1.text = "Bases: "+gamePlayer[0].bases;
  territorios1.text = "Territorios: "+gamePlayer[0].territories;
  recursos1.text = "Recursos: "+gamePlayer[0].recursos;
  army1.text = "Ejercitos: "+gamePlayer[0].army;

  //panel1
  bases2.text = "Bases: "+gamePlayer[1].bases;
  territorios2.text = "Territorios: "+gamePlayer[1].territories;
  recursos2.text = "Recursos: "+gamePlayer[1].recursos;
  army2.text = "Ejercitos: "+gamePlayer[1].army;
}

function players_turn(game){
//sistema de turnos
  if(turn==0){
  //no hay turnos
  //button_move_red.visible=false;
  //button_attack_red.visible=false;
  cat1.visible=false;
  raza1.visible=false;
  hab1.visible=false;
  bases1.visible=false;
  territorios1.visible=false;
  recursos1.visible=false;
  army1.visible=false;
  paperLeft.visible=false;
  frame1.visible=false;
  frameinfo1.visible=false;
  button_newbase_red.visible=false
  button_endturn_red.visible=false;
  //button_move_blue.visible=false;
  //button_attack_blue.visible=false;
  cat2.visible=false;
  raza2.visible=false;
  hab2.visible=false;
  bases2.visible=false;
  territorios2.visible=false;
  recursos2.visible=false;
  army2.visible=false;
  paperRight.visible=false;
  frame2.visible=false;
  frameinfo2.visible=false;
  button_newbase_blue.visible=false
  button_endturn_blue.visible=false;
  //inicio de juego

  //fin de juego
  }else if (turn==1) {
    cat1.visible=true;
    raza1.visible=true;
    hab1.visible=true;
    bases1.visible=true;
    territorios1.visible=true;
    recursos1.visible=true;
    army1.visible=true;
    paperLeft.visible=true;
    frame1.visible=true;
    frameinfo1.visible=true;

    cat2.visible=false;
    raza2.visible=false;
    hab2.visible=false;
    bases2.visible=false;
    territorios2.visible=false;
    recursos2.visible=false;
    army2.visible=false;
    paperRight.visible=false;
    frame2.visible=false;
    frameinfo2.visible=false;

    if (baseCost<=gamePlayer[0].recursos&&gamePlayer[0].bases<3){
      button_newbase_red.visible=true;
    }else {
      button_newbase_red.visible=false;
    }
    button_endturn_red.visible=true;

    //button_move_blue.visible=false;
    //button_attack_blue.visible=false;
    button_newbase_blue.visible=false
    button_endturn_blue.visible=false;
    //turno del player 1
    //acciones
    //-mover (selecciona ejercito y lo mueve a un territorio aledaño)
    //-atacar(selecciona ejercito y define objetivo enemigo)
    //-construir(selecciona un territorio propio y genera una nueva base restando recursos)

    //click boton finalizar turno player 1- entonces turn=2
  }else{

    if (baseCost<=gamePlayer[1].recursos&&gamePlayer[1].bases<3){
      button_newbase_blue.visible=true;
    }else {
      button_newbase_blue.visible=false;
    }
        button_endturn_blue.visible=true;

    //button_move_red.visible=false;
    //button_attack_red.visible=false;
    button_newbase_red.visible=false
    button_endturn_red.visible=false;
    cat2.visible=true;
    raza2.visible=true;
    hab2.visible=true;
    bases2.visible=true;
    territorios2.visible=true;
    recursos2.visible=true;
    army2.visible=true;
    paperRight.visible=true;
    frame2.visible=true;
    frameinfo2.visible=true;

    cat1.visible=false;
    raza1.visible=false;
    hab1.visible=false;
    bases1.visible=false;
    territorios1.visible=false;
    recursos1.visible=false;
    army1.visible=false;
    paperLeft.visible=false;
    frame1.visible=false;
    frameinfo1.visible=false;
    //turno del player 2
    //acciones
    //-mover (selecciona ejercito y lo mueve a un territorio aledaño)
    //-atacar(selecciona ejercito y define objetivo enemigo)
    //-construir(selecciona un territorio propio y genera una nueva base restando recursos)

    //click boton finalizar turno player 2- entonces turn=1
  }
}
