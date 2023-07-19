var settings = {
  scale: 0.15,
  difficulty: 1,
  musicVolume: 0.5,
  soundEffectsVolume: 0.5
}
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
  scene: [TitleScreen, Settings, Level1, Level2, Level3, Level4],
  disableContextMenu: true,
  physics: {
    default: "arcade",
    arcade: {
      debug: false
    }
  }
}
var game = new Phaser.Game(config);