var gameSettings = {
    playerSpeed: 50
}
var config = {
    width: 100*8,
    height: 100*8,
    backgroundColor: 0x000000,
    scene: [Level1],
    pixelArt: true,
    physics: {
      default: "arcade",
      arcade: {
        debug: false
      }
    }
  }
var game = new Phaser.Game(config);