class LightShell extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, rotation, firedBy) {
        super(scene, x, y, 'lightShell');
        scene.add.existing(this);
        scene.physics.world.enableBody(this);    
        this.rotation = rotation;
        this.scale = 0.5;
        this.firedBy = firedBy;
    }

    update() {
        // Calculate the velocity components based on the rotation
        const speed = 250;
        this.body.velocity.x = Math.sin(this.rotation) * speed;
        this.body.velocity.y = -Math.cos(this.rotation) * speed;

        // Destroy the projectile if it goes off-screen
        if (
            this.x < 0 ||
            this.x > this.scene.game.config.width ||
            this.y < 0 ||
            this.y > this.scene.game.config.height
        ) {
            this.destroy();
        }
    }
}