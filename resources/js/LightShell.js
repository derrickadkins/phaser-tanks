class LightShell extends Phaser.GameObjects.Sprite {
    constructor(scene){
        var x = scene.player.x;
        var y = scene.player.y;
        super(scene, x, y, 'lightShell');
        scene.add.existing(this);
        scene.physics.world.enableBody(this);
        this.body.velocity.y = 250;
        scene.projectiles.add(this);
    }

    update() {
        //destroy if off screen
        if (this.y > config.height) {
            this.destroy();
        }
    }
}