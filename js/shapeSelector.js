function ShapeColorSelector(game, nextStepCallback) {
    Phaser.Group.call(this, game);

    this.nextStepCallBack = nextStepCallback;

    this.game = game;

    this.y = 174;
    var count = 4;

    var ww = (game.width - this.y) / count;
    var wwc = ww / 2;
    var hhc = 222;

    this.shapes = [];
    for (var i = 0; i < count; i ++){
        var shape = game.add.button(wwc + i * ww, hhc, 'shape' + (i + 1), this.MouseEvents.onClick, 0, 0, 0);
        shape.anchor.setTo(0.5, 0.5);
        shape.index = i + 1;
        this.add(shape);
        this.shapes.push(shape)
    }

    // separators
    for (var i = 0; i < count - 1; i ++){
        this.create((i + 1) * ww, 0, 'separator');
    }

    var title = this.create((game.width - this.y) / 2, 0, 'title1');
    title.anchor.set(0.5);
}

ShapeColorSelector.prototype = Object.create(Phaser.Group.prototype);
ShapeColorSelector.prototype.constructor = ShapeColorSelector;

ShapeColorSelector.prototype.MouseEvents = {
    onClick : function(){
        selectedShapeId = this.index;
        this.parent.nextStepCallBack(0);
    }
};


ShapeColorSelector.prototype.reset = function () {
    for (var i = 0; i < this.shapes.length; i ++){
        this.game.add.tween(this.shapes[i].scale).from( {  x : 0.2, y : 0.2}, 400, Phaser.Easing.Power2.Out, true, i * 120);
    }
};