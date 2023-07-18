class HealthPack extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, health) {
    super(scene, x, y, 'healthPack');
    this.scale = settings.scale / 2;
    this.health = health;
    scene.add.existing(this);
    scene.physics.world.enableBody(this);
  }
}