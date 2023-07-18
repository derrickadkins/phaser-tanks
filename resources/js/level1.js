class Level1 extends Phaser.Scene {
    constructor() {
        super("level1");
    }

    create() {
        this.map = this.make.tilemap({ key: 'level_1', tilewidth: 112, tileheight: 49 });
        const tileset = this.map.addTilesetImage('jawbreaker_tiles', 'tiles');
        const groundLayer = this.map.createLayer("ground", tileset, 0, 0);
        this.wallsLayer = this.map.createLayer("walls", tileset, 0, 0);
        this.wallsLayer.setCollisionBetween(1, 67);

        const playerStartX = 5 * 8;
        const playerStartY = 25 * 8;

        this.player = new Player(this, playerStartX, playerStartY);

        this.cursorKeys = this.input.keyboard.createCursorKeys();
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.projectiles = this.add.group();

        const enemyHealth = 10;
        const enemySpeed = this.player.speed * 0.25;
        this.enemies = this.add.group();
        this.enemies.add(new Enemy(this, 105 * 8, 25 * 8, enemyHealth, enemySpeed));
        this.enemies.add(new Enemy(this, 82 * 8, 16 * 8, enemyHealth, enemySpeed));
        this.enemies.add(new Enemy(this, 63 * 8, 32 * 8, enemyHealth, enemySpeed));
        this.enemies.add(new Enemy(this, 25 * 8, 25 * 8, enemyHealth, enemySpeed));

        this.physics.add.collider(this.player, this.wallsLayer);
        this.physics.add.collider(this.enemies, this.wallsLayer);
        this.physics.add.collider(this.enemies, this.player);
        this.physics.add.collider(this.enemies, this.enemies);

        this.physics.add.collider(this.projectiles, this.wallsLayer, this.projectileWallCollision, null, this);
        this.physics.add.overlap(this.enemies, this.projectiles, this.enemyProjectileCollision, null, this);
        this.physics.add.overlap(this.player, this.projectiles, this.playerProjectileCollision, null, this);

        // Add the pointerdown event listener
        this.input.on('pointerdown', this.player.handlePointerDown, this);

        // catpure levelComplete event
        this.events.on('levelComplete', this.handleLevelComplete, this);
    }

    update() {
        this.player.update();

        for (var i = 0; i < this.projectiles.getChildren().length; i++) {
            this.projectiles.getChildren()[i].update();
        }

        for (var i = 0; i < this.enemies.getChildren().length; i++) {
            this.enemies.getChildren()[i].update();
        }
    }

    // Handle collision between projectiles and walls
    projectileWallCollision(projectile, wall) {
        projectile.destroy();
    }

    // Handle collision between projectiles and enemies
    enemyProjectileCollision(enemy, projectile) {
        if (projectile.firedBy != enemy) {
            if (projectile.firedBy == this.player) enemy.hit();
            projectile.destroy();
        }
    }

    // Handle collision between projectiles and player
    playerProjectileCollision(player, projectile) {
        if (projectile.firedBy != player) {
            player.hit();
            projectile.destroy();
        }
    }

    // Handle level complete
    handleLevelComplete() {
        const lvlCompleteTxt = this.add.text(55 * 8, 15 * 8, "Level Complete", { font: "65px Arial", fill: "#00ff00" });
        lvlCompleteTxt.setOrigin(0.5);
        lvlCompleteTxt.setDepth(2);
        const clickToContinueTxt = this.add.text(55 * 8, 35 * 8, "Click to continue", { font: "32px Arial", fill: "#00ff00" });
        clickToContinueTxt.setOrigin(0.5);
        clickToContinueTxt.setDepth(2);
        this.physics.pause();
        this.input.on('pointerdown', () => {
            this.scene.start("level2");
        });
    }
}