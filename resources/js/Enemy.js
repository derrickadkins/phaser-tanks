class Enemy extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'gun1');
        scene.add.existing(this);
        scene.physics.world.enableBody(this);
        this.scale = 0.25;
        this.lastFired = 0;
    }

    update() {
        // calculate rotation to face player
        var dx = this.scene.player.x - this.x;
        var dy = this.scene.player.y - this.y;
        var angle = Math.atan2(dy, dx);
        this.rotation = angle + Phaser.Math.DegToRad(90);

        // fire LightShell at player every 1 second
        // todo: fix x and y offset
        if (this.scene.time.now > this.lastFired) {
            this.scene.projectiles.add(new LightShell(this.scene, this.x, this.y, this.rotation));
            this.lastFired = this.scene.time.now + 1000;
        }
    }
}