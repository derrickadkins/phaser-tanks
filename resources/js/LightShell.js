class LightShell extends Phaser.GameObjects.Sprite {
    constructor(scene) {
        const x = scene.player.x;
        const y = scene.player.y;
        super(scene, x, y, 'lightShell');
        scene.add.existing(this);
        scene.physics.world.enableBody(this);
    
        // Set the rotation of the projectile to match the player's
        this.rotation = scene.player.rotation;
    
        // Calculate the offset based on the tank's rotation
        const offset = new Phaser.Math.Vector2(0, -30); // Adjust the offset as needed
        Phaser.Math.Rotate(offset, scene.player.rotation);
        this.x += offset.x;
        this.y += offset.y;
    
        scene.projectiles.add(this);
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