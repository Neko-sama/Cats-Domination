//'use strict';
// var territory = territory || {};
var prepauseturn=0;
var button_exit;
var button_return;
var button_retry;
var pause_label;
var graphics;
var frame;

territory.Game = function() {};


territory.Game.prototype = {


  create: function() {
    this.initialiceVariables();
    background = this.game.add.tileSprite(0, 0, worldWidth+400, worldHeight, 'waterBackground');
    this.game.stage.backgroundImage = background;
    drawMap(this.game);
    this.drawGui();
    gamemusic = this.game.add.audio('gamestart',0.5);
    gamemusic.play();
    this.game.time.events.add(gamemusic.durationMS-8000, backsound, this);
    var pausekey= this.game.input.keyboard.addKey(Phaser.Keyboard.P);
    pausekey.onDown.add(gamePause, this);

  },
  initialiceVariables: function(){
    gamePlayer = new Array();
    gamePlayer[0]= JSON.parse( JSON.stringify( Persa ) );
    gamePlayer[1]= JSON.parse( JSON.stringify( Siames ) );
    cursors = this.game.input.keyboard.createCursorKeys();
    turn=1;
    state=1;
    seconds = startSeconds;
    minutes = startMinutes;
    startgame=false;
    clicked=0;
    putingBase=false;
    tunnelCrossing=false;
    turns=0;
    rounds=0;
    spawnedEnemies=0;
    camadasSpawned=0;
    //paperLeft=cat1=raza1=hab1=bases1=territorios1=recursos1=army1=gamemusic=paperRight=cat2=raza2=hab2=bases2=territorios2=recursos2=army2=null;
    //botones
    //button_move_red=button_attack_red=button_newbase_red=button_endturn_red=button_move_blue=button_attack_blue=button_newbase_blue=button_endturn_blue=null;

    //variables de sistema

    //timer=null;
    //timeturn=null;
    //hexOver=null;
    //frameinfo=null;
  },
  drawGui: function(){
    //global
    gametimer= this.game.time.events.loop(Phaser.Timer.SECOND, updateTimer, this);
    timer = this.game.add.text(screenWidth/2-36, 0, ' 10:00 ',textStyle);
    timer.stroke = "#000000";
    timer.strokeThickness = 2;
    timer.setShadow(2, 2, "#000000", 2, true, false);
    createPanel(this.game);
    graphics = this.game.add.graphics(screenWidth, screenHeight);
    graphics.lineStyle(0, 0x880000, 1);
    graphics.beginFill(0xcccccc, 0.3);
    frame = graphics.drawRect(0, 0, screenWidth, screenHeight);
    frame.fixedToCamera = true;
    frame.cameraOffset.setTo(0,0);
    frame.noPause = true;
    frame.visible = false;
    turn=1;
    timeturn=30;
    button_return = this.game.add.button(screenWidth/2-100,screenHeight/2, 'return', this.click_return.bind(this), this,'over', 'out', 'down');
    button_retry = this.game.add.button(screenWidth/2-100,screenHeight/2+50, 'retry',this.click_retry.bind(this) , this,'over', 'out', 'down');
    button_exit = this.game.add.button(screenWidth/2-100,screenHeight/2+100, 'exit',this.click_exit.bind(this), this,'over', 'out', 'down');
    pause_label = this.game.add.text(screenWidth/2-100,screenHeight/2-200,'Pausa', { font: '50px Arial', fill: '#fff' , align:'center'});
    button_return.fixedToCamera = true;
    button_retry.fixedToCamera = true;
    button_exit.fixedToCamera = true;
    button_return.setDownSound(buttonsound);
    button_retry.setDownSound(buttonsound);
    button_exit.setDownSound(buttonsound);
    pause_label.stroke = "#000000";
    pause_label.strokeThickness = 2;
    pause_label.setShadow(2, 2, "#000000", 2, true, false);
    pause_label.fixedToCamera = true;
    button_return.visible = false;
    button_retry.visible = false;
    button_exit.visible = false;
    pause_label.visible = false;
    button_return.noPause = true;
    button_retry.noPause = true;
    button_exit.noPause = true;

  },
  update: function () {
    //verificar estado el juego
     if((gamePlayer[0].bases==0||gamePlayer[1].bases==0||timer.text=="00:00")&&turn!=0){
       turn=4;
       this.game.time.events.add(2000, this.endGameTime, this);
     }
    if(hexOverObject!=null)
      mostrarInfo();
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
  click_retry: function() {
    if(territory.game.paused)
      gamePause();
    gamemusic.stop();
    territory.game.state.restart();
  },
  click_exit: function() {
    if(territory.game.paused)
      gamePause();
    gamemusic.stop();
    territory.game.state.start('MainMenu');
  },
  click_return: function() {
    gamePause();
  },
  endGameTime: function(){
    if((gamePlayer[0].bases==0||gamePlayer[1].bases==0)&&turn!=0){
      turn=0;
      gamemusic.destroy();
      if(gamePlayer[1].bases==0){
        EndGame(this.game,1);
      }else{
        EndGame(this.game,2);
      }
    }else if (timer.text=="00:00"&&turn!=0) {
      turn=0;
      gamemusic.destroy();
      var winner=playerWinner();
      EndGame(this.game,winner);
    }
  }
};

// Create a label to use as a button
function gamePause() {

    if(territory.game.paused==false){
      state=1;
      prepauseturn=turn;
      turn=3;
      players_turn(territory.game);
      territory.game.paused = true;
      button_return.visible = true;
      button_retry.visible = true;
      button_exit.visible = true;
      pause_label.visible = true;
      frame.visible = true;

    }else{
      turn=prepauseturn;
      button_return.visible = false;
      button_retry.visible = false;
      button_exit.visible = false;
      pause_label.visible = false;
      frame.visible = false;

      territory.game.paused = false;
    }
  }
  function backsound() {
    gamemusic = this.game.add.audio('gamemusic2',0.4);
    gamemusic.loop = true;
    gamemusic.play();
  }
