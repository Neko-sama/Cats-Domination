var territory = territory || {};

//screen
var screenWidth = 1200;
var screenHeight = 600;
var camVel = 20;
//IO
var cursors;
//sprites
var catSprite = {width:32,height:32,spriteName:{1:"redCat",2:"blueCat"},frameRate:5,frames:4};
var flagSprite = {width:16,height:72,spriteName:{1:"redFlag",2:"blueFlag"},frameRate:5,frames:4};
var baseSprite = {width:68,height:70,spriteName:{1:"redBase",2:"blueBase"},frameRate:5,frames:14};
var bailarinesSprite = {width:600,height:82,spriteName:"gatosBailarines",frameRate:5,frames:4};
var resoursesSprite = {width:50,height:50,spriteName:{1:"mouse",2:"bunny",3:"cook"},frameRate:5,frames:16,downFrames:[0,1,2,3],leftFrames:[4,5,6,7],rightFrames:[8,9,10,11],upFrames:[12,13,14,15]};
var enemySprite = {width:67,height:66,spriteName:{1:"wolf1",2:"wolf2"},frameRate:5,frames:16,downFrames:[0,1,2,3],leftFrames:[4,5,6,7],rightFrames:[8,9,10,11],upFrames:[12,13,14,15]};

//Map
var map_radius = 9;
var startDef=5;
var hexagonWidth = 80*2;
var hexagonHeight = 70*2;
var sectorWidth = hexagonWidth/4*3;
var sectorHeight = hexagonHeight;
var worldWidth = map_radius*2*sectorWidth+hexagonWidth;
var worldHeight = map_radius*2*hexagonHeight+hexagonHeight;
var map_composition = [0,0,0,0,0,0,1,2,2];
var hexagonGroup;
var resourseGroup;
var logoWidth = 400;
var logoHeight = 200;
var armyCost = 1;
var baseCost = 50;
//var hex_directions{{x:+1, y:0}, {x:+1, y:-1}, {x:0, y:-1}, {x:-1, y:0}, {x:-1, y:+1}, {x:0, y:+1}};



//elementos panel
var paperTile = {width:200,height:200,spriteName:'paperTile'};
var panel = {width:200, height:screenHeight, offset:5, fontSize:32, borderSize:6, fontName:"Arial", fontColor:"#FFFFFF", gridSize:45};
var textStyle = { font: "24px "+panel.fontName, fill: "#FFFFFF", align: "center"};
var paperLeft;
var cat1;
var walk;
var raza1;
var hab1;
var bases1;
var territorios1;
var recursos1;
var army1;

var paperRight;
var cat2;
var raza2;
var hab2;
var bases2;
var territorios2;
var recursos2;
var army2;

//botones
var button_move_red;
var button_attack_red;
var button_newbase_red;
var button_endturn_red;

var button_move_blue;
var button_attack_blue;
var button_newbase_blue;
var button_endturn_blue;
//variables de sistema
var timer;
var startgame=false;
var frameinfo;
var turn=1;
var moving=false;
var attacking=false;
var tunnelCrossing=false;
var clicked=0;
var originHex;
var finalHex;
var tunnelExit;
var putingBase=false;
var gamePlayer = {0:{bases:0,territories:0,army:0,recursos:0,velocity:1,raza:"Persa"},1:{bases:0,territories:0,army:0,recursos:0,velocity:2,raza:"Siames"}};

// var styles = [

//     {
//         'platform': {
//             'color': ['#a6aaad', '#e0b872', '#a3a4a6', '#d9bec3'],
//             'border': 'fill'
//         },
//         'player': {
//             'color': '#fff',
//             'border': '#000'
//         },
//         'background': '#e2e1dc'
//     }
// ];



territory.game = new Phaser.Game(screenWidth,screenHeight, Phaser.AUTO, document.getElementById('territory'), '');

territory.game.state.add('Preload', territory.Preload);
territory.game.state.add('MainMenu', territory.MainMenu);
territory.game.state.add('Game', territory.Game);
territory.game.state.start('Preload');

function drawSprite(){

  if(this.base){
    var base= this.game.add.sprite(this.x+hexagonWidth/2-baseSprite.width/2,this.y+hexagonHeight/2-baseSprite.height/2,baseSprite.spriteName[this.owner]);
    var catInTheBox = base.animations.add('animation');
    base.animations.play('animation', baseSprite.frameRate, true);
  }
  else{
    if(this.owner){
        var flag = this.game.add.sprite(this.x+hexagonWidth/2-flagSprite.width/2,this.y+hexagonHeight/2-flagSprite.height/2,flagSprite.spriteName[this.owner]);
        var flame = flag.animations.add('animation');
        flag.animations.play('animation', flagSprite.frameRate, true);
    }
  }
  if(this.army){
      var army = this.game.add.sprite(this.x+hexagonWidth/2-catSprite.width/2,this.y+hexagonHeight/2-catSprite.height/2,catSprite.spriteName[this.owner]);
      var walk = army.animations.add('animation');
      army.animations.play('animation', catSprite.frameRate, true);
  }
  if(this.terrainType==1){
      var resourseSprite = this.game.add.sprite(this.x+hexagonWidth/4,this.y,resoursesSprite.spriteName[1]);
      resourseSprite.animations.add('walkDown',resoursesSprite.downFrames);
      resourseSprite.animations.add('walkLeft',resoursesSprite.leftFrames);
      resourseSprite.animations.add('walkRight',resoursesSprite.rightFrames);
      resourseSprite.animations.add('walkUp',resoursesSprite.upFrames);
      resourseSprite.boundlebox = new Object();
      resourseSprite.boundlebox.x = this.x-25+hexagonWidth/4;
      resourseSprite.boundlebox.y = this.y+25;
      resourseSprite.boundlebox.width =hexagonWidth/2;
      resourseSprite.boundlebox.height = hexagonHeight/3 ;
      resourseSprite.xVel=0;
      resourseSprite.yVel=1;
      resourseGroup.add(resourseSprite);
      //var graphics = this.game.add.graphics(0, 0);
      //graphics.lineStyle(panel.borderSize, 0xFF0000, 1);
      //var player1frame = graphics.drawRect(resourseSprite.boundlebox.x, resourseSprite.boundlebox.y, resourseSprite.boundlebox.width, resourseSprite.boundlebox.height);

  }



}
