class Level1 extends Level {
    constructor() {
        super("level1", "level_1");
    }

    create() {
        this.player = new Player(this, 5 * 8, 25 * 8);

        // hard settings
        var enemyHealth = 100;
        var enemySpeed = this.player.speed * 0.5;
        var enemyFireRate = 1;

        if (settings.difficulty == 1) {
            enemyHealth = 40;
            enemySpeed = this.player.speed * 0.3;
            enemyFireRate = .5;
        } else if (settings.difficulty == 2) {
            enemyHealth = 60;
            enemySpeed = this.player.speed * 0.4;
            enemyFireRate = .75;
        }

        this.enemies = this.add.group();
        this.enemies.add(new Enemy(this, 105 * 8, 25 * 8, enemyHealth, enemySpeed, enemyFireRate));
        this.enemies.add(new Enemy(this, 82 * 8, 16 * 8, enemyHealth, enemySpeed, enemyFireRate));
        this.enemies.add(new Enemy(this, 63 * 8, 32 * 8, enemyHealth, enemySpeed, enemyFireRate));
        this.enemies.add(new Enemy(this, 25 * 8, 25 * 8, enemyHealth, enemySpeed, enemyFireRate));

        super.create();
    }

    // Handle level complete
    handleLevelComplete() {
        super.handleLevelComplete("Level Complete", "Click to continue", "level2");
    }
}