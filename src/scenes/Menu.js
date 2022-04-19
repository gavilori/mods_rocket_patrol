class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    // load audio
    preload() {
        this.load.audio('sfx_select', './assets/blip_select12.wav');
        this.load.audio('sfx_explosion', './assets/explosion38.wav');
        this.load.audio('sfx_rocket', './assets/rocket_shot.wav');
        this.load.audio('bgm', './assets/bg_music.mp3');
    }
    create() {
        // menu text configuration
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        };

        // show menu text
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'ROCKET PATROL - BETTER', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2, 'Press ← for 1P', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 'Press → for 2P', menuConfig).setOrigin(0.5);
        
        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update () {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            // 1P mode
            this.sound.play('sfx_select');
            this.scene.start('onePlayer');
        }

        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            // 2P mode
            this.sound.play('sfx_select');
            this.scene.start('twoPlayer');
        }
    }
}