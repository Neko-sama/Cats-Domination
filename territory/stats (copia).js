// var territory = territory || {};

territory.Stats = function() {};

territory.Stats.prototype = {
    create: function() {
        var stadisticsJSON = this.game.cache.getJSON('stadistics');
        background = this.game.add.tileSprite(0, 0, screenWidth, screenHeight, 'background');
        var textGroup = this.game.add.group();
        this.game.stage.backgroundImage = background;
        var mensaje = this.game.add.text(0,0, "Estadísticas", { font: "44px "+panel.fontName, fill: "#FFFFFF", align: "left" });
        mensaje.stroke = "#000000";
        mensaje.strokeThickness = 2;
        mensaje.setShadow(2, 2, "#000000", 2, true, false);
        mensaje.fixedToCamera = true;
        mensaje.cameraOffset.setTo(screenWidth/2-120,50);
        var text;
        textGroup.add(this.game.add.text(0,0, "Persa", { font: "24px "+panel.fontName, fill: panel.fontColor, align: "left" }));
        textGroup.add(this.game.add.text(0,0, "\t\tVictorias:\t" + stadisticsJSON.Persa.wins, { font: "24px "+panel.fontName, fill: panel.fontColor, align: "left" }));
        textGroup.add(this.game.add.text(0,0, "\t\tDerrotas:\t" + stadisticsJSON.Persa.defeats, { font: "24px "+panel.fontName, fill: panel.fontColor, align: "left" }));
        textGroup.add(this.game.add.text(0,0, "\t\tEmpates:\t" + stadisticsJSON.Persa.draws, { font: "24px "+panel.fontName, fill: panel.fontColor, align: "left" }));

        textGroup.add(this.game.add.text(0,0, "Siames", { font: "24px "+panel.fontName, fill: panel.fontColor, align: "left" }));
        textGroup.add(this.game.add.text(0,0, "\t\tVictorias:\t" + stadisticsJSON.Siames.wins, { font: "24px "+panel.fontName, fill: panel.fontColor, align: "left" }));
        textGroup.add(this.game.add.text(0,0, "\t\tDerrotas:\t" + stadisticsJSON.Siames.defeats, { font: "24px "+panel.fontName, fill: panel.fontColor, align: "left" }));
        textGroup.add(this.game.add.text(0,0, "\t\tEmpates:\t" + stadisticsJSON.Siames.draws, { font: "24px "+panel.fontName, fill: panel.fontColor, align: "left" }));


        textGroup.add(this.game.add.text(0,0, "Partidas jugadas: " + stadisticsJSON.Game.plays, { font: "24px "+panel.fontName, fill: panel.fontColor, align: 'center' }));
        textGroup.setAll('stroke',"#000000");
        textGroup.setAll('strokeThickness',2);
        textGroup.setAll('fixedToCamera',true);
        textGroup.setAll('stroke',"#000000");
        var y=0;
        var offset=20;
        textGroup.forEach(function(text) {
          text.setShadow(2, 2, "#000000", 2, true, false);
          text.cameraOffset.setTo(screenWidth/2-120,200+y++*offset);
        });
        textGroup;
        var button_start = this.game.add.button(screenWidth/2-100,screenHeight-150, 'gotomenu', this.return, this,'over', 'out', 'down');
        stadisticsJSON.Game.plays++;

        },

    return: function() {
      soundtrack = this.game.add.audio('buttonpress');
      soundtrack.play();
      startgame=true;
      this.game.state.start('MainMenu');


    },
};
