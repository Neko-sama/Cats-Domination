function spawnEnemy(game){
  var c = 0;
  var flag;
  while(c<1){
    flag=true;
    var hexagon = hexagonGroup.getRandom();
    if(hexagon.terrainType==0&&!hexagon.owner){
      hexagonGroup.forEach(function(neighbour) {
        if(hex_distance(hexagon,neighbour)<=3&&neighbour.base){
          flag=false;
        }
      }, this);
      if(flag){
        hexagon.enemy = game.rnd.integerInRange(1,2);
        c++;
      }
    }
  }
}

function moveEnemy(game){
  resetIdleState();
  var flag;
  var rnd = Math.floor((Math.random() * 6) + 1);
  console.log(rnd)
  hexagonGroup.forEach(function(item) {
    if(item.enemy&&item.idle){
      flag=true;
      hexagonGroup.forEach(function(neighbour) {
        if(hex_distance(item,neighbour)==1&&hex_directionBetween(item,neighbour)==rnd&&flag){
          if(neighbour.terrainType!=2||neighbour.enemy&&!neighbour.base){
            item.enemy=0;
            item.idle=false;
            neighbour.enemy=1;
            if(neighbour.owner){
              gamePlayer[neighbour.owner-1].territories--;
              gamePlayer[neighbour.owner-1].army-=neighbour.army;
              neighbour.army=0;
              neighbour.owner=0;
            }
            item.drawSprite();
            neighbour.drawSprite();
          }
          flag = false;
        }
      }, this);
    }
  }, this);
}
