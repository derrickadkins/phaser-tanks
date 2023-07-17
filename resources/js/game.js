var config = {
    width: 100*8,
    height: 100*8,
    backgroundColor: 0x000000,
    scene: [TitleScreen, Level1, GameOver],
    pixelArt: true,
    physics: {
      default: "arcade",
      arcade: {
        debug: false
      }
    }
  }
var game = new Phaser.Game(config);