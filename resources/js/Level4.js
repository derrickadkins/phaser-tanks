class Level4 extends Phaser.Scene {
  constructor() {
    super("level4");
  }

  preload() {
    this.load.tilemapTiledJSON('level_4', 'resources/assets/map/jawbreaker/level_4.json');
  }

  create() {
    this.map = this.make.tilemap({ key: 'level_4', tilewidth: 112, tileheight: 49 });
    const tileset = this.map.addTilesetImage('jawbreaker_tiles', 'tiles');
    const groundLayer = this.map.createLayer("ground", tileset, 0, 0);
    this.wallsLayer = this.map.createLayer("walls", tileset, 0, 0);
    this.wallsLayer.setCollisionBetween(1, 67);

    const playerStartX = 106 * 8;
    const playerStartY = 4 * 8;

    this.player = new Player(this, playerStartX, playerStartY);

    this.wsadKeys = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D
    });
    this.cursorKeys = this.input.keyboard.createCursorKeys();
    this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    this.projectiles = this.add.group();

    const enemyHealth = 1000;
    const enemySpeed = this.player.speed * 2;
    const enemyFireRate = 3;
    this.enemies = this.add.group();
    this.enemies.add(new Enemy(this, 4 * 8, 5 * 8, enemyHealth, enemySpeed, enemyFireRate));
    this.enemies.add(new Enemy(this, 29 * 8, 14 * 8, enemyHealth, enemySpeed, enemyFireRate));
    this.enemies.add(new Enemy(this, 28 * 8, 31 * 8, enemyHealth, enemySpeed, enemyFireRate));
    this.enemies.add(new Enemy(this, 95 * 8, 33 * 8, enemyHealth, enemySpeed, enemyFireRate));
    this.enemies.add(new Enemy(this, 61 * 8, 8 * 8, enemyHealth, enemySpeed, enemyFireRate));

    this.healthPacks = this.add.group();
    this.healthPacks.add(new HealthPack(this, 95 * 8, 40 * 8, 500));
    this.healthPacks.add(new HealthPack(this, 35 * 8, 45 * 8, 500));
    this.healthPacks.add(new HealthPack(this, 15 * 8, 15 * 8, 500));

    this.physics.add.collider(this.player, this.wallsLayer);
    this.physics.add.collider(this.enemies, this.wallsLayer);
    this.physics.add.collider(this.enemies, this.player);
    this.physics.add.collider(this.enemies, this.enemies);

    this.physics.add.collider(this.projectiles, this.wallsLayer, this.projectileWallCollision, null, this);
    this.physics.add.overlap(this.enemies, this.projectiles, this.enemyProjectileCollision, null, this);
    this.physics.add.overlap(this.player, this.projectiles, this.playerProjectileCollision, null, this);
    this.physics.add.overlap(this.player, this.healthPacks, this.playerHealthPackCollision, null, this);

    // Add the pointerdown event listener
    this.input.on('pointerdown', this.player.handlePointerDown, this);

    this.events.on('levelComplete', this.handleLevelComplete, this);
    this.events.on('gameOver', this.handleGameOver, this);

    this.levelMusic = this.sound.add('levelMusic');
    this.levelMusic.play({ loop: true });
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

  // Handle collision between player and health pack
  playerHealthPackCollision(player, healthPack) {
    player.heal(healthPack.health);
    healthPack.destroy();
  }

  // Handle level complete
  handleLevelComplete() {
    this.levelMusic.stop();
    this.sound.add('levelCompleteSound').play();
    const lvlCompleteTxt = this.add.text(55 * 8, 15 * 8, "You Won!", { font: "65px Arial", fill: "#00ff00" });
    lvlCompleteTxt.setOrigin(0.5);
    lvlCompleteTxt.setDepth(2);
    this.time.delayedCall(1000, () => {
      const clickToContinueTxt = this.add.text(55 * 8, 35 * 8, "Click to start over", { font: "32px Arial", fill: "#00ff00" });
      clickToContinueTxt.setOrigin(0.5);
      clickToContinueTxt.setDepth(2);
      this.physics.pause();
      this.input.on('pointerdown', () => {
        this.scene.start("titleScreen");
      });
    });
  }

  // Handle game over
  handleGameOver() {
    this.levelMusic.stop();
    this.sound.add('gameOverSound').play();
    const gameOverTxt = this.add.text(55 * 8, 15 * 8, "Game Over", { font: "65px Arial", fill: "#ff0000" });
    gameOverTxt.setOrigin(0.5);
    gameOverTxt.setDepth(2);
    this.time.delayedCall(1000, () => {
      const clickToRestartTxt = this.add.text(55 * 8, 35 * 8, "Click to restart", { font: "32px Arial", fill: "#ff0000" });
      clickToRestartTxt.setOrigin(0.5);
      clickToRestartTxt.setDepth(2);
      this.physics.pause();
      this.input.on('pointerdown', () => {
        this.scene.restart();
      });
    });
  }
}