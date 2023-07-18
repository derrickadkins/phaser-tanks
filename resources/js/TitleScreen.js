class TitleScreen extends Phaser.Scene {
    constructor() {
        super("titleScreen");
    }

    preload() {
        this.load.image('title_bg', 'resources/assets/titleScreen.jpeg');
        this.load.image('tiles', 'resources/assets/map/jawbreaker/jawbreaker_tiles.png');
        this.load.tilemapTiledJSON('level_1', 'resources/assets/map/jawbreaker/level_1.json');
        this.load.image('hull1', 'resources/assets/sprites/free-2d-battle-tank-game-assets/PNG/Hulls_Color_B/Hull_01.png');
        this.load.image('hull2', 'resources/assets/sprites/free-2d-battle-tank-game-assets/PNG/Hulls_Color_A/Hull_02.png');
        this.load.image('gun1', 'resources/assets/sprites/free-2d-battle-tank-game-assets/PNG/Weapon_Color_B/Gun_01.png');
        this.load.image('gun2', 'resources/assets/sprites/free-2d-battle-tank-game-assets/PNG/Weapon_Color_A/Gun_02.png');
        this.load.image('lightShell', 'resources/assets/sprites/free-2d-battle-tank-game-assets/PNG/Effects/Light_Shell.png');

        this.load.image('track1A', 'resources/assets/sprites/free-2d-battle-tank-game-assets/PNG/Tracks/Track_1_A.png');
        this.load.image('track1B', 'resources/assets/sprites/free-2d-battle-tank-game-assets/PNG/Tracks/Track_1_B.png');

        this.load.image('explosion1', 'resources/assets/sprites/free-2d-battle-tank-game-assets/PNG/Effects/Explosion_A.png');
        this.load.image('explosion2', 'resources/assets/sprites/free-2d-battle-tank-game-assets/PNG/Effects/Explosion_B.png');
        this.load.image('explosion3', 'resources/assets/sprites/free-2d-battle-tank-game-assets/PNG/Effects/Explosion_C.png');
        this.load.image('explosion4', 'resources/assets/sprites/free-2d-battle-tank-game-assets/PNG/Effects/Explosion_D.png');
        this.load.image('explosion5', 'resources/assets/sprites/free-2d-battle-tank-game-assets/PNG/Effects/Explosion_E.png');
        this.load.image('explosion6', 'resources/assets/sprites/free-2d-battle-tank-game-assets/PNG/Effects/Explosion_F.png');
        this.load.image('explosion7', 'resources/assets/sprites/free-2d-battle-tank-game-assets/PNG/Effects/Explosion_G.png');
        this.load.image('explosion8', 'resources/assets/sprites/free-2d-battle-tank-game-assets/PNG/Effects/Explosion_H.png');

        this.load.image('flash1', 'resources/assets/sprites/free-2d-battle-tank-game-assets/PNG/Effects/Flash_A_01.png');
        this.load.image('flash2', 'resources/assets/sprites/free-2d-battle-tank-game-assets/PNG/Effects/Flash_A_02.png');
        this.load.image('flash3', 'resources/assets/sprites/free-2d-battle-tank-game-assets/PNG/Effects/Flash_A_03.png');
        this.load.image('flash4', 'resources/assets/sprites/free-2d-battle-tank-game-assets/PNG/Effects/Flash_A_04.png');
        this.load.image('flash5', 'resources/assets/sprites/free-2d-battle-tank-game-assets/PNG/Effects/Flash_A_05.png');
    }

    create() {
        const bg = this.add.image(60 * 8, 25 * 8, 'title_bg');
        //bg.setOrigin(0, 0);
        bg.setScale(3);

        // Add "Tanks" in the center of the screen
        this.add.text(15 * 8, 6 * 8, "Tanks", { font: "65px Arial", fill: "#0" }).setOrigin(0.5);
        // Add "Click to start" at the bottom of the screen
        this.add.text(15 * 8, 15 * 8, "Click to start", { font: "32px Arial", fill: "#0" }).setOrigin(0.5);

        // Add the pointerdown event listener
        this.input.on('pointerdown', this.handlePointerDown, this);

        // Enable multiple touch inputs
        this.input.addPointer(2);

        if (this.anims.get('track1Animation') != undefined) return;
        this.anims.create({
            key: 'track1Animation',
            frames: [
                { key: 'track1A', frame: 0 },
                { key: 'track1B', frame: 0 }
            ],
            frameRate: 10,
            repeat: -1,
        });

        this.anims.create({
            key: 'explosionAnimation',
            frames: [
                { key: 'explosion1', frame: 0 },
                { key: 'explosion2', frame: 0 },
                { key: 'explosion3', frame: 0 },
                { key: 'explosion4', frame: 0 },
                { key: 'explosion5', frame: 0 },
                { key: 'explosion6', frame: 0 },
                { key: 'explosion7', frame: 0 },
                { key: 'explosion8', frame: 0 }
            ],
            frameRate: 10,
            repeat: 0,
            hideOnComplete: true
        });

        this.anims.create({
            key: 'flashAnimation',
            frames: [
                { key: 'flash1', frame: 0 },
                { key: 'flash2', frame: 0 },
                { key: 'flash3', frame: 0 },
                { key: 'flash4', frame: 0 },
                { key: 'flash5', frame: 0 }
            ],
            frameRate: 10,
            repeat: 0,
            hideOnComplete: true
        });
    }

    handlePointerDown(pointer) {
        this.scene.start("level1");
    }
}