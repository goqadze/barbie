function HairColorSelector(game, nextStepCallback) {
    Phaser.Group.call(this, game);

    this.nextStepCallBack = nextStepCallback;
    this.game = game;

    this.y = 174;
    var count = 5;

    var ww = (game.width - this.y) / count;
    var wwc = ww / 2;
    var hhc = 222;

    this.hairColors = [];
    for (var i = 0; i < count; i++) {
        var hairColor = game.add.button(wwc + i * ww, hhc, 'hairColor' + (i + 1), this.MouseEvents.onClick, 0, 0, 0);
        hairColor.anchor.setTo(0.5, 0.5);
        hairColor.index = i + 1;
        hairColor.disabled = false;
        this.add(hairColor);
        this.hairColors.push(hairColor);
    }

    this.disableds = [];
    for (var i = 0; i < count; i++) {
        var dis = this.create(wwc + i * ww, hhc, 'disabled');
        dis.anchor.set(0.5);
        dis.visible = false;
        dis.scale.set(0.8);
        this.disableds.push(dis);
    }

    // separators
    for (var i = 0; i < count - 1; i++) {
        this.create((i + 1) * ww, 0, 'separator');
    }

    var title = this.create((game.width - this.y) / 2, 0, 'title3');
    title.anchor.set(0.5);
}

HairColorSelector.prototype = Object.create(Phaser.Group.prototype);
HairColorSelector.prototype.constructor = HairColorSelector;

HairColorSelector.prototype.MouseEvents = {
    onClick: function () {
        if (this.disabled)
            return;

        selectedHairColorId = this.index;
        this.parent.nextStepCallBack(2);
    }
};

HairColorSelector.prototype.reset = function () {
    for (var i = 1; i <= this.hairColors.length; i++) {
        var ok = false;
        for (var j = 0; j < Barbies.length && !ok; j++) {
            if (Barbies[j].have == true && Barbies[j].hairColorId == i)
                ok = true;
        }
        this.disableds[i - 1].visible = !ok;
        this.hairColors[i - 1].disabled = !ok;
    }

    for (var i = 0; i < this.hairColors.length; i++) {
        this.game.add.tween(this.hairColors[i]).from( { alpha : 0.5 }, 700,  Phaser.Easing.Bounce.Out, true, i * 10);
        this.game.add.tween(this.disableds[i]).from( { alpha : 0.5 }, 700,  Phaser.Easing.Bounce.Out, true, i * 10);
    }
};