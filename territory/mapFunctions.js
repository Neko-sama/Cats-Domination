function Tile(MapX, MapY,tile,axialX,axialY,type,rpt,game) {
    //sprite
    this.sprite = game.add.sprite(MapX,MapY,tile);
    this.sprite.inputEnabled = true;
    this.sprite.events.onInputOver.add(hexOver, this);
    this.sprite.events.onInputOut.add(hexOut, this);
    this.sprite.events.onInputDown.add(hexCLick, this);
    this.sprite.par=this;
    //tile
    this.x=axialX;
    this.y=axialY;
    this.terrainType = type;
    this.owner = 0;
    this.army = 0;
    this.base = false;
    this.defense = 0;
    this.enemy = 0;
    this.clicked = false;
    this.resoursePerTurn = rpt;
    this.idle=true;
    this.fighting=false;
    this.fightingTurn=false;
    this.camada=false;
    this.exit=null;
    this.sprites = game.add.group();
    this.drawSprite = drawSprite;
    this.destroyBase = destroyBase;
    this.drawResource = drawResource;
    this.forEachNeighbour = forEachNeighbour;
    //game
    this.game=game;
}

function destroyBase(){
  var explosion = territory.game.add.sprite(this.sprite.x+hexagonWidth/2-explosionSprite.width/2,this.sprite.y+hexagonHeight/2-explosionSprite.height/2,explosionSprite.spriteName);
  var explode = explosion.animations.add('animation');
  explosion.animations.play('animation', explosionSprite.frameRate, false, true);
}


