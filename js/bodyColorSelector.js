function BodyColorSelector(game, nextStepCallback) {
    Phaser.Group.call(this, game);

    this.nextStepCallBack = nextStepCallback;

    this.game = game;

    this.y = 174;
    var count = 3;

    var ww = (game.width - this.y) / count;
    var wwc = ww / 2;
    var hhc = 222;

    this.btnBodyColors = [];
    for (var i = 0; i < count; i++) {
        var btnBodyColor = game.add.button(wwc + i * ww, hhc, 'bodyColor' + (i + 1), this.MouseEvents.onClick, 0, 0, 0);
        btnBodyColor.anchor.setTo(0.5, 0.5);
        btnBodyColor.index = i + 1;
        btnBodyColor.disabled = false;
        this.add(btnBodyColor);
        this.btnBodyColors.push(btnBodyColor);
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

    var title = this.create((game.width - this.y) / 2, 0, 'title2');
    title.anchor.set(0.5);

}

BodyColorSelector.prototype = Object.create(Phaser.Group.prototype);
BodyColorSelector.prototype.constructor = BodyColorSelector;

BodyColorSelector.prototype.MouseEvents = {
    onClick: function () {
        if (this.disabled)
            return;

        selectedBodyColorId = this.index;
        this.parent.nextStepCallBack(1);
    }
};

BodyColorSelector.prototype.reset = function () {
    for (var i = 1; i <= this.btnBodyColors.length; i++) {
        var ok = false;
        for (var j = 0; j < Barbies.length && !ok; j++) {
            if (Barbies[j].have == true && Barbies[j].bodyColorId == i)
                ok = true;
        }

        this.disableds[i - 1].visible = !ok;
        this.btnBodyColors[i - 1].disabled = !ok;
    }

    for (var i = 0; i < this.btnBodyColors.length; i++) {
        this.game.add.tween(this.btnBodyColors[i].scale).from({x: 0.7, y: 0.7}, 900, Phaser.Easing.Bounce.Out, true, 0);
        this.game.add.tween(this.disableds[i].scale).from({x: 0.7, y: 0.7}, 900, Phaser.Easing.Bounce.Out, true, 0);
    }
};