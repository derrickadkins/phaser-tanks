import BoardPlugin from 'phaser3-rex-plugins/plugins/board-plugin.js';
var config = {
    width: 600,
    height: 600,
    backgroundColor: 0x000000,
    scene: [Level1],
    pixelArt: true,
    physics: {
      default: "arcade",
      arcade: {
        debug: false
      }
    },
    plugins: {
        scene: [{
            key: 'rexBoard',
            plugin: BoardPlugin,
            mapping: 'rexBoard'
        },
        ]
    }
  }
var game = new Phaser.Game(config);