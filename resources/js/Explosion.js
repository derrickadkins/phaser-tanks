class Explosion extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "explosion");
    scene.add.existing(this);
    this.scale = settings.scale * 2;
    scene.sound.add("explosionSound").play();
    this.play("explosionAnimation");
  }
}