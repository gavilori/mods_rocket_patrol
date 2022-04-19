// Spaceship prefab
class SpaceshipTwo extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.points = pointValue;
        this.moveSpeed = game.settings.spaceshipSpeed + 4;
    }

    update() {
        this.moveSpeed = game.settings.spaceshipSpeed + 4;
        this.x -= this.moveSpeed;
        if (this.x <= 0 - this.width) {
            this.reset();
        }
    }

    reset() {
        this.x = game.config.width + borderUISize*15;
    }
}