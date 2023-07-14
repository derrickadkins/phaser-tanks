class Level1 extends Phaser.Scene {
    constructor() {
        super("level1");
    }

    preload() {
        this.load.image('tiles', 'resources/assets/map/jawbreaker/jawbreaker_tiles.png');
        this.load.tilemapTiledJSON('map', 'resources/assets/map/jawbreaker/level_1.json');
        this.load.image('track1A', 'resources/assets/sprites/free-2d-battle-tank-game-assets/PNG/Tracks/Track_1_A.png');
        this.load.image('track1B', 'resources/assets/sprites/free-2d-battle-tank-game-assets/PNG/Tracks/Track_1_B.png');
        this.load.image('hull2', 'resources/assets/sprites/free-2d-battle-tank-game-assets/PNG/Hulls_Color_A/Hull_02.png');
        this.load.image('gun2', 'resources/assets/sprites/free-2d-battle-tank-game-assets/PNG/Weapon_Color_A/Gun_02.png');
        this.load.image('lightShell', 'resources/assets/sprites/free-2d-battle-tank-game-assets/PNG/Effects/Light_Shell.png');
    }

    create() {
        const map = this.make.tilemap({ key: 'map', tilewidth: 30, tileheight: 40 });
        const tileset = map.addTilesetImage('jawbreaker_tiles', 'tiles');
        const groundLayer = map.createLayer("ground", tileset, 0, 0);
        const wallsLayer = map.createLayer("walls", tileset, 0, 0);
        wallsLayer.setCollisionBetween(1, 67);

        this.anims.create({
            key: 'track1Animation',
            frames: [
                { key: 'track1A', frame: 0 },
                { key: 'track1B', frame: 1 }
            ],
            frameRate: 10,
            repeat: -1,
        });

        const playerStartX = 50*8;
        const playerStartY = 50*8;

        this.track1aLeft = this.physics.add.sprite(playerStartX, playerStartY, 'track1A');
        this.track1aLeft.x -= 20;
        this.track1aLeft.scale = 0.25;

        this.track1aRight = this.physics.add.sprite(playerStartX, playerStartY, 'track1A');
        this.track1aRight.x += 20;
        this.track1aRight.scale = 0.25;

        this.player = this.physics.add.sprite(playerStartX, playerStartY, 'hull2');
        this.player.scale = 0.25;

        this.gun = this.physics.add.sprite(playerStartX, playerStartY + 10, 'gun2');
        this.gun.setOrigin(0.5, 0.65);
        this.gun.scale = 0.25;

        this.physics.add.collider(this.track1aLeft, wallsLayer);
        this.physics.add.collider(this.track1aRight, wallsLayer);
        this.physics.add.collider(this.player, wallsLayer);
        this.physics.add.collider(this.gun, wallsLayer);

        this.cursorKeys = this.input.keyboard.createCursorKeys();
        this.player.setCollideWorldBounds(true);

        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.projectiles = this.add.group();

        // Add collision between projectiles and walls
        this.physics.add.collider(this.projectiles, wallsLayer, this.projectileWallCollision, null, this);
    }

    update() {
        this.movePlayerManager();
        this.gunRotationManager();

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

            this.gun.x = player.x - Math.sin(player.rotation) * 10;
            this.gun.y = player.y + Math.cos(player.rotation) * 10;
        } else {
            player.body.velocity.set(0);
            if(this.track1aLeft.anims.isPlaying){
                this.track1aLeft.anims.stop();
                this.track1aRight.anims.stop();
            }
        }
    }

    gunRotationManager() {
        //use arrows to rotate gun
        if (this.cursorKeys.left.isDown) {
            this.gun.rotation -= 0.1;
        }else if (this.cursorKeys.right.isDown) {
            this.gun.rotation += 0.1;
        }
    }

    // Handle collision between projectiles and walls
    projectileWallCollision(projectile, wall) {
        projectile.destroy();
    }
}