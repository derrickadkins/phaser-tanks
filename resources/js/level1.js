class Level1 extends Phaser.Scene {
    constructor() {
        super("level1");
    }

    preload() {
        this.load.image('tiles', 'resources/assets/map/jawbreaker/jawbreaker_tiles.png');
        this.load.tilemapTiledJSON('map', 'resources/assets/map/jawbreaker/level_1.json');
        this.load.image('player', 'resources/assets/sprites/free-2d-battle-tank-game-assets/PNG/Hulls_Color_A/Hull_02.png');
        this.load.image('lightShell', 'resources/assets/sprites/free-2d-battle-tank-game-assets/PNG/Effects/Light_Shell.png');
        this.load.image('track1A', 'resources/assets/sprites/free-2d-battle-tank-game-assets/PNG/Tracks/Track_1_A.png');
        this.load.image('track1B', 'resources/assets/sprites/free-2d-battle-tank-game-assets/PNG/Tracks/Track_1_B.png');
    }

    create() {
        const map = this.make.tilemap({ key: 'map', tilewidth: 30, tileheight: 40 });
        const tileset = map.addTilesetImage('jawbreaker_tiles', 'tiles');
        const groundLayer = map.createLayer("ground", tileset, 0, 0);
        const wallsLayer = map.createLayer("walls", tileset, 0, 0);
        wallsLayer.setCollisionBetween(1, 67);

        // Create the animation from the generated frame names
        this.anims.create({
            key: 'track1Animation',
            frames: [
                { key: 'track1A', frame: 0 },
                { key: 'track1B', frame: 1 }
            ],
            frameRate: 10,
            repeat: -1, // Set to -1 for infinite looping
        });

        const playerStartX = 50*8;
        const playerStartY = 50*8;

        this.track1aLeft = this.physics.add.sprite(playerStartX, playerStartY, 'track1A');
        this.track1aLeft.setOrigin(0.5, 0.5);
        this.track1aLeft.x -= 20;
        this.track1aLeft.scale = 0.25;

        this.track1aRight = this.physics.add.sprite(playerStartX, playerStartY, 'track1A');
        this.track1aRight.setOrigin(0.5, 0.5);
        this.track1aRight.x += 20;
        this.track1aRight.scale = 0.25;

        this.player = this.physics.add.sprite(playerStartX, playerStartY, 'player');
        this.player.setScale(0.25);

        this.physics.add.collider(this.player, wallsLayer);

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

            // Set the position and rotation for the left track sprite
            this.track1aLeft.x = player.x + Math.cos(player.rotation) * 20;
            this.track1aLeft.y = player.y + Math.sin(player.rotation) * 20;
            this.track1aLeft.rotation = player.rotation;

            // Set the position and rotation for the right track sprite
            this.track1aRight.x = player.x - Math.cos(player.rotation) * 20;
            this.track1aRight.y = player.y - Math.sin(player.rotation) * 20;
            this.track1aRight.rotation = player.rotation;
            
            if(!this.track1aLeft.anims.isPlaying){
                this.track1aLeft.play('track1Animation');
                this.track1aRight.play('track1Animation');
            }
        } else {
            player.body.velocity.set(0);
            if(this.track1aLeft.anims.isPlaying){
                this.track1aLeft.anims.stop();
                this.track1aRight.anims.stop();
            }
        }
    }

    // Handle collision between projectiles and walls
    projectileWallCollision(projectile, wall) {
        projectile.destroy();
    }
}