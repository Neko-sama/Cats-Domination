// var territory = territory || {};

territory.MainMenu = function() {};

territory.MainMenu.prototype = {
      create: function() {
          this.game.world.setBounds(0,0,screenWidth, screenHeight);
          buttonsound=this.game.add.audio('buttonpress',1);
          if(gamemusic==null ||gamemusic.name!='gamemusic'){
            gamemusic = this.game.add.audio('gamemusic',0.2);
            gamemusic.loop = true;
          }
          if(!gamemusic.isPlaying)
            gamemusic.play();

        background = this.game.add.tileSprite(0, 0, screenWidth, screenHeight, 'background');
        var bailarines = this.game.add.sprite(0,screenHeight-bailarinesSprite.height, bailarinesSprite.spriteName);
        bailarines.animations.add('bailar');
        bailarines.animations.play('bailar', 5, true);
        var bailarines2 = this.game.add.sprite(screenWidth/2,screenHeight-bailarinesSprite.height, bailarinesSprite.spriteName);
        bailarines2.animations.add('bailar');
        bailarines2.animations.play('bailar', 5, true);
        var logo = this.game.add.sprite(screenWidth/2-logoWidth/2, 10, 'menuLogo');
        this.game.stage.backgroundImage = background;
        var button_start = this.game.add.button(this.game.world.centerX-95,logoHeight+90, 'startButton', this.start, this,'over', 'out', 'down');
        var button_stats = this.game.add.button(this.game.world.centerX-95,logoHeight+140, 'stats', this.stats, this,'over', 'out', 'down');
        var button_credits = this.game.add.button(this.game.world.centerX-95,logoHeight+190, 'credits', this.credits, this,'over', 'out', 'down');
        button_start.setDownSound(buttonsound);
        button_stats.setDownSound(buttonsound);
        button_credits.setDownSound(buttonsound);
        //button_credits.onDownSound
    },

    start: function() {
      gamemusic.stop();
      startgame=true;
      this.game.state.add('Game', territory.Game);
      this.game.state.start('Game');


    },
    stats: function() {
      //gamemusic.stop();
      startgame=true;
      this.game.state.start('Stats');
    },
    credits: function() {
      gamemusic.stop();
      this.game.state.start('Credits');
      startgame=true;
    },
};
