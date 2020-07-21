var territory = territory || {};

territory.MainMenu = function() {};

territory.MainMenu.prototype = {
    create: function() {
        soundtrack = this.game.add.audio('soundtrack');
        soundtrack.loop = true;
        soundtrack.play();

        background = this.game.add.tileSprite(0, 0, screenWidth, screenHeight, 'background');
        var bailarines = this.game.add.sprite(0,screenHeight-bailarinesSprite.height, bailarinesSprite.spriteName);
        bailarines.animations.add('bailar');
        bailarines.animations.play('bailar', 5, true);
        var bailarines2 = this.game.add.sprite(screenWidth/2,screenHeight-bailarinesSprite.height, bailarinesSprite.spriteName);
        bailarines2.animations.add('bailar');
        bailarines2.animations.play('bailar', 5, true);
        var logo = this.game.add.sprite(screenWidth/2-logoWidth/2, 10, 'menuLogo');
        this.game.stage.backgroundImage = background;
        var button_start = this.game.add.button(this.game.world.centerX-95,logoHeight+150, 'startButton', this.start, this,'over', 'out', 'down');
    },

    start: function() {
        this.game.state.start('Game');
        startgame=true;
    },
};
