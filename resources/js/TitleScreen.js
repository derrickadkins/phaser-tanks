class TitleScreen extends Phaser.Scene {
    constructor() {
        super("titleScreen");
    }

    preload() {
        this.load.image('tiles', 'resources/assets/map/jawbreaker/jawbreaker_tiles.png');
        this.load.tilemapTiledJSON('map', 'resources/assets/map/jawbreaker/level_1.json');
        this.load.image('track1A', 'resources/assets/sprites/free-2d-battle-tank-game-assets/PNG/Tracks/Track_1_A.png');
        this.load.image('track1B', 'resources/assets/sprites/free-2d-battle-tank-game-assets/PNG/Tracks/Track_1_B.png');
        this.load.image('hull1', 'resources/assets/sprites/free-2d-battle-tank-game-assets/PNG/Hulls_Color_B/Hull_01.png');
        this.load.image('hull2', 'resources/assets/sprites/free-2d-battle-tank-game-assets/PNG/Hulls_Color_A/Hull_02.png');
        this.load.image('gun1', 'resources/assets/sprites/free-2d-battle-tank-game-assets/PNG/Weapon_Color_B/Gun_01.png');
        this.load.image('gun2', 'resources/assets/sprites/free-2d-battle-tank-game-assets/PNG/Weapon_Color_A/Gun_02.png');
        this.load.image('lightShell', 'resources/assets/sprites/free-2d-battle-tank-game-assets/PNG/Effects/Light_Shell.png');
    }

    create() {
        // Add "Tanks" in the center of the screen
        this.add.text(400, 300, "Tanks", { font: "65px Arial", fill: "#ffffff" }).setOrigin(0.5);
        // Add "Click to start" at the bottom of the screen
        this.add.text(400, 500, "Click to start", { font: "32px Arial", fill: "#ffffff" }).setOrigin(0.5);

        // Add the pointerdown event listener
        this.input.on('pointerdown', this.handlePointerDown, this);

        // Enable multiple touch inputs
        this.input.addPointer(2);

        this.anims.create({
            key: 'track1Animation',
            frames: [
                { key: 'track1A', frame: 0 },
                { key: 'track1B', frame: 0 }
            ],
            frameRate: 10,
            repeat: -1,
        });
    }

    handlePointerDown(pointer) {
        this.scene.start("level1");
    }
}