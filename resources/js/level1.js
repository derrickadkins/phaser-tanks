class Level1 extends Phaser.Scene {
    constructor() {
        super("level1");
    }

    create() {
        // Add the pointerdown event listener
        this.input.on('pointerdown', this.handlePointerDown, this);

        this.map = this.make.tilemap({ key: 'map', tilewidth: 100, tileheight: 100 });
        const tileset = this.map.addTilesetImage('jawbreaker_tiles', 'tiles');
        const groundLayer = this.map.createLayer("ground", tileset, 0, 0);
        this.wallsLayer = this.map.createLayer("walls", tileset, 0, 0);
        this.wallsLayer.setCollisionBetween(1, 67);

        const playerStartX = 25*8;
        const playerStartY = 25*8;

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

        this.cursorKeys = this.input.keyboard.createCursorKeys();
        this.player.setCollideWorldBounds(true);

        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.projectiles = this.add.group();

        this.enemies = this.add.group();
        this.enemies.add(new Enemy(this, 50*8, 25*8));
        this.enemies.add(new Enemy(this, 75*8, 50*8));
        this.enemies.add(new Enemy(this, 50*8, 75*8));
        this.enemies.add(new Enemy(this, 25*8, 50*8));

        this.physics.add.collider(this.track1aLeft, this.wallsLayer);
        this.physics.add.collider(this.track1aRight, this.wallsLayer);
        this.physics.add.collider(this.player, this.wallsLayer);
        this.physics.add.collider(this.gun, this.wallsLayer);
        this.physics.add.collider(this.enemies, this.wallsLayer);
        this.physics.add.collider(this.enemies, this.player);
        this.physics.add.collider(this.enemies, this.enemies);
        
        this.physics.add.collider(this.projectiles, this.wallsLayer, this.projectileWallCollision, null, this);
        this.physics.add.overlap(this.enemies, this.projectiles, this.enemyProjectileCollision, null, this);
        this.physics.add.overlap(this.player, this.projectiles, this.playerProjectileCollision, null, this);
    }

    update() {
        this.movePlayerManager();
        this.gunRotationManager();

        if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
            // Calculate the offset based on the gun's rotation
            const offset = new Phaser.Math.Vector2(0, -40);
            Phaser.Math.Rotate(offset, this.gun.rotation);
            this.projectiles.add(new LightShell(this, this.gun.x + offset.x, this.gun.y + offset.y, this.gun.rotation, this.player));
        }
    
        for (var i = 0; i < this.projectiles.getChildren().length; i++) {
            this.projectiles.getChildren()[i].update();
        }

        for (var i = 0; i < this.enemies.getChildren().length; i++) {
            this.enemies.getChildren()[i].update();
        }
    }

    
    movePlayerManager() {

        const pointer = this.input.activePointer;
        const player = this.player;
        const distance = Phaser.Math.Distance.Between(player.x, player.y, pointer.x, pointer.y);

        // todo: fix interference between pointers
        if (pointer.isDown && distance > 10) {
            //console.log('pointer down:'+pointer.id);
            // detect if pointer is being held down and not a tap
            if (!pointer.startTime) {
                // First frame of pointer down, initialize custom data
                pointer.startTime = this.time.now;
            }

            const elapsedTime = this.time.now - pointer.startTime;
            const holdThreshold = 750; // Adjust the hold threshold duration as needed

            if (elapsedTime < holdThreshold) return;

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
            pointer.startTime = 0;
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
            this.gun.rotation -= 0.05;
        }else if (this.cursorKeys.right.isDown) {
            this.gun.rotation += 0.05;
        }
    }

    // Handle collision between projectiles and walls
    projectileWallCollision(projectile, wall) {
        projectile.destroy();
    }

    // Handle collision between projectiles and enemies
    enemyProjectileCollision(enemy, projectile) {
        if(projectile.firedBy != enemy) {
            if(projectile.firedBy == this.player) enemy.destroy();
            projectile.destroy();
        }
    }

    // Handle collision between projectiles and player
    playerProjectileCollision(player, projectile) {
        if(projectile.firedBy != player) projectile.destroy();
    }

    handlePointerDown(pointer) {
        // Check if it's a tap event (pointer down and up without significant movement)
        const movementThreshold = 10; // Adjust the threshold as needed
        const downX = pointer.downX;
        const downY = pointer.downY;
        const upX = pointer.upX;
        const upY = pointer.upY;

        const distance = Phaser.Math.Distance.Between(downX, downY, upX, upY);
    
        if (distance <= movementThreshold) {
            //console.log('Tap event:'+pointer.id);
            // stop the propagation of the event to the rest of the game objects
            pointer.event.stopPropagation();
            // rotate the gun towards the pointer
            const angle = Phaser.Math.Angle.Between(this.gun.x, this.gun.y, pointer.x, pointer.y);
            this.gun.rotation = angle + Phaser.Math.DegToRad(90);
            // Calculate the offset based on the gun's rotation
            const offset = new Phaser.Math.Vector2(0, -40);
            Phaser.Math.Rotate(offset, this.gun.rotation);
            this.projectiles.add(new LightShell(this, this.gun.x + offset.x, this.gun.y + offset.y, this.gun.rotation, this.player));
        }
    }
}