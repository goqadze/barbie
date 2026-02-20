function StartScreen(game) {
    Phaser.Group.call(this, game);

    this.game = game;

    this.screen1 = this.create(0, 0, 'screen1');
    this.dollA = this.create(525, 100, 'doll6');
    this.dollA.scale.set(0.85);

    this.dollB = this.create(525, 100, 'doll2');
    this.dollB.scale.set(0.85);
    this.dollB.alpha = 0;

    this.slideShow = [];
    for (var i = 0; i < 22; i++)
        this.slideShow.push(i + 1);
    shuffleArray(this.slideShow);

    this.current = 0;
    this.timer = game.time.create(false);
    this.timer.add(1500, fadePictures, this);
    this.startSlideShow();

    this.btnStart = game.add.button(480, 500, 'btnStart', this.BtnStartActions.onClick, this, 0, 0, 0, 0, this);
}

StartScreen.prototype = Object.create(Phaser.Group.prototype);
StartScreen.prototype.constructor = StartScreen;

StartScreen.prototype.BtnStartActions = {
    onClick: function () {
        this.visible = false;
        mainScreen.visible = true;
        var tween = this.game.add.tween(mainScreen);
        tween.from({alpha: 0.3}, 300, Phaser.Easing.Power2.Out);
        tween.start();
        mainScreen.selectorConts[0].reset();
        //this.stopSlideShow();
    }
};

StartScreen.prototype.startSlideShow = function(){
    this.timer.start();
};

StartScreen.prototype.stopSlideShow = function(){
    this.timer.stop();
};

function shuffleArray(a) {
    var j, x, i;
    for (i = a.length; i; i -= 1) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
}

function fadePictures() {

    var tween;
    if (this.dollA.alpha === 1) {
        tween = this.game.add.tween(this.dollA).to({alpha: 0}, 1500, Phaser.Easing.Linear.None, true);
        this.game.add.tween(this.dollB).to({alpha: 1}, 1500, Phaser.Easing.Linear.None, true);
    }
    else {
        this.game.add.tween(this.dollA).to({alpha: 1}, 1500, Phaser.Easing.Linear.None, true);
        tween = this.game.add.tween(this.dollB).to({alpha: 0}, 1500, Phaser.Easing.Linear.None, true);
    }

    tween.onComplete.add(changePicture, this);

}

function changePicture() {

    if (this.dollA.alpha === 0) {
        this.dollA.loadTexture('doll' + this.slideShow[this.current]);
    }
    else {
        this.dollB.loadTexture('doll' + this.slideShow[this.current]);
    }

    this.current++;

    if (this.current >= this.slideShow.length - 1) {
        this.current = 0;
    }

    this.timer.add(1500, fadePictures, this);
}