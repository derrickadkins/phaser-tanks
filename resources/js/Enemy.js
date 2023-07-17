class Enemy extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'gun1');
        scene.add.existing(this);
        scene.physics.world.enableBody(this);
        this.scale = 0.25;
        this.lastFired = 0;
    }

    update() {
        // detect if enemy has line of sight to player
        var ray = new Phaser.Geom.Line(this.x, this.y, this.scene.player.x, this.scene.player.y);
        var walls = this.scene.map.getTilesWithinShape(ray, { isNotEmpty: true }, this.scene.camera, this.scene.wallsLayer);
        if (walls.length > 0) return;

        // calculate rotation to face player
        var dx = this.scene.player.x - this.x;
        var dy = this.scene.player.y - this.y;
        var angle = Math.atan2(dy, dx);
        this.rotation = angle + Phaser.Math.DegToRad(90);
        
        // move enemy towards player while enemy is 100 units away
        if (Phaser.Math.Distance.Between(this.x, this.y, this.scene.player.x, this.scene.player.y) > 100) {
            this.body.velocity.x = Math.cos(angle) * (gameSettings.playerSpeed * 0.7);
            this.body.velocity.y = Math.sin(angle) * (gameSettings.playerSpeed * 0.7);
        }else{
            this.body.velocity.set(0);
        }

        const offset = new Phaser.Math.Vector2(0, -40);
        Phaser.Math.Rotate(offset, this.rotation);

        // fire LightShell at player every 1 second
        if (this.scene.time.now > this.lastFired) {
            this.scene.projectiles.add(new LightShell(this.scene, this.x + offset.x, this.y + offset.y, this.rotation, this));
            this.lastFired = this.scene.time.now + 1000;
        }
    }
}