function drawSprite(){
  this.sprites.removeAll();
  if(this.base){
    var base = territory.game.add.sprite(this.sprite.x+hexagonWidth/2-baseSprite.width/2,this.sprite.y+hexagonHeight/2-baseSprite.height/2,baseSprite.spriteName[this.owner]);
    var catInTheBox = base.animations.add('animation');
    base.animations.play('animation', baseSprite.frameRate, true);
    this.sprites.add(base);
  }
  else{
    if(this.owner){
        var flag = territory.game.add.sprite(this.sprite.x+hexagonWidth/2-flagSprite.width/2,this.sprite.y+hexagonHeight/2-flagSprite.height/2,flagSprite.spriteName[this.owner]);
        var flame = flag.animations.add('animation');
        flag.animations.play('animation', flagSprite.frameRate, true);
        this.sprites.add(flag);
    }
  }
  if(this.army){

      var army;
      var walk;
      if(this.army>=8){
        army = territory.game.add.sprite(this.sprite.x+hexagonWidth/2-30,this.sprite.y+hexagonHeight/2-60,catSprite.spriteName[this.owner]);
        if(this.idle){
          walk = army.animations.add('animation');
          army.animations.play('animation', catSprite.frameRate, true);
        }aws
        this.sprites.add(army);
      }
      if(this.army>=7){
        army = territory.game.add.sprite(this.sprite.x+hexagonWidth/2,this.sprite.y+hexagonHeight/2-60,catSprite.spriteName[this.owner]);
        if(this.idle){
          walk = army.animations.add('animation');
          army.animations.play('animation', catSprite.frameRate, true);
        }
        this.sprites.add(army);
      }
      if(this.army>=6){
        army = territory.game.add.sprite(this.sprite.x+hexagonWidth/2-50,this.sprite.y+hexagonHeight/2-40,catSprite.spriteName[this.owner]);
        if(this.idle){
          walk = army.animations.add('animation');
          army.animations.play('animation', catSprite.frameRate, true);
        }
        this.sprites.add(army);
      }
      if(this.army>=5){
        army = territory.game.add.sprite(this.sprite.x+hexagonWidth/2+20,this.sprite.y+hexagonHeight/2-40,catSprite.spriteName[this.owner]);
        if(this.idle){
          walk = army.animations.add('animation');
          army.animations.play('animation', catSprite.frameRate, true);
        }
        this.sprites.add(army);
      }
      if(this.army>=4){
        army = territory.game.add.sprite(this.sprite.x+hexagonWidth/2-60,this.sprite.y+hexagonHeight/2-20,catSprite.spriteName[this.owner]);
        if(this.idle){
          walk = army.animations.add('animation');
          army.animations.play('animation', catSprite.frameRate, true);
        }
        this.sprites.add(army);
      }
      if(this.army>=3){
        army = territory.game.add.sprite(this.sprite.x+hexagonWidth/2+30,this.sprite.y+hexagonHeight/2-20,catSprite.spriteName[this.owner]);
        if(this.idle){
          walk = army.animations.add('animation');
          army.animations.play('animation', catSprite.frameRate, true);
        }
        this.sprites.add(army);
      }
      if(this.army>=2){
        army = territory.game.add.sprite(this.sprite.x+hexagonWidth/2-40,this.sprite.y+hexagonHeight/2,catSprite.spriteName[this.owner]);
        if(this.idle){
          walk = army.animations.add('animation');
          army.animations.play('animation', catSprite.frameRate, true);
        }
        this.sprites.add(army);
      }
      army = territory.game.add.sprite(this.sprite.x+hexagonWidth/2+10,this.sprite.y+hexagonHeight/2,catSprite.spriteName[this.owner]);
      if(this.idle){
        walk = army.animations.add('animation');
        army.animations.play('animation', catSprite.frameRate, true);
      }
      this.sprites.add(army);
      if(this.army>=10){
        army = territory.game.add.sprite(this.sprite.x+hexagonWidth/2-30,this.sprite.y+hexagonHeight/2+20,catSprite.spriteName[this.owner]);
        if(this.idle){
          walk = army.animations.add('animation');
          army.animations.play('animation', catSprite.frameRate, true);
        }
        this.sprites.add(army);
      }
      if(this.army>=9){
        army = territory.game.add.sprite(this.sprite.x+hexagonWidth/2,this.sprite.y+hexagonHeight/2+20,catSprite.spriteName[this.owner]);
        if(this.idle){
          walk = army.animations.add('animation');
          army.animations.play('animation', catSprite.frameRate, true);
        }
        this.sprites.add(army);
      }
    }
    if(this.enemy){
      if(this.fighting){
        var enemy = territory.game.add.sprite(this.sprite.x+hexagonWidth/2-fightingSprite.width/2,this.sprite.y+hexagonHeight/2-fightingSprite.height/2,fightingSprite.spriteName);
        walk = enemy.animations.add('animation');
        enemy.animations.play('animation', fightingSprite.frameRate, true);
        this.sprites.add(enemy);
      }
      else{
        var enemy = territory.game.add.sprite(this.sprite.x+hexagonWidth/2-enemySprite.width/2,this.sprite.y+hexagonHeight/2-enemySprite.height/2,enemySprite.spriteName[this.enemy]);
        walk = enemy.animations.add('animation',enemySprite.downFrames);
        enemy.animations.play('animation', enemySprite.frameRate, true);
        this.sprites.add(enemy);
      }
    }
    if(this.camada){
      var camada = territory.game.add.sprite(this.sprite.x+hexagonWidth/2-camadaSprite.width/2,this.sprite.y+hexagonHeight/2-camadaSprite.height/2,camadaSprite.spriteName[this.camada]);
      // walk = enemy.animations.add('animation',enemySprite.downFrames);
      // enemy.animations.play('animation', enemySprite.frameRate, true);
      this.sprites.add(camada);
    }
}

function drawResource(){
  if(this.terrainType==1){
      var resourseSprite = territory.game.add.sprite(this.sprite.x+hexagonWidth/4,this.sprite.y,resoursesSprite.spriteName[1]);
      resourseSprite.animations.add('walkDown',resoursesSprite.downFrames);
      resourseSprite.animations.add('walkLeft',resoursesSprite.leftFrames);
      resourseSprite.animations.add('walkRight',resoursesSprite.rightFrames);
      resourseSprite.animations.add('walkUp',resoursesSprite.upFrames);
      resourseSprite.boundlebox = new Object();
      resourseSprite.boundlebox.x = this.sprite.x-25+hexagonWidth/4;
      resourseSprite.boundlebox.y = this.sprite.y+25;
      resourseSprite.boundlebox.width =hexagonWidth/2;
      resourseSprite.boundlebox.height = hexagonHeight/3 ;
      resourseSprite.xVel=0;
      resourseSprite.yVel=1;
      resourseGroup.add(resourseSprite);
  }
}

