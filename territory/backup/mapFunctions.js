// function drawSprite(game){
//   this.sprites.removeAll();
//   if(this.base){
//     var base= game.add.sprite(this.x+hexagonWidth/2-baseSprite.width/2,this.y+hexagonHeight/2-baseSprite.height/2,baseSprite.spriteName[this.owner]);
//     var catInTheBox = base.animations.add('animation');
//     base.animations.play('animation', baseSprite.frameRate, true);
//     this.sprites.add(base);
//   }
//   else{
//     if(this.owner){
//         var flag = game.add.sprite(this.x+hexagonWidth/2-flagSprite.width/2,this.y+hexagonHeight/2-flagSprite.height/2,flagSprite.spriteName[this.owner]);
//         var flame = flag.animations.add('animation');
//         flag.animations.play('animation', flagSprite.frameRate, true);
//         this.sprites.add(flag);
//     }
//   }
//   if(this.army){
//       var army = game.add.sprite(this.x+hexagonWidth/2+10,this.y+hexagonHeight/2,catSprite.spriteName[this.owner]);
//       var walk = army.animations.add('animation');
//       army.animations.play('animation', catSprite.frameRate, true);
//       this.sprites.add(army);
//   }
//   if(this.terrainType==1){
//       var resourseSprite = game.add.sprite(this.x+hexagonWidth/4,this.y,resoursesSprite.spriteName[1]);
//       resourseSprite.animations.add('walkDown',resoursesSprite.downFrames);
//       resourseSprite.animations.add('walkLeft',resoursesSprite.leftFrames);
//       resourseSprite.animations.add('walkRight',resoursesSprite.rightFrames);
//       resourseSprite.animations.add('walkUp',resoursesSprite.upFrames);
//       resourseSprite.boundlebox = new Object();
//       resourseSprite.boundlebox.x = this.x-25+hexagonWidth/4;
//       resourseSprite.boundlebox.y = this.y+25;
//       resourseSprite.boundlebox.width =hexagonWidth/2;
//       resourseSprite.boundlebox.height = hexagonHeight/3 ;
//       resourseSprite.xVel=0;
//       resourseSprite.yVel=1;
//       resourseGroup.add(resourseSprite);
//       //var graphics = this.game.add.graphics(0, 0);
//       //graphics.lineStyle(panel.borderSize, 0xFF0000, 1);
//       //var player1frame = graphics.drawRect(resourseSprite.boundlebox.x, resourseSprite.boundlebox.y, resourseSprite.boundlebox.width, resourseSprite.boundlebox.height);
//
//   }
//
// }

function drawMap(game){
  hexagonGroup = game.add.group();
  resourseGroup = game.add.group();
  game.world.setBounds(0,0,worldWidth+400, worldHeight);


  var hexagonXCenter = game.world.centerX-hexagonWidth/2;
  var hexagonYCenter = game.world.centerY-hexagonHeight/2;
  for (var x = -map_radius; x <= map_radius; x++) {
    var y1 = Math.max(-map_radius, -x - map_radius);
    var y2 = Math.min(map_radius, -x + map_radius);
    for (var y = y1; y <= y2; y++) {

      var hexagonX = hexagonXCenter+sectorWidth*x;
      var hexagonY = hexagonYCenter+hexagonHeight*y+hexagonHeight*0.5*x;

      var type = game.rnd.pick(map_composition);
      var tile;
      switch(type) {
        case 1:
        tile = "neutralHexagon"
        break;
        case 2:
        tile = "waterHexagon"
        open = false;
        break;
        default:
        tile = "neutralHexagon"
      }
      var hexagonTile = game.add.sprite(hexagonX,hexagonY,tile);

      hexagonTile.inputEnabled = true;
      hexagonTile.events.onInputOver.add(hexOver, this);
      hexagonTile.events.onInputOut.add(hexOut, this);
      hexagonTile.events.onInputDown.add(hexCLick, this);
      hexagonTile.axialx=x;
      hexagonTile.axialy=y;
      hexagonTile.owner = 0
      hexagonTile.terrainType = type;
      hexagonTile.base = false;
      hexagonTile.defense = 0;
      hexagonTile.army = 0;
      hexagonTile.enemy = 0;
      hexagonTile.clicked = false;
      if(type==1){
        hexagonTile.resoursePerTurn = 5;
      }
      else {
          hexagonTile.resoursePerTurn = 0;
      }
      hexagonTile.idle=true;
      hexagonTile.exit=null;
      hexagonTile.neighbour=new Array();
      hexagonTile.sprites = game.add.group();
      hexagonTile.drawSprite = function(){
        this.sprites.removeAll();
        if(this.base){
          var base= this.game.add.sprite(this.x+hexagonWidth/2-baseSprite.width/2,this.y+hexagonHeight/2-baseSprite.height/2,baseSprite.spriteName[this.owner]);
          var catInTheBox = base.animations.add('animation');
          base.animations.play('animation', baseSprite.frameRate, true);
          this.sprites.add(base);
        }
        else{
          if(this.owner){
              var flag = this.game.add.sprite(this.x+hexagonWidth/2-flagSprite.width/2,this.y+hexagonHeight/2-flagSprite.height/2,flagSprite.spriteName[this.owner]);
              var flame = flag.animations.add('animation');
              flag.animations.play('animation', flagSprite.frameRate, true);
              this.sprites.add(flag);
          }
        }
        if(this.army){
            var army = this.game.add.sprite(this.x+hexagonWidth/2+10,this.y+hexagonHeight/2,catSprite.spriteName[this.owner]);
            var walk = army.animations.add('animation');
            army.animations.play('animation', catSprite.frameRate, true);
            this.sprites.add(army);
        }
        if(this.enemy){
            var enemy = this.game.add.sprite(this.x+hexagonWidth/2-enemySprite.width/2,this.y+hexagonHeight/2-enemySprite.height/2,enemySprite.spriteName[this.enemy]);
            enemy.animations.add('walkDown',enemySprite.downFrames);
            //var walk = army.animations.add('animation');
            enemy.animations.play('walkDown', enemySprite.frameRate, true);
            this.sprites.add(enemy);
        }
      };
      hexagonTile.drawResource = function(){
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
        }
      }
      //hexagonTile.drawSprite();
      hexagonGroup.add(hexagonTile);

      //this.drawSprite(hexagonX,hexagonY,false,1,false)

    }
  }
  initializeTeams();
  //putTunel();
  spawnEnemy(game);
  drawSprites();
  drawResources();
}



