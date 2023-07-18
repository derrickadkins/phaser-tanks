class Flash extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, rotation) {
    super(scene, x, y, "flash");
    scene.add.existing(this);
    this.scale = 0.5;
    this.rotation = rotation;
    this.play("flashAnimation");
  }
}