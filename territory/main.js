// var territory = territory || {};

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
var fightingSprite = {width:99,height:95,spriteName:"fight-dust",frameRate:5,frames:4};
var camadaSprite = {width:100,height:77,spriteName:{1:"camada1",2:"camada2"},frameRate:5,frames:1};
var explosionSprite = {width:96,height:96,spriteName:"explosion",frameRate:10,frames:15};

//Map
var map_composition = {1:[0,0,0,0,0,0,0,0,1,2],2:[0,0,0,0,0,0,1,2,2,2],3:[0,0,0,0,0,0,0,0,0,0]};
var map_radius = 9;
var startDef=5;
var hexagonWidth = 80*2;
var hexagonHeight = 70*2;
var sectorWidth = hexagonWidth/4*3;
var sectorHeight = hexagonHeight;
var worldWidth = map_radius*2*sectorWidth+hexagonWidth;
var worldHeight = map_radius*2*hexagonHeight+hexagonHeight;
var map;
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
var gamemusic;

var paperRight;
var cat2;
var raza2;
var hab2;
var bases2;
var territorios2;
var recursos2;
var army2;
var buttonsound;
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
var startSeconds=0;
var startMinutes=10;
var gametimer;
var timer;
var timeturn;
var state=1;
var hexOverObject=null;
var seconds = startSeconds;
var minutes = startMinutes;
var startgame=false;
var frameinfo;
var turn=1;
var clicked=0;
var originHex;
var finalHex;
var tunnelExit;
var putingBase=false;
var tunnelCrossing=false;
var turns=0;
var rounds=0;
var spawnedEnemies=0;
var camadasSpawned=0;
var gamePlayer;
var Persa = {bases:0,territories:0,army:0,recursos:0,velocity:1,raza:"Persa"};
var Siames = {bases:0,territories:0,army:0,recursos:0,velocity:2,raza:"Siames"}

//statistics
if(localStorage.getItem('Statistics')==null){
  localStorage.setItem('Statistics',1);
  localStorage.setItem('Persa.wins',0);
  localStorage.setItem('Persa.defeats',0);
  localStorage.setItem('Persa.draws',0);
  localStorage.setItem('Siames.wins',0);
  localStorage.setItem('Siames.defeats',0);
  localStorage.setItem('Siames.draws',0);
  localStorage.setItem('Game.plays',0);
}
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
territory.game.state.add('Credits', territory.Credits);
territory.game.state.add('Stats', territory.Stats);
territory.game.state.add('Game', territory.Game);
territory.game.state.start('Preload');
