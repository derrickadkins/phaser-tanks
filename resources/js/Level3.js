class Level3 extends Level {
  constructor() {
    super("level3", "level_3");
  }

  preload() {
    this.load.tilemapTiledJSON('level_3', 'resources/assets/map/jawbreaker/level_3.json');
  }

  create() {
    this.player = new Player(this, 10 * 8, 10 * 8);

    const enemyHealth = 500;
    const enemySpeed = this.player.speed * 1.5;
    const enemyFireRate = 3;
    this.enemies = this.add.group();
    this.enemies.add(new Enemy(this, 35 * 8, 7 * 8, enemyHealth, enemySpeed, enemyFireRate));
    this.enemies.add(new Enemy(this, 9 * 8, 40 * 8, enemyHealth, enemySpeed, enemyFireRate));
    this.enemies.add(new Enemy(this, 56 * 8, 4 * 8, enemyHealth, enemySpeed, enemyFireRate));
    this.enemies.add(new Enemy(this, 80 * 8, 41 * 8, enemyHealth, enemySpeed, enemyFireRate));
    this.enemies.add(new Enemy(this, 100 * 8, 7 * 8, enemyHealth, enemySpeed, enemyFireRate));

    this.healthPacks = this.add.group();
    this.healthPacks.add(new HealthPack(this, 42 * 8, 38 * 8, 500));
    this.healthPacks.add(new HealthPack(this, 70 * 8, 5 * 8, 500));

    super.create();
  }

  // Handle level complete
  handleLevelComplete() {
    super.handleLevelComplete("Level Complete", "Click to continue", "level4");
  }
}