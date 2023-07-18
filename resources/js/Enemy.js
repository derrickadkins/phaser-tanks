class Enemy extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, health, speed) {
        super(scene, x, y, 'hull1');

        this.track1aLeft = scene.physics.add.sprite(x, y, 'track1A');
        this.track1aLeft.x -= 20;
        this.track1aLeft.scale = 0.25;

        this.track1aRight = scene.physics.add.sprite(x, y, 'track1A');
        this.track1aRight.x += 20;
        this.track1aRight.scale = 0.25;

        this.gun = scene.physics.add.sprite(x, y, 'gun1');
        this.gun.scale = 0.25;
        this.gun.depth = 1;

        this.scale = 0.25;
        this.lastFired = 0;

        this.health = health;
        this.speed = speed;

        scene.add.existing(this);
        scene.physics.world.enableBody(this);
    }

    update() {
        // detect if enemy has line of sight to player
        var ray = new Phaser.Geom.Line(this.x, this.y, this.scene.player.x, this.scene.player.y);
        var walls = this.scene.map.getTilesWithinShape(ray, { isNotEmpty: true }, this.scene.camera, this.scene.wallsLayer);
        if (walls.length > 0) {
            this.body.velocity.set(0);
            if (this.track1aLeft.anims.isPlaying) {
                this.track1aLeft.anims.stop();
                this.track1aRight.anims.stop();
            }
            return;
        }

        // calculate rotation to face player
        var dx = this.scene.player.x - this.x;
        var dy = this.scene.player.y - this.y;
        var angle = Math.atan2(dy, dx);
        this.rotation = angle + Phaser.Math.DegToRad(90);
        this.gun.rotation = this.rotation;

        // Set the position and rotation for the left track sprite
        this.track1aLeft.x = this.x + Math.cos(this.rotation) * 20;
        this.track1aLeft.y = this.y + Math.sin(this.rotation) * 20;
        this.track1aLeft.rotation = this.rotation;

        // Set the position and rotation for the right track sprite
        this.track1aRight.x = this.x - Math.cos(this.rotation) * 20;
        this.track1aRight.y = this.y - Math.sin(this.rotation) * 20;
        this.track1aRight.rotation = this.rotation;

        this.gun.x = this.x;
        this.gun.y = this.y;

        // move enemy towards player while enemy is 100 units away
        if (Phaser.Math.Distance.Between(this.x, this.y, this.scene.player.x, this.scene.player.y) > 100) {
            this.body.velocity.x = Math.cos(angle) * this.speed;
            this.body.velocity.y = Math.sin(angle) * this.speed;

            if (!this.track1aLeft.anims.isPlaying) {
                this.track1aLeft.play('track1Animation');
                this.track1aRight.play('track1Animation');
            }
        } else {
            this.body.velocity.set(0);
            if (this.track1aLeft.anims.isPlaying) {
                this.track1aLeft.anims.stop();
                this.track1aRight.anims.stop();
            }
        }

        const offset = new Phaser.Math.Vector2(0, -30);
        Phaser.Math.Rotate(offset, this.rotation);

        // fire LightShell at player every 1 second
        if (this.scene.time.now > this.lastFired) {
            this.scene.projectiles.add(new LightShell(this.scene, this.x + offset.x, this.y + offset.y, this.rotation, this));
            this.lastFired = this.scene.time.now + 1000;
        }
    }

    hit() {
        this.health -= 10;
        if (this.health <= 0) {
            if (this.scene.enemies.getChildren().length == 1) {
                this.scene.events.emit('levelComplete');
            }
            new Explosion(this.scene, this.x, this.y);
            this.destroy();
        }
    }

    destroy() {
        this.gun.destroy();
        this.track1aLeft.destroy();
        this.track1aRight.destroy();
        super.destroy();
    }
}