var BasicGame = {
};

BasicGame.Game = function (game) {

    this.game;      //  a reference to the currently running game (Phaser.Game)
    this.add;       //  used to add sprites, text, groups, etc (Phaser.GameObjectFactory)
    this.camera;    //  a reference to the game camera (Phaser.Camera)
    this.cache;     //  the game cache (Phaser.Cache)
    this.input;     //  the global input manager. You can access this.input.keyboard, this.input.mouse, as well from it. (Phaser.Input)
    this.load;      //  for preloading assets (Phaser.Loader)
    this.math;      //  lots of useful common math operations (Phaser.Math)
    this.sound;     //  the sound manager - add a sound, play one, set-up markers, etc (Phaser.SoundManager)
    this.stage;     //  the game stage (Phaser.Stage)
    this.time;      //  the clock (Phaser.Time)
    this.tweens;    //  the tween manager (Phaser.TweenManager)
    this.state;     //  the state manager (Phaser.StateManager)
    this.world;     //  the game world (Phaser.World)
    this.particles; //  the particle manager (Phaser.Particles)
    this.physics;   //  the physics manager (Phaser.Physics)
    this.rnd;       //  the repeatable random number generator (Phaser.RandomDataGenerator)
    this.scale;
};

var startScreen;
var mainScreen;
var lastScreen;

var font = null;

var selectedShapeId = 0;
var selectedBodyColorId = 0;
var selectedHairColorId = 0;
var selectedEyeColorId = 0;

var backgroundSound = null;

BasicGame.Game.prototype = {

    preload: function () {

        backgroundSound = new Howl({
            urls: ['assets/audios/background.mp3'],
            autoplay: true,
            loop: true,
            volume: 0.5,
            preload: true,
            onend: function () {
                //console.log('Finished!');
            }
        });
        backgroundSound.playing = true;

        font = new Font();
        font.onload = function () {
        };

        font.onerror = function (err) {
            console.log(err);
        };

        font.fontFamily = "PFCatalogCondensed-BlackItalic";
        font.src = font.fontFamily;

        this.load.image('screen1', 'assets/images/screen-1.jpg');
        for (var i = 1; i < 23; i++) {
            this.load.image('doll' + i, 'assets/images/Dolls/doll' + i + '.png');
        }
        this.load.image('btnStart', 'assets/images/btn-start.png');
        this.load.image('mainBg', 'assets/images/screens-bg.jpg');
        this.load.image('lastBg', 'assets/images/last-bg.jpg');
        this.load.image('separator', 'assets/images/separator.jpg');
        this.load.image('logo', 'assets/images/logo.png');
        this.load.image('mute', 'assets/images/mute.png');
        this.load.image('btnPlayAgain', 'assets/images/btn-play-again.png');
        this.load.image('btnPrint', 'assets/images/btn-print.png');

        this.load.image('muted', 'assets/images/muted.png');
        this.load.image('curvy', 'assets/images/Curvy.png');
        this.load.image('tall', 'assets/images/Tall.png');
        this.load.image('original', 'assets/images/Original.png');
        this.load.image('petite', 'assets/images/Petite.png');

        this.load.image('namesBg', 'assets/images/names-bg.png');
        this.load.image('disabled', 'assets/images/disabled.png');

        for (var i = 1; i < 5; i++) {
            this.load.image('btnSelect' + i, 'assets/images/btn-select-' + i + '.png');
            this.load.image('btnSelectOn' + i, 'assets/images/btn-select-' + i + '-on.png');
        }

        for (var i = 1; i <= 4; i++) {
            this.load.image('shape' + i, 'assets/images/shape' + i + '.png');
        }

        for (var i = 1; i <= 3; i++) {
            this.load.image('bodyColor' + i, 'assets/images/bodycolor' + i + '.png');
        }

        for (var i = 1; i <= 5; i++) {
            this.load.image('hairColor' + i, 'assets/images/hair' + i + '.jpg');
        }

        for (var i = 1; i <= 3; i++) {
            this.load.image('eyeColor' + i, 'assets/images/eye' + i + '.png');
        }

        for (var i = 1; i <= 4; i++) {
            this.load.image('title' + i, 'assets/images/title-' + i + '.png');
        }
    },

    create: function () {

        this.scale.maxWidth = 800;
        this.scale.maxHeight = 600;

        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

        lastScreen = new LastScreen(this.game);
        mainScreen = new MainScreen(this.game);
        startScreen = new StartScreen(this.game);
    },

    update: function () {

    },

    render: function () {

        // this.game.debug.spriteBounds(mainScreen.selector);
    },

    quitGame: function (pointer) {

    }
};