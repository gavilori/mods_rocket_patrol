// Gyle Viloria
// "Rocket Patrol - Better"
// 4/19/2022

// Score Breakdown

// 5 - Royalty-free BG music in-game that loops
// // Credit: https://freemusicarchive.org/music/sawsquarenoise/dojokratos/boss-theme 

// 5 - Implement Speed Increase after 30 seconds

// 5 - Allow players to control the Rocket after it's fired

// 5 - High Score

// 10 - Display time remaining

// 20 - New Spaceship

// 20 - Mouse Mode
// // only available for 1P mode, and is optional

// 30 - Simultaneous Multiplayer
// // option to select between 1P or 2P modes


let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scene: [ Menu, OnePlayer, TwoPlayer, Play, TwoPlay ]
}

let game = new Phaser.Game(config);
// reserve keyboard vars
let keyR, keyLEFT, keyRIGHT, keyUP, keyA, keyD, keyW, keySPACE;

// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;
game.highScore = 0;