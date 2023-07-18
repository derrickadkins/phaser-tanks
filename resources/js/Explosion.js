class Explosion extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "explosion");
    scene.add.existing(this);
    this.scale = settings.scale * 2;
    this.play("explosionAnimation");
  }
}