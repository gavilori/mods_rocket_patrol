let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scene: [ Menu, OnePlayer, TwoPlayer, Play, TwoPlay ]
}

let game = new Phaser.Game(config);
// reserve keyboard vars
let keyR, keyLEFT, keyRIGHT, keyUP, keyA, keyD, keyW;

// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;