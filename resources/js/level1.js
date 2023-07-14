class Level1 extends Phaser.Scene {
    constructor() {
        super("level1");
    }

    preload() {
        this.load.image('tiles', 'resources/assets/map/jawbreaker/jawbreaker_tiles.png');
        this.load.tilemapTiledJSON('map', 'resources/assets/map/jawbreaker/level_1.json');
        this.load.image('player', 'resources/assets/sprites/free-2d-battle-tank-game-assets/PNG/Hulls_Color_A/Hull_02.png');
        this.load.image('lightShell', 'resources/assets/sprites/free-2d-battle-tank-game-assets/PNG/Effects/Light_Shell.png');

        //todo - load the rest of the assets
    }

    create() {
        const map = this.make.tilemap({ key: 'map', tilewidth: 30, tileheight: 40 });
        const tileset = map.addTilesetImage('jawbreaker_tiles', 'tiles');
        const groundLayer = map.createLayer("ground", tileset, 0, 0);
        const wallsLayer = map.createLayer("walls", tileset, 0, 0);

        this.player = this.physics.add.sprite(50*8, 50*8, 'player');
        this.player.setScale(0.25);
        this.physics.add.collider(this.player, wallsLayer);
        wallsLayer.setCollisionBetween(1, 67);

        this.cursorKeys = this.input.keyboard.createCursorKeys();
        this.player.setCollideWorldBounds(true);

        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.projectiles = this.add.group();

        // Add collision between projectiles and walls
        this.physics.add.collider(this.projectiles, wallsLayer, this.projectileWallCollision, null, this);
    }

    update() {
        this.movePlayerManager();

        if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
            new LightShell(this);
        }
    
        for (var i = 0; i < this.projectiles.getChildren().length; i++) {
            this.projectiles.getChildren()[i].update();
        }

        //todo - add the rest of the game logic
    }

    
    movePlayerManager() {

        const pointer = this.input.activePointer;
        const player = this.player;
        const distance = Phaser.Math.Distance.Between(player.x, player.y, pointer.x, pointer.y);

        if (pointer.isDown && distance > 10) {
            // Calculate the angle between the player and the cursor
            const angle = Phaser.Math.Angle.Between(player.x, player.y, pointer.x, pointer.y);

            // Set the velocity for the player to move towards the cursor
            player.body.velocity.x = Math.cos(angle) * gameSettings.playerSpeed;
            player.body.velocity.y = Math.sin(angle) * gameSettings.playerSpeed;

            // Convert the angle to degrees and apply it to the player's rotation
            player.rotation = angle + Phaser.Math.DegToRad(90);
        } else {
            player.body.velocity.set(0);
        }
    }

    // Handle collision between projectiles and walls
    projectileWallCollision(projectile, wall) {
        projectile.destroy();
    }
}