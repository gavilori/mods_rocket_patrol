class TwoPlay extends Phaser.Scene {
    constructor() {
        super("twoPlayScene");
    }

    preload() {
        // load images/tile sprites
        this.load.image('p1rocket', './assets/p1rocket.png');
        this.load.image('p2rocket', './assets/p2rocket.png');
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('spaceship2', './assets/spaceship2.png');
        this.load.image('starfield', './assets/starfield.png');
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
        this.load.spritesheet('explosion2', './assets/explosion2.png', {frameWidth: 38, frameHeight: 20, startFrame: 0, endFrame: 9});
    }

    create() {
        // place tile sprite
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);
        // green UI background
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2,  0x00FF00).setOrigin(0, 0);
        // white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);

        // define keys
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // add rocket (p1)
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'p1rocket', 0, keyLEFT, keyRIGHT, keyUP).setOrigin(0.5, 0);
        this.p2Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'p2rocket', 0, keyA, keyD, keyW).setOrigin(0.5, 0)

        // add spaceships (x4)
        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4, 'spaceship', 0, 30).setOrigin(0, 0);
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'spaceship', 0, 20).setOrigin(0, 0);
        this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4, 'spaceship', 0, 10).setOrigin(0, 0);

        this.ship04 = new SpaceshipTwo(this, game.config.width + borderUISize*15, borderUISize*7 + borderPadding*5, 'spaceship2', 0, 50).setOrigin(0, 0);
    
        // animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
            frameRate: 30
        });
        this.anims.create({
            key: 'explode2',
            frames: this.anims.generateFrameNumbers('explosion2', { start: 0, end: 9, first: 0}),
            frameRate: 30
        });

        // initialize scores
        this.p1Score = 0;
        this.p2Score = 0;

        // re-initialize starting spaceship speed
        game.settings.spaceshipSpeed = game.settings.easyMode ? 3 : 4

        // display score
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        };
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, "P1 " + this.p1Score, scoreConfig);
        this.scoreRight = this.add.text(game.config.width - borderUISize*4 - borderPadding*2, borderUISize + borderPadding*2, "P2 " + this.p2Score, scoreConfig);

        scoreConfig.backgroundColor = "#8775D4";
        scoreConfig.color = "#18015D";

        this.timerText = this.add.text(game.config.width/2, borderUISize + borderPadding*3.65, game.settings.gameTimer, scoreConfig).setOrigin(0.5);

        scoreConfig.backgroundColor = "#F3B141";
        scoreConfig.color = "#843605";
        // GAME OVER flag
        this.gameOver = false;

        // bgm
        this.playSong = this.sound.add('bgm');
        this.playSong.play();
        this.playSong.loop = true;

        // play clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            if(this.p1Score > this.p2Score) {
                this.add.text(game.config.width/2, game.config.height/2, "PLAYER 1 WINS", scoreConfig).setOrigin(0.5);
            }
            else if (this.p2Score > this.p1Score) {
                this.add.text(game.config.width/2, game.config.height/2, "PLAYER 2 WINS", scoreConfig).setOrigin(0.5);
            }
            else {
                this.add.text(game.config.width/2, game.config.height/2, "BOTH PLAYERS TIED", scoreConfig).setOrigin(0.5);
            }
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 100, '(Space) for Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);

        this.timeRem = game.settings.gameTimer/1000;

        this.timer = this.time.addEvent({
            delay: 1000,
            callback: () => {
                this.timeRem -= 1;
            },
            callbackScope: this,
            repeat: game.settings.gameTimer/1000 - 1
        });
        
        
        // increase speed by 3 after 30-sec
        this.speedIncrease = this.time.delayedCall(30000, () => {
            game.settings.spaceshipSpeed += 3;
        }, null, this);
    }

    update() {

        this.timerText.text = this.timeRem;

        // check key input for restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }

        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.scene.start("menuScene");
        }
        this.starfield.tilePositionX -= 3;
        if (!this.gameOver) {
            this.p1Rocket.update();
            this.p2Rocket.update();
            this.ship01.update();
            this.ship02.update();
            this.ship03.update();
            this.ship04.update();
        }
        // check collisions
        if(this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset();
            this.shipExplodeOne(this.ship03);
        }
        if(this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset();
            this.shipExplodeOne(this.ship02);
        }
        if(this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset();
            this.shipExplodeOne(this.ship01);
        }
        if (this.checkCollision(this.p1Rocket, this.ship04)) {
            this.p1Rocket.reset();
            this.shipTwoExplodeOne(this.ship04);
        }

        if(this.checkCollision(this.p2Rocket, this.ship03)) {
            this.p2Rocket.reset();
            this.shipExplodeTwo(this.ship03);
        }
        if(this.checkCollision(this.p2Rocket, this.ship02)) {
            this.p2Rocket.reset();
            this.shipExplodeTwo(this.ship02);
        }
        if(this.checkCollision(this.p2Rocket, this.ship01)) {
            this.p2Rocket.reset();
            this.shipExplodeTwo(this.ship01);
        }
        if (this.checkCollision(this.p2Rocket, this.ship04)) {
            this.p2Rocket.reset();
            this.shipTwoExplodeTwo(this.ship04);
        }
    }

    checkCollision(rocket, ship) {
        // simple AABB checking
        if (rocket.x < ship.x + ship.width &&
            rocket.x + rocket.width > ship.x &&
            rocket.y < ship.y + ship.height &&
            rocket.y + rocket.height > ship.y) {
                return true;
        } else {
            return false;
        }
    }

    shipExplodeOne(ship) {
        // temporarirly hide ship
        ship.alpha = 0;
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');
        boom.on('animationcomplete', () => {
            ship.reset();
            ship.alpha = 1;
            boom.destroy();
        });
        // score add and repaint
        this.p1Score += ship.points;
        this.scoreLeft.text = "P1 " + this.p1Score;
        
        this.sound.play('sfx_explosion');
    }

    shipExplodeTwo(ship) {
        // temporarirly hide ship
        ship.alpha = 0;
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');
        boom.on('animationcomplete', () => {
            ship.reset();
            ship.alpha = 1;
            boom.destroy();
        });
        // score add and repaint
        this.p2Score += ship.points;
        this.scoreRight.text = "P2 " + this.p2Score;
        
        this.sound.play('sfx_explosion');
    }

    shipTwoExplodeOne(ship) {
        // temporarirly hide ship
        ship.alpha = 0;
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion2').setOrigin(0, 0);
        boom.anims.play('explode2');
        boom.on('animationcomplete', () => {
            ship.reset();
            ship.alpha = 1;
            boom.destroy();
        });
        // score add and repaint
        this.p1Score += ship.points;
        this.scoreLeft.text = "P1 " + this.p1Score;
        
        this.sound.play('sfx_explosion');
    }

    shipTwoExplodeTwo(ship) {
        // temporarirly hide ship
        ship.alpha = 0;
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion2').setOrigin(0, 0);
        boom.anims.play('explode2');
        boom.on('animationcomplete', () => {
            ship.reset();
            ship.alpha = 1;
            boom.destroy();
        });
        // score add and repaint
        this.p2Score += ship.points;
        this.scoreRight.text = "P2 " + this.p2Score;
        
        this.sound.play('sfx_explosion');
    }
}