// Rocket prefab
class MouseRocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        // add object to existing scene
        scene.add.existing(this);
        this.isFiring = false;
        this.moveSpeed = 2;
        this.sfxRocket = scene.sound.add('sfx_rocket');
        this.scene = scene;
    }

    update() {
        // left/right movement
        if (this.scene.input.activePointer.x >= borderUISize + this.width && this.scene.input.activePointer.x <= game.config.width - borderUISize - this.width) {
            this.x = this.scene.input.activePointer.x;
        }
        // fire button
        if (this.scene.input.activePointer.leftButtonDown() && !this.isFiring) {
            this.isFiring = true;
            this.sfxRocket.play();
        }
        // if fired, move up
        if (this.isFiring && this.y >= borderUISize * 3 + borderPadding) {
            this.y -= this.moveSpeed*3;
        }
        // reset on miss
        if (this.y <= borderUISize * 3 + borderPadding) {
            this.reset();
        }
    }

    reset() {
        this.isFiring = false;
        this.y = game.config.height - borderUISize - borderPadding;
    }
}