class Settings extends Phaser.Scene {
  constructor() {
    super("settings");
  }

  create() {
    this.add.image(60 * 8, 25 * 8, 'title_bg').setScale(3);

    // cover screen with opaque black rectangle
    this.add.rectangle(0, 0, 112 * 8, 49 * 8, 0x000000, 0.5).setOrigin(0);

    // add backwards arrow to top left
    const arrow = this.add.image(1 * 8, 1 * 8, 'backArrow').setOrigin(0, 0);
    arrow.setInteractive();
    arrow.on('pointerdown', () => {
      this.scene.start('titleScreen');
    });

    this.add.text(10 * 8, 10 * 8, "Music Volume", { font: "32px Arial", fill: "#ffffff" });
    this.add.text(10 * 8, 20 * 8, "Sound Effects Volume", { font: "32px Arial", fill: "#ffffff" });
    this.musicVolumeTxt = this.add.text(66 * 8, 10 * 8, settings.musicVolume + "%", { font: "32px Arial", fill: "#ffffff" });
    this.soundEffectsVolumeTxt = this.add.text(66 * 8, 20 * 8, settings.soundEffectsVolume + "%", { font: "32px Arial", fill: "#ffffff" });

    this.minusMusic = this.add.image(60 * 8, 12 * 8, 'minus');
    this.plusMusic = this.add.image(80 * 8, 12 * 8, 'plus');

    this.minusEffects = this.add.image(60 * 8, 22 * 8, 'minus');
    this.plusEffects = this.add.image(80 * 8, 22 * 8, 'plus');

    this.minusMusic.setInteractive();
    this.plusMusic.setInteractive();
    this.minusEffects.setInteractive();
    this.plusEffects.setInteractive();

    this.minusMusic.on('pointerdown', () => {
      if (settings.musicVolume > 0) {
        settings.musicVolume -= 10;
        this.updateMusicVolume();
      }
    });
    this.plusMusic.on('pointerdown', () => {
      if (settings.musicVolume < 100) {
        settings.musicVolume += 10;
        this.updateMusicVolume();
      }
    });
    this.minusEffects.on('pointerdown', () => {
      if (settings.soundEffectsVolume > 0) {
        settings.soundEffectsVolume -= 10;
        this.updateEffectsVolume();
      }
    });
    this.plusEffects.on('pointerdown', () => {
      if (settings.soundEffectsVolume < 100) {
        settings.soundEffectsVolume += 10;
        this.updateEffectsVolume();
      }
    });
  }

  updateMusicVolume() {
    this.musicVolumeTxt.setText(settings.musicVolume + "%");
    this.sound.get('levelMusic').setVolume(settings.musicVolume / 100);
  }

  updateEffectsVolume() {
    this.soundEffectsVolumeTxt.setText(settings.soundEffectsVolume + "%");
    this.sound.add('lightShellSound').setVolume(settings.soundEffectsVolume / 100).play();
  }
}