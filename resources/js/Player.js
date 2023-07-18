class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'hull2');

        this.scale = settings.scale;
        this.health = 500;
        this.speed = 50;
        this.trackOffset = 11;
        this.gunOffset = 5;

        this.healthBar = scene.add.graphics();
        this.healthBar.fillStyle(0xff0000);
        this.healthBar.fillRect(10, 10, 100, 5);

        this.track1aLeft = scene.physics.add.sprite(x, y, 'track1A');
        this.track1aLeft.x -= this.trackOffset;
        this.track1aLeft.scale = this.scale;

        this.track1aRight = scene.physics.add.sprite(x, y, 'track1A');
        this.track1aRight.x += this.trackOffset;
        this.track1aRight.scale = this.scale;

        this.gun = scene.physics.add.sprite(x, y + this.gunOffset, 'gun2');
        this.gun.setOrigin(0.5, 0.65);
        this.gun.scale = this.scale;
        this.gun.depth = 1;

        scene.add.existing(this)
        scene.physics.world.enableBody(this);
        this.setCollideWorldBounds(true);
    }

    update() {
        this.movePlayerManager();
        this.gunRotationManager();

        if (Phaser.Input.Keyboard.JustDown(this.scene.spacebar)) {
            // Calculate the offset based on the gun's rotation
            const offset = new Phaser.Math.Vector2(0, -10);
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
            this.track1aLeft.x = this.x + Math.cos(this.rotation) * this.trackOffset;
            this.track1aLeft.y = this.y + Math.sin(this.rotation) * this.trackOffset;
            this.track1aLeft.rotation = this.rotation;

            // Set the position and rotation for the right track sprite
            this.track1aRight.x = this.x - Math.cos(this.rotation) * this.trackOffset;
            this.track1aRight.y = this.y - Math.sin(this.rotation) * this.trackOffset;
            this.track1aRight.rotation = this.rotation;

            if (!this.track1aLeft.anims.isPlaying) {
                this.track1aLeft.play('track1Animation');
                this.track1aRight.play('track1Animation');
            }

            this.gun.x = this.x - Math.sin(this.rotation) * this.gunOffset;
            this.gun.y = this.y + Math.cos(this.rotation) * this.gunOffset;
        } else {
            pointer.startTime = 0;
            this.body.velocity.set(0);
            if (this.track1aLeft.anims.isPlaying) {
                this.track1aLeft.anims.stop();
                this.track1aRight.anims.stop();
            }
        }
    }

    gunRotationManager() {
        //use arrows to rotate gun
        if (this.scene.cursorKeys.left.isDown) {
            this.gun.rotation -= 0.05;
        } else if (this.scene.cursorKeys.right.isDown) {
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

        // Update the health bar width based on the player's health value
        const barWidth = 100 * (this.health / 500);
        this.healthBar.clear();
        this.healthBar.fillStyle(0xff0000);
        this.healthBar.fillRect(10, 10, barWidth, 5);

        if (this.health <= 0) {
            new Explosion(this.scene, this.x, this.y);
            const gameOverTxt = this.scene.add.text(55 * 8, 15 * 8, "Game Over", { font: "65px Arial", fill: "#ff0000" });
            gameOverTxt.setOrigin(0.5);
            gameOverTxt.setDepth(2);
            const clickToRestartTxt = this.scene.add.text(55 * 8, 35 * 8, "Click to restart", { font: "32px Arial", fill: "#ff0000" });
            clickToRestartTxt.setOrigin(0.5);
            clickToRestartTxt.setDepth(2);
            this.scene.physics.pause();
            this.scene.input.on('pointerdown', () => {
                this.scene.scene.restart();
            });
        }
    }

    destroy() {
        this.track1aLeft.destroy();
        this.track1aRight.destroy();
        this.gun.destroy();
        super.destroy();
    }
}