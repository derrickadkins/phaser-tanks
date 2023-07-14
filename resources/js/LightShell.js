class LightShell extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, rotation) {
        super(scene, x, y, 'lightShell');
        scene.add.existing(this);
        scene.physics.world.enableBody(this);
    
        // Set the rotation of the projectile to match the gun's
        this.rotation = rotation;
    
        // Calculate the offset based on the gun's rotation
        const offset = new Phaser.Math.Vector2(0, -30); // Adjust the offset as needed
        Phaser.Math.Rotate(offset, scene.gun.rotation);
        this.x += offset.x;
        this.y += offset.y;

        this.scale = 0.5;
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