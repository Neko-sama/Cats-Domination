function spawnCamada(){
  if(camadasSpawned*10<turns){
    if(turns>camadasSpawned*10+10||Math.abs(territory.game.rnd.normal())>.90){
      if(camadasSpawned<10)
        var ary=[1,2];
      else {
        var ary=[2,1];
      }
      var type = territory.game.rnd.weightedPick(ary);
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
            hexagon.camada = type;
            hexagon.drawSprite();
            break;
          }
        }
      }
      camadasSpawned++;
      console.log("spawned " + hexagon.x + " " + hexagon.y);
    }
  }
}
