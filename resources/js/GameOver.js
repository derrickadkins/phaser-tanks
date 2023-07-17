class GameOver extends Phaser.Scene {
    constructor() {
        super("gameOver");
    }
    
    create() {
        this.add.text(400, 300, "Game Over", { font: "65px Arial", fill: "#ffffff" }).setOrigin(0.5);
        this.add.text(400, 500, "Click to restart", { font: "32px Arial", fill: "#ffffff" }).setOrigin(0.5);
        // Add the pointerdown event listener
        this.input.on('pointerdown', this.handlePointerDown, this);
    }

    handlePointerDown(pointer) {
        this.scene.start("level1");
    }
}