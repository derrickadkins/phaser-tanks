class Level1 extends Level {
    constructor() {
        super("level1", "level_1");
    }

    create() {
        const playerStartX = 5 * 8;
        const playerStartY = 25 * 8;

        this.player = new Player(this, playerStartX, playerStartY);

        const enemyHealth = 100;
        const enemySpeed = this.player.speed * 0.5;
        const enemyFireRate = 1;
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