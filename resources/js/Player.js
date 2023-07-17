class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'hull2');

        this.track1aLeft = scene.physics.add.sprite(x, y, 'track1A');
        this.track1aLeft.x -= 20;
        this.track1aLeft.scale = 0.25;

        this.track1aRight = scene.physics.add.sprite(x, y, 'track1A');
        this.track1aRight.x += 20;
        this.track1aRight.scale = 0.25;

        this.gun = scene.physics.add.sprite(x, y + 10, 'gun2');
        this.gun.setOrigin(0.5, 0.65);
        this.gun.scale = 0.25;
        this.gun.depth = 1;

        this.scale = 0.25;

        this.health = 100;
        this.speed = 50;

        scene.add.existing(this)
        scene.physics.world.enableBody(this);
        this.setCollideWorldBounds(true);
    }

    update() {
        this.movePlayerManager();
        this.gunRotationManager();

        if (Phaser.Input.Keyboard.JustDown(this.scene.spacebar)) {
            // Calculate the offset based on the gun's rotation
            const offset = new Phaser.Math.Vector2(0, -30);
            Phaser.Math.Rotate(offset, this.gun.rotation);
            this.scene.projectiles.add(new LightShell(this.scene, this.gun.x + offset.x, this.gun.y + offset.y, this.gun.rotation, this));
        }
    }

    movePlayerManager() {

        const pointer = this.scene.input.activePointer;
        const distance = Phaser.Math.Distance.Between(this.x, this.y, pointer.x, pointer.y);

        // todo: fix interference between pointers
        if (pointer.isDown && distance > 10) {
            //console.log('pointer down:'+pointer.id);
            // detect if pointer is being held down and not a tap
            if (!pointer.startTime) {
                // First frame of pointer down, initialize custom data
                pointer.startTime = this.scene.time.now;
            }

            const elapsedTime = this.scene.time.now - pointer.startTime;
            const holdThreshold = 750; // Adjust the hold threshold duration as needed

            if (elapsedTime < holdThreshold) return;

            // Calculate the angle between the player and the cursor
            const angle = Phaser.Math.Angle.Between(this.x, this.y, pointer.x, pointer.y);

            // Set the velocity for the player to move towards the cursor
            this.body.velocity.x = Math.cos(angle) * this.speed;
            this.body.velocity.y = Math.sin(angle) * this.speed;

            // Convert the angle to degrees and apply it to the player's rotation
            this.rotation = angle + Phaser.Math.DegToRad(90);

            // Set the position and rotation for the left track sprite
            this.track1aLeft.x = this.x + Math.cos(this.rotation) * 20;
            this.track1aLeft.y = this.y + Math.sin(this.rotation) * 20;
            this.track1aLeft.rotation = this.rotation;

            // Set the position and rotation for the right track sprite
            this.track1aRight.x = this.x - Math.cos(this.rotation) * 20;
            this.track1aRight.y = this.y - Math.sin(this.rotation) * 20;
            this.track1aRight.rotation = this.rotation;
            
            if(!this.track1aLeft.anims.isPlaying){
                this.track1aLeft.play('track1Animation');
                this.track1aRight.play('track1Animation');
            }

            this.gun.x = this.x - Math.sin(this.rotation) * 10;
            this.gun.y = this.y + Math.cos(this.rotation) * 10;
        } else {
            pointer.startTime = 0;
            this.body.velocity.set(0);
            if(this.track1aLeft.anims.isPlaying){
                this.track1aLeft.anims.stop();
                this.track1aRight.anims.stop();
            }
        }
    }

    gunRotationManager() {
        //use arrows to rotate gun
        if (this.scene.cursorKeys.left.isDown) {
            this.gun.rotation -= 0.05;
        }else if (this.scene.cursorKeys.right.isDown) {
            this.gun.rotation += 0.05;
        }
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
            //console.log(this);
            const gun = this.player.gun;
            // rotate the gun towards the pointer
            const angle = Phaser.Math.Angle.Between(gun.x, gun.y, pointer.x, pointer.y);
            gun.rotation = angle + Phaser.Math.DegToRad(90);
            // Calculate the offset based on the gun's rotation
            const offset = new Phaser.Math.Vector2(0, -30);
            Phaser.Math.Rotate(offset, gun.rotation);
            this.projectiles.add(new LightShell(this, gun.x + offset.x, gun.y + offset.y, gun.rotation, this.player));
        }
    }

    hit() {
        this.health -= 10;
        if (this.health <= 0) {
            this.scene.scene.start('gameOver');
        }
    }

    destroy() {
        this.track1aLeft.destroy();
        this.track1aRight.destroy();
        this.gun.destroy();
        super.destroy();
    }
}