function forEachNeighbour(forEachFunction){
  for(var i = 1;i<=6;i++){
    var neighbour = hex_neighbor(this,i);
    if(neighbour!=null){
      forEachFunction(neighbour);
    }
  }
}


function mapForEach(forEachFunction,radius){
  for (var x = -radius; x <= radius; x++) {
    var y1 = Math.max(-radius, -x - radius);
    var y2 = Math.min(radius, -x + radius);
    for (var y = y1; y <= y2; y++) {
        forEachFunction(this[x][y]);
    }
  }
}

function mapGetRandom(){
  var flag=true;
  while(flag){
    var rndx = territory.game.rnd.integerInRange(-map_radius,map_radius);
    var rndy = territory.game.rnd.integerInRange(-map_radius,map_radius);
    if(this[rndx][rndy]){
      flag=false;
    }
  }
  return this[rndx][rndy];
}



function drawMap(game){
  map = [];
  var tempx, tempy;
  map.forEach = mapForEach;
  map.getRandom = mapGetRandom;
  game.world.setBounds(0,0,worldWidth+400, worldHeight);


  var hexagonXCenter = game.world.centerX-hexagonWidth/2;
  var hexagonYCenter = game.world.centerY-hexagonHeight/2;
  for (var x = -map_radius; x <= map_radius; x++) {
    map[x]=[];
    var y1 = Math.max(-map_radius, -x - map_radius);
    var y2 = Math.min(map_radius, -x + map_radius);
    for (var y = y1; y <= y2; y++) {

      var hexagonX = hexagonXCenter+sectorWidth*x;
      var hexagonY = hexagonYCenter+hexagonHeight*y+hexagonHeight*0.5*x;
      var rndIndex = 1;
      if(x!=0&&y!=0){
        map[x][y]=map[tempx][tempy];
        var flag = false;
        map[x][y].forEachNeighbour(function(neighbour){if(neighbour.terrainType==2) flag=true;})
        if(flag){
          rndIndex = 2;
        }
      }
      var type = game.rnd.pick(map_composition[rndIndex]);
      var tile;
      switch(type) {
        case 1:
        tile = "neutralHexagon"
        break;
        case 2:
        tile = "waterHexagon"
        break;
        default:
        tile = "neutralHexagon"
      }
      var rtp;
      if(type==1){
        rtp=5;
      }
      else{
        rtp=0;
      }
      tempx=x;
      tempy=y;

      var mapTile = new Tile(hexagonX,hexagonY,tile,x,y,type,rtp,game);
      map[x][y] = mapTile;
      //map[x][y] = Tile(hexagonX,hexagonY,tile,x,y,type,rtp,game);
      //this.drawSprite(hexagonX,hexagonY,false,1,false)

    }
  }

  resourseGroup = game.add.group();
  initializeTeams();
  putTunel();
  spawnEnemy();
  spawnCamada();
  drawResources();
  drawSprites();
}


function drawSprites(){

  map.forEach(function(item) {
    item.drawSprite();
  }, map_radius);
}
function drawResources(){

  map.forEach(function(item) {
    item.drawResource();
  }, map_radius);
}

