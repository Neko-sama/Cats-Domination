function updateResourses(game){
  resourseGroup.forEach(function(item) {
      item.x+=item.xVel;
      item.y+=item.yVel;
      if(item.x<item.boundlebox.x){
        item.x=item.boundlebox.x;
        var rnd = game.rnd.integerInRange(1, 3);
        switch (rnd) {
          case 1:
              item.xVel=1;
              item.yVel=0;
          break;
          case 2:
              item.xVel=0;
              item.yVel=1;
          break;
          case 3:
              item.xVel=0;
              item.yVel=-1;
          break;
          default:
            item.xVel=0;
            item.yVel=0;

        }
      }
      if(item.x>item.boundlebox.x+item.boundlebox.width){
        item.x=item.boundlebox.x+item.boundlebox.width;
        var rnd = game.rnd.integerInRange(1, 3);
        switch (rnd) {
          case 1:
              item.xVel=-1;
              item.yVel=0;
          break;
          case 2:
              item.xVel=0;
              item.yVel=1;
          break;
          case 3:
              item.xVel=0;
              item.yVel=-1;
          break;
          default:
            item.xVel=0;
            item.yVel=0;

        }
      }
      if(item.y<item.boundlebox.y){
        item.y=item.boundlebox.y;
        var rnd = game.rnd.integerInRange(1, 3);
        switch (rnd) {
          case 1:
              item.xVel=1;
              item.yVel=0;
          break;
          case 2:
              item.xVel=-1;
              item.yVel=0;
          break;
          case 3:
              item.xVel=0;
              item.yVel=1;
          break;
          default:
            item.xVel=0;
            item.yVel=0;

        }
      }
      if(item.y>item.boundlebox.y+item.boundlebox.height){
        item.y=item.boundlebox.y+item.boundlebox.height;
        var rnd = game.rnd.integerInRange(1, 3);
        switch (rnd) {
          case 1:
              item.xVel=1;
              item.yVel=0;
          break;
          case 2:
              item.xVel=-1;
              item.yVel=0;
          break;
          case 3:
              item.xVel=0;
              item.yVel=-1;
          break;
          default:
            item.xVel=0;
            item.yVel=0;

        }
      }
      if(item.x<item.boundlebox.x||item.x>item.boundlebox.x+item.boundlebox.width||item.y<item.boundlebox.y||item.y>item.boundlebox.y+item.boundlebox.height){
        var rnd = game.rnd.integerInRange(1, 3);
        switch (rnd) {
          case 1:
              item.xVel=1;
              item.yVel=0;
          break;
          case 2:
              item.xVel=0;
              item.yVel=1;
          break;
          case 3:
              item.xVel=0;
              item.yVel=-1;
          break;
          default:
            item.xVel=0;
            item.yVel=0;

        }
      }
      if(item.yVel>0)
        item.play('walkDown',resoursesSprite.frameRate,true);
      if(item.yVel<0)
        item.play('walkUp',resoursesSprite.frameRate,true);
      if(item.xVel>0)
        item.play('walkRight',resoursesSprite.frameRate,true);
      if(item.xVel<0)
        item.play('walkLeft',resoursesSprite.frameRate,true);

  }, this);
}
