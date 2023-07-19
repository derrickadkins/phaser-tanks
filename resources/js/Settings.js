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


  }
}