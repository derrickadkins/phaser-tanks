class Enemy extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, health, speed, fireRate) {
        super(scene, x, y, 'hull1');

        this.scale = settings.scale;
        this.lastFired = 0;
        this.maxHealth = health;
        this.health = health;
        this.speed = speed;
        this.fireRate = fireRate;
        this.trackOffset = 11;
        this.healthOffset = 25;
        this.maxHealthBarWidth = 50;

        this.healthBar = scene.add.graphics();
        this.healthBar.fillStyle(0xff0000);
        this.healthBar.fillRect(x - this.healthOffset, y - this.healthOffset, this.maxHealthBarWidth, 1);
        this.healthBar.depth = 1;

        this.track1aLeft = scene.physics.add.sprite(x, y, 'track1A');
        this.track1aLeft.x -= this.trackOffset;
        this.track1aLeft.scale = this.scale;

        this.track1aRight = scene.physics.add.sprite(x, y, 'track1A');
        this.track1aRight.x += this.trackOffset;
        this.track1aRight.scale = this.scale;

        this.gun = scene.physics.add.sprite(x, y, 'gun1');
        this.gun.scale = this.scale;
        this.gun.depth = 1;

        scene.add.existing(this);
        scene.physics.world.enableBody(this);
    }

    update() {
        const barWidth = this.maxHealthBarWidth * (this.health / this.maxHealth);
        this.healthBar.clear();
        this.healthBar.fillStyle(0xff0000);
        this.healthBar.fillRect(this.x - this.healthOffset, this.y - this.healthOffset, barWidth, 1);
        this.healthBar.depth = 1;

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
        this.track1aLeft.x = this.x + Math.cos(this.rotation) * this.trackOffset;
        this.track1aLeft.y = this.y + Math.sin(this.rotation) * this.trackOffset;
        this.track1aLeft.rotation = this.rotation;

        // Set the position and rotation for the right track sprite
        this.track1aRight.x = this.x - Math.cos(this.rotation) * this.trackOffset;
        this.track1aRight.y = this.y - Math.sin(this.rotation) * this.trackOffset;
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

        const offset = new Phaser.Math.Vector2(0, -10);
        Phaser.Math.Rotate(offset, this.rotation);

        // fire LightShell at player every 1 second
        if (this.scene.time.now > this.lastFired) {
            this.scene.projectiles.add(new LightShell(this.scene, this.x + offset.x, this.y + offset.y, this.rotation, this));
            this.lastFired = this.scene.time.now + (1000 / this.fireRate);
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
        this.healthBar.destroy();
        this.gun.destroy();
        this.track1aLeft.destroy();
        this.track1aRight.destroy();
        super.destroy();
    }
}