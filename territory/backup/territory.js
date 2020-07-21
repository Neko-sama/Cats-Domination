'use strict';
var territory = territory || {};

territory.Game = function() {};


territory.Game.prototype = {


  create: function() {
    background = this.game.add.tileSprite(0, 0, worldWidth+400, worldHeight, 'waterBackground');
    this.game.stage.backgroundImage = background;

    drawMap(this.game);
    this.drawGui();

    cursors = this.game.input.keyboard.createCursorKeys();


  },


  drawGui: function(){
    //global
    timer = this.game.add.text(screenWidth/2-36, 0, ' 10:00 ',textStyle);
    timer.stroke = "#000000";
    timer.strokeThickness = 2;
    timer.setShadow(2, 2, "#000000", 2, true, false);
    createPanel(this.game);
    //drawInfo(this.game);

    turn=1;

  },
  update: function () {
    //verificar estado el juego
    if(gamePlayer[0].bases==0||gamePlayer[1].bases==0&&turn!=0){
      turn=0;
      if(gamePlayer[1].bases==0){
        EndGame(this.game,1);
      }else{
        EndGame(this.game,2);
      }
    }else if (timer.text=="00:00"&&turn!=0) {
      turn=0;
      var winner=playerWinner();
      EndGame(this.game,winner);
    }
    if (startgame==true&&turn!=0) {
      updateTimer(this.game,timer);

    }
    updatePanel(this.game);
    players_turn(this.game);
    if (cursors.up.isDown)
    {
        this.game.camera.y -= camVel;
    }
    else if (cursors.down.isDown)
    {
        this.game.camera.y += camVel;
    }

    if (cursors.left.isDown)
    {
        this.game.camera.x -= camVel;
    }
    else if (cursors.right.isDown)
    {
        this.game.camera.x += camVel;
    }
    updateResourses(this.game);
  },


  render: function() {

    //this.game.debug.cameraInfo(this.game.camera, 32, 32);

  },

  //listeners

    // hexOver: function(object, pointer) {
    //   if(object.terrainType!=2){
    //     object.alpha = 0.5;
    //     if(turn=!0)
    //       mostrarInfo(this.game,0,object);
    //   console.log(object.enemy);
    //   }
    //
    // },
    // hexOut: function(object, pointer) {
    //   if(object.clicked==0&&object.terrainType!=2)
    //   object.alpha = 1;
    //   mostrarInfo(this.game,1,object);
    //
    // },
    // hexCLick: function(object, pointer) {
    //   if(object.terrainType!=2&&(object.owner==turn||clicked==1)&&clicked<2)
    //     if(object.clicked==0){
    //       object.clicked = 1;
    //       if(clicked==0)
    //         originHex=object;
    //       else{
    //         finalHex=object;
    //         console.log(hex_distance(originHex, finalHex));
    //       }
    //       clicked++;
    //     }
    //     else {
    //       object.clicked = 0;
    //       clicked--;
    //     }
    //   if(clicked==2){
    //     if(!tunnelCrossing){
    //       action();
    //     }
    //     else {
    //       crossTunnel();
    //     }
    //   }
    //   if(putingBase&&clicked==1)
    //     putBase();
    // },
    //
    // //funciones de los botones de jugador rojo y azul
    //  click_endTurn: function(){
    //   moveEnemy(this.game);
    //   if(turn==1)
    //     turn=2;
    //   else {
    //     collectResources();
    //     spawnBaseArmy();
    //     turn=1;
    //   }
    // },
    // click_newBase: function(){
    //   putingBase=true;
    // }


};
