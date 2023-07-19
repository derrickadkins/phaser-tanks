class Level2 extends Level {
  constructor() {
    super("level2", "level_2");
  }

  preload() {
    this.load.tilemapTiledJSON('level_2', 'resources/assets/map/jawbreaker/level_2.json');
  }

  create() {
    this.player = new Player(this, 5 * 8, 25 * 8);

    // hard settings
    var enemyHealth = 200;
    var enemySpeed = this.player.speed;
    var enemyFireRate = 2;

    if (settings.difficulty == 1) {
      enemyHealth = 50;
      enemySpeed = this.player.speed * 0.5;
      enemyFireRate = 1;
    } else if (settings.difficulty == 2) {
      enemyHealth = 100;
      enemySpeed = this.player.speed * 0.75;
      enemyFireRate = 1.5;
    }

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