function  initializeTeams(){
  var flag = true;
  while(flag){
    var redBase = map.getRandom();
    if(redBase.x<map_radius/2&&redBase.y<map_radius/2)
      continue;
    if(redBase.terrainType==0&&(Math.abs(redBase.x)<map_radius&&Math.abs(redBase.y)<map_radius&&Math.abs(redBase.x)+Math.abs(redBase.y)<map_radius)){
      redBase.forEachNeighbour(function(item) {
         item.owner=1;
         item.army=1;
         item.terrainType=0;
         item.sprite.loadTexture("neutralHexagon");
         item.drawSprite();
         gamePlayer[0].territories++;
         gamePlayer[0].army++;
      });
      if(flag){
        redBase.base=true;
        redBase.defense=startDef;
        redBase.owner=1;
        redBase.drawSprite();
        gamePlayer[0].bases++;
        gamePlayer[0].territories++;
      }
      flag=!flag;
    }
  }

  flag = true;
  while(flag){
    var blueBase = map.getRandom();
    if(blueBase.terrainType==0&&(Math.abs(blueBase.x)<map_radius&&Math.abs(blueBase.y)<map_radius&&Math.abs(blueBase.x)+Math.abs(blueBase.y)<map_radius)&&hex_distance(redBase,blueBase)>map_radius){
      blueBase.forEachNeighbour(function(item) {
         item.owner=2;
         item.army=1;
         item.terrainType=0;
         item.sprite.loadTexture("neutralHexagon");
         item.drawSprite();
         gamePlayer[1].territories++;
         gamePlayer[1].army++;
      });
      if(flag){
        blueBase.base=true;
        blueBase.defense=startDef;
        blueBase.owner=2;
        blueBase.drawSprite();
        gamePlayer[1].bases++;
        gamePlayer[1].territories++;
      }
      flag=!flag;
    }
  }
}

function putTunel(){
  var flag = true;
  while(flag){
    var originTunel = map.getRandom();
    if(originTunel.x<map_radius/2&&originTunel.y<map_radius/2)
      continue;
    flag = false;
    map.forEach(function(item){
      if(item.base){
        if(hex_distance(item,originTunel)<3){
          flag = true;
        }
      }
    },map_radius);
  }
  var finalTunel;
  flag = true;
  while(flag){
    finalTunel = map.getRandom();
    if(hex_distance(originTunel,finalTunel)>map_radius){
      flag = false;
      map.forEach(function(item){
        if(item.base&&hex_distance(item,finalTunel)<3){
            flag = true;
        }
      },map_radius);
    }

  }
  originTunel.exit = finalTunel;
  finalTunel.exit = originTunel;
  originTunel.terrainType=3;
  finalTunel.terrainType=3;
  originTunel.sprite.loadTexture("tunelHexagon");
  finalTunel.sprite.loadTexture("tunelHexagon");

}

function spawnBaseArmy(){
  var neighbour;
  map.forEach(function(hexagon) {
   if(hexagon.base){
     hexagon.forEachNeighbour(function(neighbour){
        if(neighbour.army<10&&neighbour.owner==hexagon.owner&&gamePlayer[neighbour.owner-1].recursos>=armyCost){
          neighbour.army++;
          gamePlayer[neighbour.owner-1].army++;
          gamePlayer[neighbour.owner-1].recursos-=armyCost;
          if(gamePlayer[neighbour.owner-1].raza=="Persa"&&gamePlayer[neighbour.owner-1].recursos>=armyCost&&neighbour.army<10&&neighbour.owner==hexagon.owner){
            neighbour.army++;
            gamePlayer[neighbour.owner-1].army++;
            gamePlayer[neighbour.owner-1].recursos-=armyCost;
          }
          neighbour.drawSprite();
        }
      });
   }
  }, map_radius);
}

function spawnBaseArmyNoCost(){
  var neighbour;
  map.forEach(function(hexagon) {
   if(hexagon.base){
     hexagon.forEachNeighbour(function(neighbour){
        if(neighbour.army<10&&neighbour.owner==hexagon.owner&&neighbour.owner==turn){
          neighbour.army++;
          gamePlayer[neighbour.owner-1].army++;
          neighbour.drawSprite();
        }
      });
   }
  }, map_radius);
}

function resetIdleState(){
  map.forEach(function(hexagon) {
    if(hexagon.fighting){
      if(turns>hexagon.fightingTurn+2){
        hexagon.fighting=false;
        hexagon.idle=false;
        hexagon.fightingTurn=0;
        hexagon.biggestEnemy=0;
        hexagon.drawSprite();
      }
    }
    else{
      hexagon.idle=true;
    }
    hexagon.drawSprite();
  }, map_radius);
}


function collectResources(){
  map.forEach(function(hexagon) {
    if(hexagon.terrainType==1&&hexagon.owner>0){
      gamePlayer[hexagon.owner-1].recursos+=hexagon.resoursePerTurn;
    }
  }, map_radius);
}
