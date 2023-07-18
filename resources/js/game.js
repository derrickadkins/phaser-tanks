var config = {
  type: Phaser.AUTO,
  scale: {
    mode: Phaser.Scale.FIT,
    parent: 'game', // ID or element reference of the container div
    width: '100%',
    height: '100%',
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