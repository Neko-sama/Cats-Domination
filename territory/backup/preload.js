var territory = territory || {};

territory.Preload = function() {};

territory.Preload.prototype = {
    preload: function() {
        //soundtrack
        this.load.audio('soundtrack', 'assets/audio/soundtrack.wav');
        //buttons
        this.game.load.atlas('startButton', 'assets/buttons/start_button.png', 'assets/buttons/button_texture.json');
        this.game.load.atlas('attackButton', 'assets/buttons/attack.png', 'assets/buttons/panel_buttons_atlas.json');
        this.game.load.atlas('endTurnButton', 'assets/buttons/end-turn.png', 'assets/buttons/panel_buttons_atlas.json');
        this.game.load.atlas('moveButton', 'assets/buttons/move.png', 'assets/buttons/panel_buttons_atlas.json');
        this.game.load.atlas('newBaseButton', 'assets/buttons/newbase.png', 'assets/buttons/panel_buttons_atlas.json');
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


        //panel
        this.game.load.image(paperTile.spriteName,"assets/tiles/paper.png");


    },
    create: function() {
        this.state.start('MainMenu');
    }
};
