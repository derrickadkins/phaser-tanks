class Level2 extends Level {
  constructor() {
    super("level2", "level_2");
  }

  preload() {
    this.load.tilemapTiledJSON('level_2', 'resources/assets/map/jawbreaker/level_2.json');
  }

  create() {
    this.player = new Player(this, 5 * 8, 25 * 8);

    const enemyHealth = 200;
    const enemySpeed = this.player.speed;
    const enemyFireRate = 2;
    this.enemies = this.add.group();
    this.enemies.add(new Enemy(this, 25 * 8, 16 * 8, enemyHealth, enemySpeed, enemyFireRate));
    this.enemies.add(new Enemy(this, 25 * 8, 34 * 8, enemyHealth, enemySpeed, enemyFireRate));
    this.enemies.add(new Enemy(this, 4 * 8, 9 * 8, enemyHealth, enemySpeed, enemyFireRate));
    this.enemies.add(new Enemy(this, 85 * 8, 25 * 8, enemyHealth, enemySpeed, enemyFireRate));
    this.enemies.add(new Enemy(this, 100 * 8, 25 * 8, enemyHealth, enemySpeed, enemyFireRate));

    this.healthPacks = this.add.group();
    this.healthPacks.add(new HealthPack(this, 85 * 8, 15 * 8, 500));

    super.create();
  }

  // Handle level complete
  handleLevelComplete() {
    super.handleLevelComplete("Level Complete", "Click to continue", "level3");
  }
}