var config = {
  type: Phaser.AUTO,
  width: '97%',
  height: '97%',
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