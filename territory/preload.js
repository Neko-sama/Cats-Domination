var territory = territory || {};

territory.Preload = function () {};
var loading;
territory.Preload.prototype = {
    preload: function() {

    },
    create: function() {
      //	You can listen for each of these events from Phaser.Loader
      territory.game.load.onLoadStart.add(this.loadStart, this);
      territory.game.load.onFileComplete.add(this.fileComplete, this);
      territory.game.load.onLoadComplete.add(this.loadComplete, this);
      loading = territory.game.add.text(screenWidth/2 - 150, screenHeight/2 -100, 'Cargando...', { fill: '#ffffff', align: 'center' });
      this.start();
    },
    start: function(){
      //buttons
      this.game.load.atlas('startButton', 'assets/buttons/start_button.png', 'assets/buttons/panel_buttons_atlas.json');
      this.game.load.atlas('attackButton', 'assets/buttons/attack.png', 'assets/buttons/panel_buttons_atlas.json');
      this.game.load.atlas('endTurnButton', 'assets/buttons/end-turn.png', 'assets/buttons/panel_buttons_atlas.json');
      this.game.load.atlas('moveButton', 'assets/buttons/move.png', 'assets/buttons/panel_buttons_atlas.json');
      this.game.load.atlas('newBaseButton', 'assets/buttons/newbase.png', 'assets/buttons/panel_buttons_atlas.json');
      this.game.load.atlas('credits', 'assets/buttons/credits.png', 'assets/buttons/panel_buttons_atlas.json');
      this.game.load.atlas('exit', 'assets/buttons/exit.png', 'assets/buttons/panel_buttons_atlas.json');
      this.game.load.atlas('gotomenu', 'assets/buttons/gotomenu.png', 'assets/buttons/panel_buttons_atlas.json');
      this.game.load.atlas('retry', 'assets/buttons/retry.png', 'assets/buttons/panel_buttons_atlas.json');
      this.game.load.atlas('return', 'assets/buttons/return.png', 'assets/buttons/panel_buttons_atlas.json');
      this.game.load.atlas('stats', 'assets/buttons/stats.png', 'assets/buttons/panel_buttons_atlas.json');
      //MainMenu
      this.game.load.image('background', 'assets/images/fondo.png');
      this.game.load.image("menuLogo","assets/images/logo.png");
      this.game.load.spritesheet(bailarinesSprite.spriteName,"assets/tiles/gatos.png",bailarinesSprite.width,bailarinesSprite.height,bailarinesSprite.frames);
      //Maptiles
      this.game.load.image("neutralHexagon", "assets/tiles/hexagon.png");
      this.game.load.image("tunelHexagon", "assets/tiles/hexagonTunel.png");
      this.game.load.image("waterHexagon", "assets/tiles/hexagonWater.png");
      this.game.load.image("waterBackground","assets/tiles/Water.png");
      //sprites
      this.game.load.spritesheet(catSprite.spriteName[1], "assets/tiles/cat1.png", catSprite.width, catSprite.height, catSprite.frames);
      this.game.load.spritesheet(catSprite.spriteName[2], "assets/tiles/cat2.png", catSprite.width, catSprite.height, catSprite.frames);
      this.game.load.spritesheet(baseSprite.spriteName[1], "assets/tiles/base-red.png", baseSprite.width, baseSprite.height, baseSprite.frames);
      this.game.load.spritesheet(baseSprite.spriteName[2], "assets/tiles/base-blue.png", baseSprite.width, baseSprite.height, baseSprite.frames);
      this.game.load.spritesheet(flagSprite.spriteName[1], "assets/tiles/flag-red.png", flagSprite.width, flagSprite.height, flagSprite.frames);
      this.game.load.spritesheet(flagSprite.spriteName[2], "assets/tiles/flag-blue.png", flagSprite.width, flagSprite.height, flagSprite.frames);
      this.game.load.spritesheet(resoursesSprite.spriteName[1], "assets/tiles/mouse.png", resoursesSprite.width, resoursesSprite.height, resoursesSprite.frames);
      this.game.load.spritesheet(resoursesSprite.spriteName[2], "assets/tiles/bunny.png", resoursesSprite.width, resoursesSprite.height, resoursesSprite.frames);
      this.game.load.spritesheet(resoursesSprite.spriteName[3], "assets/tiles/cook.png", resoursesSprite.width, resoursesSprite.height, resoursesSprite.frames);
      this.game.load.spritesheet(enemySprite.spriteName[1], "assets/tiles/enemy1.png", enemySprite.width, enemySprite.height, enemySprite.frames);
      this.game.load.spritesheet(enemySprite.spriteName[2], "assets/tiles/enemy2.png", enemySprite.width, enemySprite.height, enemySprite.frames);
      this.game.load.spritesheet(fightingSprite.spriteName, "assets/tiles/fight-dust1.png", fightingSprite.width, fightingSprite.height, fightingSprite.frames);
      this.game.load.spritesheet(camadaSprite.spriteName[1], "assets/tiles/camada1.png", camadaSprite.width, camadaSprite.height, camadaSprite.frames);
      this.game.load.spritesheet(camadaSprite.spriteName[2], "assets/tiles/camada2.png", camadaSprite.width, camadaSprite.height, camadaSprite.frames);
      this.game.load.spritesheet(explosionSprite.spriteName, "assets/tiles/base-explosion.png", explosionSprite.width, explosionSprite.height, explosionSprite.frames);
      //panel
      this.game.load.image(paperTile.spriteName,"assets/tiles/paper.png");
      //gamemusic
      this.load.audio('gamemusic', 'assets/audio/soundtrack.wav');
      this.load.audio('gamemusic2', 'assets/audio/soundtrack2.wav');
      this.load.audio('catmew', 'assets/audio/catmew.wav');
      this.load.audio('catmew2', 'assets/audio/catmew2.wav');
      this.load.audio('cathurt', 'assets/audio/cathurt.wav');
      this.load.audio('fightingcat', 'assets/audio/fighting cat.wav');
      this.load.audio('screamcat', 'assets/audio/screamcat.wav');
      this.load.audio('mewmewsong', 'assets/audio/mewmewsong.mp3');
      this.load.audio('explosion', 'assets/audio/explosion.mp3');
      this.load.audio('punch', 'assets/audio/punch.mp3');
      this.load.audio('gameover', 'assets/audio/gameover.wav');
      this.load.audio('buttonpress', 'assets/audio/buttonpress.wav');
      this.load.audio('Dog_guof', 'assets/audio/Dog_guof.mp3');
      this.load.audio('gamestart', 'assets/audio/gamestart.wav');
      this.load.audio('take', 'assets/audio/take.wav');
      //stadistics
      this.load.json('stadistics', 'assets/stadistics/stadistics.json');

      territory.game.load.start();
    },
    loadStart: function() {

    	loading.setText("Cargando ...");

    },

    //	This callback is sent the following parameters:
    fileComplete: function(progress, cacheKey, success, totalLoaded, totalFiles) {

    	loading.setText("Cargando... \n \nCompletado: " + progress + "%");
    },

    loadComplete: function() {

    	loading.setText("Carga Completa");
      this.state.start('MainMenu');

    }
};
