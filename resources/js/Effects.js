class Explosion extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "explosion");
    scene.add.existing(this);
    this.scale = settings.scale * 2;
    scene.sound.add("explosionSound").play();
    this.play("explosionAnimation");
  }
}

class Flash extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, rotation) {
    super(scene, x, y, "flash");
    scene.add.existing(this);
    this.scale = settings.scale * 2;
    this.rotation = rotation;
    this.play("flashAnimation");
  }
}

class LightShell extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, rotation, firedBy) {
    new Flash(scene, x, y, rotation);
    super(scene, x, y, 'lightShell');
    scene.add.existing(this);
    scene.physics.world.enableBody(this);
    this.rotation = rotation;
    this.scale = settings.scale * 2;
    this.firedBy = firedBy;
    scene.sound.add('lightShellSound').play();
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