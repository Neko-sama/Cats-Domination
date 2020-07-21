// var territory = territory || {};

territory.Stats = function() {};

territory.Stats.prototype = {
    create: function() {
        var statisticsJSON = this.game.cache.getJSON('stadistics');
        background = this.game.add.tileSprite(0, 0, screenWidth, screenHeight, 'background');
        var palyer1Group = this.game.add.group();
        var palyer2Group = this.game.add.group();
        var gameGroup = this.game.add.group();
        this.game.stage.backgroundImage = background;
        var mensaje = this.game.add.text(screenWidth/2-150,50, "Estadísticas", { font: "50px "+panel.fontName, fill: "#FFFFFF", align: 'left' });
        mensaje.stroke = "#000000";
        mensaje.strokeThickness = 2;
        mensaje.setShadow(2, 2, "#000000", 2, true, false);

        palyer1Group.add(this.game.add.text(0,0, "Persa", { font: "40px "+panel.fontName, fill: panel.fontColor, align: "left" }));
        palyer1Group.add(this.game.add.text(0,0, "\n\t\tVictorias:\t" + localStorage.getItem('Persa.wins'), { font: "30px "+panel.fontName, fill: panel.fontColor, align: "left" }));
        palyer1Group.add(this.game.add.text(0,0, "\n\t\tDerrotas:\t" + localStorage.getItem('Persa.defeats'), { font: "30px "+panel.fontName, fill: panel.fontColor, align: "left" }));
        palyer1Group.add(this.game.add.text(0,0, "\n\t\tEmpates:\t" + localStorage.getItem('Persa.draws'), { font: "30px "+panel.fontName, fill: panel.fontColor, align: "left" }));

        palyer2Group.add(this.game.add.text(0,0, "Siames", { font: "40px "+panel.fontName, fill: panel.fontColor, align: "left" }));
        palyer2Group.add(this.game.add.text(0,0, "\n\t\tVictorias:\t" + localStorage.getItem('Siames.wins'), { font: "30px "+panel.fontName, fill: panel.fontColor, align: "left" }));
        palyer2Group.add(this.game.add.text(0,0, "\n\t\tDerrotas:\t" + localStorage.getItem('Siames.defeats'), { font: "30px "+panel.fontName, fill: panel.fontColor, align: "left" }));
        palyer2Group.add(this.game.add.text(0,0, "\n\t\tEmpates:\t" + localStorage.getItem('Siames.draws'), { font: "30px "+panel.fontName, fill: panel.fontColor, align: "left" }));


        gameGroup.add(this.game.add.text(0,0, "Partidas jugadas: " + localStorage.getItem('Game.plays'), { font: "35px "+panel.fontName, fill: panel.fontColor, align: 'center' }));

        palyer1Group.setAll('stroke',"#000000");
        palyer1Group.setAll('strokeThickness',2);
        palyer1Group.setAll('stroke',"#000000");
        var y=0;
        var offset=36;
        palyer1Group.forEach(function(text) {
          text.setShadow(2, 2, "#000000", 2, true, false);
          text.x = screenWidth/2-350
          text.y = 160+y++*offset;
        });

        palyer2Group.setAll('stroke',"#000000");
        palyer2Group.setAll('strokeThickness',2);
        palyer2Group.setAll('stroke',"#000000");
        y=0;
        palyer2Group.forEach(function(text) {
          text.setShadow(2, 2, "#000000", 2, true, false);
          text.x = screenWidth/2+180;
          text.y = 160+y++*offset;
        });

        gameGroup.setAll('stroke',"#000000");
        gameGroup.setAll('strokeThickness',2);
        gameGroup.setAll('stroke',"#000000");;
        gameGroup.forEach(function(text) {
          text.setShadow(2, 2, "#000000", 2, true, false);
          text.x = screenWidth/2-180
          text.y = 200+y++*offset+30;
        });

        var button_start = this.game.add.button(screenWidth/2-100,screenHeight-120, 'gotomenu', this.return, this,'over', 'out', 'down');
        button_start.setDownSound(buttonsound);
        },

    return: function() {
      startgame=true;
      this.game.state.start('MainMenu');


    },
};
