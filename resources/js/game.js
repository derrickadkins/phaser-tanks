var config = {
  type: Phaser.AUTO,
  parent: 'game',
  width: 112 * 8,
  height: 49 * 8,
  scale: {
    mode: Phaser.Scale.FIT,
    parent: 'game', // ID or element reference of the container div
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  backgroundColor: 0x000000,
  scene: [TitleScreen, Level1],
  disableContextMenu: true,
  physics: {
    default: "arcade",
    arcade: {
      debug: false
    }
  }
}
var game = new Phaser.Game(config);