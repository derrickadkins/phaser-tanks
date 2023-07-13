class Level1 extends Phaser.Scene {
    constructor() {
        super("level1");
    }

    preload() {
        this.load.image('tiles', 'resources/assets/map/jawbreaker/jawbreaker_tiles.png');
        this.load.tilemapTiledJSON('map', 'resources/assets/map/jawbreaker/level_1.json');
        this.load.image('player', 'resources/assets/sprites/tank.png');

        //todo - load the rest of the assets
    }

    create() {
        const map = this.make.tilemap({ key: 'map', tilewidth: 30, tileheight: 40 });
        const tileset = map.addTilesetImage('jawbreaker_tiles', 'tiles');
        const groundLayer = map.createLayer("ground", tileset, 0, 0);
        const wallsLayer = map.createLayer("walls", tileset, 0, 0);

        this.player = this.physics.add.sprite(0, 0, 'player');
        this.physics.add.collider(this.player, wallsLayer);
        wallsLayer.setCollisionBetween(1, 67);

        this.cursorKeys = this.input.keyboard.createCursorKeys();
        this.player.setCollideWorldBounds(true);

        //todo - add the rest of the assets
    }

    update() {
        this.movePlayerManager();

        //todo - add the rest of the game logic
    }

    movePlayerManager() {

        this.player.setVelocity(0);

        if (this.cursorKeys.left.isDown) {
            this.player.setVelocityX(-gameSettings.playerSpeed);
        } else if (this.cursorKeys.right.isDown) {
            this.player.setVelocityX(gameSettings.playerSpeed);
        }

        if (this.cursorKeys.up.isDown) {
            this.player.setVelocityY(-gameSettings.playerSpeed);
        } else if (this.cursorKeys.down.isDown) {
            this.player.setVelocityY(gameSettings.playerSpeed);
        }
    }
}