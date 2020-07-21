// var territory = territory || {};

territory.Credits = function() {};

territory.Credits.prototype = {

    create: function() {
        gamemusic = this.game.add.audio('mewmewsong');
        gamemusic.loop = true;
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
        var mensaje = this.game.add.text(0,0, "Cats Dominaton es un juego creado por Zippy y Neko, propiedad de Productos Neko.\n\nEste juego representa el sueño de todo gato de dominar el mundo y someter el resto de las razas.\nCreado solo con fines recreacionales, no debe ser usado para practicas indebidas como creación de \nposibles estrategias de destrucción mundial.\n \n Have fun!", { font: "24px "+panel.fontName, fill: panel.fontColor, align: "left" });
        mensaje.stroke = "#000000";
        mensaje.strokeThickness = 2;
        mensaje.setShadow(2, 2, "#000000", 2, true, false);
        mensaje.fixedToCamera = true;
        mensaje.cameraOffset.setTo(80,screenHeight/2-100);
        var button_start = this.game.add.button(screenWidth/2-100,screenHeight-150, 'gotomenu', this.return, this,'over', 'out', 'down');
        button_start.setDownSound(buttonsound);
        },

        return: function() {
      gamemusic.stop();
      startgame=true;
      this.game.state.start('MainMenu');


    },
};
