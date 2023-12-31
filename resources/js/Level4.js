class Level4 extends Level {
  constructor() {
    super("level4", "level_4");
  }

  preload() {
    this.load.tilemapTiledJSON('level_4', 'resources/assets/map/jawbreaker/level_4.json');
  }

  create() {
    this.player = new Player(this, 106 * 8, 4 * 8);

    // hard settings
    var enemyHealth = 1000;
    var enemySpeed = this.player.speed * 2;
    var enemyFireRate = 3;

    if (settings.difficulty == 1) {
      enemyHealth = 250;
      enemySpeed = this.player.speed;
      enemyFireRate = 2;
    } else if (settings.difficulty == 2) {
      enemyHealth = 500;
      enemySpeed = this.player.speed * 1.5;
      enemyFireRate = 2.5;
    }

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

    super.create();
  }

  // Handle level complete
  handleLevelComplete() {
    super.handleLevelComplete("You Won!", "Click to start over", "titleScreen");
  }
}