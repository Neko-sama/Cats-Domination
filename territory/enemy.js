function spawnEnemy(){
  if(spawnedEnemies*5<turns){
    if(turns>spawnedEnemies*5+5||Math.abs(territory.game.rnd.normal())<1){
      if(spawnEnemy<3)
        var ary=[1,2];
      else {
        var ary=[2,1];
      }
      var enemytype = territory.game.rnd.weightedPick(ary);
      var flag;
      while(true){
        flag=true;
        var hexagon = map.getRandom();
        if(hexagon.terrainType==0&&!hexagon.owner&&!hexagon.enemy&&!hexagon.camada){
          map.forEach(function(neighbour) {
            if(hex_distance(hexagon,neighbour)<=3&&neighbour.base){
              flag=false;
            }
          }, this);
          if(flag){
            hexagon.enemy = enemytype;
            hexagon.drawSprite();
            break;
          }
        }
      }
      spawnedEnemies++;
    }
  }
}

function moveEnemy(){
  resetIdleState();
  var flag;
  map.forEach(function(item) {
  var rnd =  territory.game.rnd.integerInRange(1,6);
    if(item.enemy&&item.idle){
      flag=true;
      if(item.enemy==2){
        eatNeigbours(item);
      }
      item.forEachNeighbour(function(neighbour){
        if(hex_directionBetween(item,neighbour)==rnd&&flag&&!neighbour.base&&neighbour.terrainType!=2){
          if(!neighbour.enemy){
            neighbour.enemy=item.enemy;
            item.enemy=0;
            neighbour.idle=false;
            if(neighbour.owner){
              gamePlayer[neighbour.owner-1].territories--;
              gamePlayer[neighbour.owner-1].army-=neighbour.army;
              neighbour.army=0;
              neighbour.owner=0;
            }
            if(neighbour.camada){
              neighbour.camada=0;
            }
            if(neighbour.enemy==2){
              eatNeigbours(neighbour);
            }
            item.drawSprite();
            neighbour.drawSprite();
            flag = false;
          }
          else{
            neighbour.fighting=true;
            neighbour.idle=true;
            neighbour.fightingTurn=turns;
            neighbour.enemy=Math.max(neighbour.enemy,item.enemy);
          }
        }
        if(item.enemy==2){
          eatNeigbours(item);
        }
      });
    }
  }, map_radius);
}

function eatNeigbours(enemy){
  enemy.forEachNeighbour(function(neighbour) {
    if(neighbour.owner&&!neighbour.base){
      gamePlayer[neighbour.owner-1].territories--;
      gamePlayer[neighbour.owner-1].army-=neighbour.army;
      neighbour.army=0;
      neighbour.owner=0;
      neighbour.drawSprite();
    }
    if(neighbour.camada){
      neighbour.camada=0;
    }
  });
}
