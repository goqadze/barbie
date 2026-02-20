function EyeColorSelector(game, nextStepCallback) {
    Phaser.Group.call(this, game);

    this.nextStepCallBack = nextStepCallback;
    this.game = game;
    this.y = 174;
    var count = 3;

    var ww = (game.width - this.y) / count;
    var wwc = ww / 2;
    var hhc = 222;

    this.eyeColors = [];
    for (var i = 0; i < count; i++) {
        var eyeColor = game.add.button(wwc + i * ww, hhc, 'eyeColor' + (i + 1), this.MouseEvents.onClick, 0, 0, 0);
        eyeColor.anchor.setTo(0.5, 0.5);
        eyeColor.index = i + 1;
        eyeColor.disabled = false;
        this.add(eyeColor);
        this.eyeColors.push(eyeColor);
    }

    this.disableds = [];
    for (var i = 0; i < count; i++) {
        var dis = this.create(wwc + i * ww, hhc, 'disabled');
        dis.anchor.set(0.5);
        dis.visible = false;
        this.disableds.push(dis);
    }

    // separators
    for (var i = 0; i < count - 1; i++) {
        this.create((i + 1) * ww, 0, 'separator');
    }

    var title = this.create((game.width - this.y) / 2, 0, 'title4');
    title.anchor.set(0.5);
}

EyeColorSelector.prototype = Object.create(Phaser.Group.prototype);
EyeColorSelector.prototype.constructor = EyeColorSelector;

EyeColorSelector.prototype.MouseEvents = {
    onClick: function () {
        if (this.disabled)
            return;
        selectedEyeColorId = this.index;
        this.parent.nextStepCallBack(3);
    }
};

EyeColorSelector.prototype.reset = function () {
    for (var i = 1; i <= this.eyeColors.length; i++) {
        var ok = false;
        for (var j = 0; j < Barbies.length && !ok; j++) {
            if (Barbies[j].have == true && Barbies[j].eyeColorId == i)
                ok = true;
        }
        this.disableds[i - 1].visible = !ok;
        this.eyeColors[i - 1].disabled = !ok;
    }

    for (var i = 0; i < this.eyeColors.length; i++) {
        this.game.add.tween(this.eyeColors[i]).from( { rotation : -Math.PI / 7 }, 700,  Phaser.Easing.Bounce.Out, true, i * 10);
        this.game.add.tween(this.disableds[i]).from( { rotation : -Math.PI / 7 }, 700,  Phaser.Easing.Bounce.Out, true, i * 10);
    }
};