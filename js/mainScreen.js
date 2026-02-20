function MainScreen(game) {
    Phaser.Group.call(this, game);
    this.visible = false;

    this.background = this.create(0, 0, 'mainBg');

    this.selectorConts = [];
    this.selectorBtns = [];
    this.selectedBtns = [];
    this.selectorPrevBtns = [];

    var sx = 174;
    var sy = 87;

    this.callback = function (i) {
        this.selectorConts[i].visible = false;
        this.selectedBtns[i].visible = false;

        Barbies.forEach(function (el, i) {
            el.have = true;

            if (selectedShapeId > 0 && el.shapeId != selectedShapeId) {
                el.have = false;
            }

            if (selectedBodyColorId > 0 && el.bodyColorId != selectedBodyColorId) {
                el.have = false;
            }

            if (selectedHairColorId > 0 && el.hairColorId != selectedHairColorId) {
                el.have = false;
            }

            if (selectedEyeColorId > 0 && el.eyeColorId != selectedEyeColorId) {
                el.have = false;
            }
        });

        if (i < 3) {
            this.selectorConts[i + 1].visible = true;
            this.selectedBtns[i + 1].visible = true;

            if (this.currentStateIndex > 0) {
                this.selectorPrevBtns[this.currentStateIndex - 1].visible = false;
            }
            this.selectorPrevBtns[this.currentStateIndex].visible = true;
            this.currentStateIndex++;

            this.selectorConts[i + 1].reset();
        } else {
            this.selectorPrevBtns[this.currentStateIndex - 1].visible = false;
            this.currentStateIndex = 0;
            lastScreen.setResult();
            this.visible = false;
            lastScreen.visible = true;
            var tween = this.game.add.tween(lastScreen);
            tween.from({alpha: 0.3}, 300, Phaser.Easing.Power2.Out);
            tween.start();
        }
    };

    this.selectorConts[0] = new ShapeColorSelector(game, this.callback.bind(this));
    this.selectorConts[0].position.set(sx, sy);
    this.add(this.selectorConts[0]);

    this.selectorConts[1] = new BodyColorSelector(game, this.callback.bind(this));
    this.selectorConts[1].position.set(sx, sy);
    this.selectorConts[1].visible = false;
    this.add(this.selectorConts[1]);

    this.selectorConts[2] = new HairColorSelector(game, this.callback.bind(this));
    this.selectorConts[2].position.set(sx, sy);
    this.selectorConts[2].visible = false;
    this.add(this.selectorConts[2]);

    this.selectorConts[3] = new EyeColorSelector(game, this.callback.bind(this));
    this.selectorConts[3].position.set(sx, sy);
    this.selectorConts[3].visible = false;
    this.add(this.selectorConts[3]);

    var xx = 0;
    var yy = 143;
    for (var i = 0; i < 4; i++) {
        this.selectorBtns[i] = this.create(xx, yy + i * 111, 'btnSelect' + (i + 1));
        this.selectorBtns[i].anchor.setTo(0, 0.5);

        this.selectorPrevBtns[i] = game.add.button(xx, yy + i * 111, 'btnSelect' + (i + 1), this.SelectorEvents.onClick, 0, 0, 0);
        this.selectorPrevBtns[i].anchor.setTo(0, 0.5);
        this.selectorPrevBtns[i].visible = false;
        this.selectorPrevBtns[i].index = i;
        this.add(this.selectorPrevBtns[i]);

        this.selectedBtns[i] = this.create(xx, yy + i * 111, 'btnSelectOn' + (i + 1));
        this.selectedBtns[i].anchor.setTo(0, 0.5);
        this.selectedBtns[i].visible = i == 0;
    }

    this.currentStateIndex = 0;

    this.create(15, 18, 'logo');
    this.sound = game.add.button(740, 15, 'mute', this.SoundEvents.onClick, this, 0, 0, 0);
    this.add(this.sound);
}

MainScreen.prototype = Object.create(Phaser.Group.prototype);
MainScreen.prototype.constructor = MainScreen;

MainScreen.prototype.SelectorEvents = {
    onClick: function () {
        var $parent = this.parent;
        this.visible = false;
        if (this.index > 0)
            $parent.selectorPrevBtns[this.index - 1].visible = true;

        if (this.index == 0)
            selectedShapeId = 0;
        else if (this.index == 1)
            selectedBodyColorId = 0;
        else if (this.index == 2)
            selectedHairColorId = 0;
        else
            selectedEyeColorId = 0;

        $parent.selectorConts[this.index].visible = true;
        $parent.selectorConts[this.index + 1].visible = false;

        $parent.selectedBtns[this.index].visible = true;
        $parent.selectedBtns[this.index + 1].visible = false;

        $parent.currentStateIndex = this.index;
        $parent.selectorConts[this.index].reset();
    }
};

MainScreen.prototype.SoundEvents = {
    onClick: function () {
        if (backgroundSound.playing) {
            backgroundSound.stop();
            this.sound.loadTexture('muted');
        }
        else {
            backgroundSound.play();
            this.sound.loadTexture('mute');
        }
        backgroundSound.playing = !backgroundSound.playing;
    }
};