function drawSprites(){

  hexagonGroup.forEach(function(item) {
   item.drawSprite();
  }, this);
};
function drawResources(){

  hexagonGroup.forEach(function(item) {
   item.drawResource();
  }, this);
};

function  initializeTeams(){
  var flag = true;
  while(flag){
    var redBase = hexagonGroup.getRandom();
    if(redBase.terrainType==0&&(Math.abs(redBase.axialx)!=map_radius&&Math.abs(redBase.axialy)!=map_radius&&Math.abs(redBase.axialx)+Math.abs(redBase.axialy)!=map_radius)){
      hexagonGroup.forEach(function(item) {
        if(hex_distance(redBase,item)==1){
         item.owner=1;
         item.army=1;
         item.terrainType=0;
         item.loadTexture("neutralHexagon");
         item.drawSprite();
         redBase.neighbour.push(hexagonGroup.getIndex(item));
         gamePlayer[0].territories++;
         gamePlayer[0].army++;
         //console.log("nuevo ej red");
        }
      }, this);
      if(flag){
        console.log("terreno rojo valido")
        redBase.base=true;
        redBase.defense=startDef;
        redBase.owner=1;
        redBase.drawSprite();
        gamePlayer[0].bases++;
        gamePlayer[0].territories++;
      }
      else
        console.log("terreno rojo invalido")
      flag=!flag;
    }
  }

  flag = true;
  while(flag){
    var blueBase = hexagonGroup.getRandom();
    if(blueBase.terrainType==0&&(Math.abs(blueBase.axialx)!=map_radius&&Math.abs(blueBase.axialy)!=map_radius&&Math.abs(blueBase.axialx)+Math.abs(blueBase.axialy)!=map_radius)&&hex_distance(redBase,blueBase)>map_radius){
      hexagonGroup.forEach(function(item) {
       if(hex_distance(blueBase,item)==1){
         item.owner=2;
         item.army=1;
         item.terrainType=0;
         item.loadTexture("neutralHexagon");
         item.drawSprite();
         gamePlayer[1].territories++;
         gamePlayer[1].army++;
         blueBase.neighbour.push(hexagonGroup.getIndex(item));
         //console.log("nuevo ej azul");
       }
      }, this);
      if(flag){
        console.log("terreno azul valido")
        blueBase.base=true;
        blueBase.defense=startDef;
        blueBase.owner=2;
        blueBase.drawSprite();
        gamePlayer[1].bases++;
        gamePlayer[1].territories++;
      }
      else
        console.log("terreno azul invalido")
      flag=!flag;
    }
  }
}

function putTunel(){
  var originTunel = hexagonGroup.getRandom();
  var finalTunel;
  var flag = true;
  while(flag){
    finalTunel = hexagonGroup.getRandom();
    if(hex_distance(originTunel,finalTunel)>map_radius*3/2)
      flag = false;
  }
  originTunel.exit = finalTunel;
  finalTunel.exit = originTunel;
  originTunel.terrainType=3;
  finalTunel.terrainType=3;
  originTunel.loadTexture("tunelHexagon");
  finalTunel.loadTexture("tunelHexagon");

}

function spawnBaseArmy(){
  var neighbour;
  hexagonGroup.forEach(function(hexagon) {
   if(hexagon.base){
     for (var i = 0; i < hexagon.neighbour.length; i++) {
        neighbour=hexagonGroup.children[hexagon.neighbour[i]];
        if(neighbour.army<10&&neighbour.owner==hexagon.owner&&gamePlayer[neighbour.owner-1].recursos>=armyCost){
          neighbour.army++;
          neighbour.drawSprite();
          gamePlayer[neighbour.owner-1].army++;
          gamePlayer[neighbour.owner-1].recursos-=armyCost;
          if(gamePlayer[neighbour.owner-1].raza=="Persa"&&gamePlayer[neighbour.owner-1].recursos>=armyCost&&neighbour.army<10&&neighbour.owner==hexagon.owner){
            neighbour.army++;
            gamePlayer[neighbour.owner-1].army++;
            gamePlayer[neighbour.owner-1].recursos-=armyCost;
          }
        }
      }
   }
  }, this);
}

function resetIdleState(){
  hexagonGroup.forEach(function(hexagon) {
    hexagon.idle=true;
  }, this);
}


function collectResources(){
  hexagonGroup.forEach(function(hexagon) {
    if(hexagon.terrainType==1&&hexagon.owner>0){
      gamePlayer[hexagon.owner-1].recursos+=hexagon.resoursePerTurn;
    }
  }, this);
}
