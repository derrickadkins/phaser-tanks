class Explosion extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "explosion");
    scene.add.existing(this);
    this.scale = 0.5;
    this.play("explosionAnimation");
  }
}