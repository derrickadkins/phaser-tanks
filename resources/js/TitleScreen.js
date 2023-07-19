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
        this.load.image('healthPack', 'resources/assets/healthPack.png');
        this.load.image('backArrow', 'resources/assets/arrow_back_FILL1_wght700_GRAD0_opsz48_white.png');

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

        this.load.audio('levelCompleteSound', 'resources/assets/audio/mixkit-completion-of-a-level-2063.wav');
        this.load.audio('lightShellSound', 'resources/assets/audio/mixkit-game-gun-shot-1662.mp3');
        this.load.audio('gameOverSound', 'resources/assets/audio/mixkit-arcade-chiptune-explosion-1691.wav');
        this.load.audio('explosionSound', 'resources/assets/audio/mixkit-arcade-game-explosion-2759.wav');
        this.load.audio('healSound', 'resources/assets/audio/mixkit-arcade-bonus-alert-767.wav');
        this.load.audio('levelMusic', 'resources/assets/audio/2022-02-04_-_War_Crown_-_www.FesliyanStudios.com.mp3');
    }

    create() {
        this.levelMusic = this.sound.add('levelMusic');
        this.levelMusic.play({ loop: true });

        const bg = this.add.image(60 * 8, 25 * 8, 'title_bg');
        //bg.setOrigin(0, 0);
        bg.setScale(3);

        // Add "Tanks" in the center of the screen
        this.add.text(15 * 8, 10 * 8, "Tanks", { font: "65px Arial", fill: "#0" }).setOrigin(0.5);

        // add settings text at top right
        this.settingsTxt = this.add.text(110 * 8, 2 * 8, "Settings", { font: "32px Arial", fill: "#0" }).setOrigin(1, 0).setInteractive();
        this.settingsTxt.on('pointerdown', () => {
            this.scene.start('settings');
        });

        // add opaque black rectangle
        const rect = this.add.rectangle(55 * 8, 13 * 8, 50 * 8, 30 * 8, 0x000000, 0.5).setOrigin(0.5, 0);
        // get center of rectangle
        const rectCenterX = rect.getCenter().x;
        const topTxtY = 17 * 8;

        // add difficulty texts
        this.add.text(rectCenterX, topTxtY, "Choose a difficulty", { font: "32px Arial", fill: "#ffffff" }).setOrigin(0.5);
        this.easyTxt = this.add.text(rectCenterX, topTxtY + 7 * 8, "Easy", { font: "32px Arial", fill: "#ffffff" }).setOrigin(0.5);
        this.mediumTxt = this.add.text(rectCenterX, topTxtY + 14 * 8, "Medium", { font: "32px Arial", fill: "#ffffff" }).setOrigin(0.5);
        this.hardTxt = this.add.text(rectCenterX, topTxtY + 21 * 8, "Hard", { font: "32px Arial", fill: "#ffffff" }).setOrigin(0.5);

        this.easyTxt.setInteractive();
        this.mediumTxt.setInteractive();
        this.hardTxt.setInteractive();

        this.easyTxt.on('pointerdown', () => { this.startGame(1); });
        this.mediumTxt.on('pointerdown', () => { this.startGame(2); });
        this.hardTxt.on('pointerdown', () => { this.startGame(3); });

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

    startGame(difficulty) {
        settings.difficulty = difficulty;
        this.levelMusic.stop();
        this.scene.start("level1");
    }
}