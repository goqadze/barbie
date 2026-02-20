function LastScreen(game) {
    Phaser.Group.call(this, game);
    this.visible = false;

    this.game = game;

    this.background = this.create(0, 0, 'lastBg');

    this.resultBarbie = this.create(445, 95, 'doll1');
    this.resultBarbie.scale.set(0.88);

    this.btnPrint = game.add.button(147, 385, 'btnPrint', this.PrintEvents.onClick, this, 0, 0, 0);
    this.add(this.btnPrint);

    this.btnPlayAgain = game.add.button(147, 455, 'btnPlayAgain', this.PlayAgainEvents.onClick, this, 0, 0, 0);
    this.add(this.btnPlayAgain);

    this.create(15, 18, 'logo');
    this.sound = game.add.button(740, 15, 'mute', this.SoundEvents.onClick, 0, 0, 0);
    this.add(this.sound);

    var bx = 315;
    var by = 45;
    this.barbieTypes = [this.create(bx, by, 'tall'), this.create(bx, by, 'petite'), this.create(bx, by, 'curvy'), this.create(bx, by, 'original')];

    this.create(380, 510, 'namesBg');

    this.nameText = null;
}

LastScreen.prototype = Object.create(Phaser.Group.prototype);
LastScreen.prototype.constructor = LastScreen;

LastScreen.prototype.SoundEvents = {
    onClick: function () {
        if (backgroundSound.playing) {
            backgroundSound.stop();
            this.sound.loadTexture('muted');
        }
        else {
            backgroundSound.play();
            this.sound.loadTexture('mute')
        }
        backgroundSound.playing = !backgroundSound.playing;
    }
};

LastScreen.prototype.PlayAgainEvents = {
    onClick: function () {
        this.visible = false;
        startScreen.visible = true;
        mainScreen.selectorConts[0].visible = true;
        mainScreen.selectedBtns[0].visible = true;

        selectedBodyColorId = 0;
        selectedShapeId = 0;
        selectedEyeColorId = 0;
        selectedHairColorId = 0;

        Barbies.forEach(function (el) {
            el.have = true
        });
    }
};

LastScreen.prototype.PrintEvents = {
    onClick: function () {

        var tweenA = this.game.add.tween(this.btnPrint).to({alpha: 0}, 300, "Quart.easeOut");
        var tweenB = this.game.add.tween(this.btnPlayAgain).to({alpha: 0}, 300, "Quart.easeOut");
        tweenB.onComplete.add(function () {
            var img = this.game.canvas.toDataURL();
            this.btnPlayAgain.alpha = 1;
            this.btnPrint.alpha = 1;
            var popup = window.open();
            popup.document.write('<img src="' + img + '"/>');
            popup.focus();
            popup.print();
        }, this);
        tweenA.chain(tweenB);
        tweenA.start();
    }
};

LastScreen.prototype.setResult = function () {
    var id = -1;
    Barbies.forEach(function (el) {
        if (el.have)
            id = el.id;
    });

    this.resultBarbie.destroy();
    if (id > 0) {
        this.resultBarbie = this.create(470, 100, 'doll' + id);
        this.resultBarbie.scale.set(0.87);
    }

    this.barbieTypes.forEach(function (el) {
        el.visible = false;
    });

    this.barbieTypes[selectedShapeId - 1].visible = true;

    if (this.nameText)
        this.nameText.destroy();

    this.nameText = this.game.add.text(530, 540, Barbies[id - 1].text);
    this.add(this.nameText);
    this.nameText.anchor.set(0.5);
    this.nameText.align = 'center';
    this.nameText.fill = '#ee4097';
    this.nameText.font = font.fontFamily;
};