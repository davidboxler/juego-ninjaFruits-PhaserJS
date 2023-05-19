export default class GameOver extends Phaser.Scene {
    constructor() {
        super({ key: 'GameOver' })
    }

    create() {
        this.add.image(400, 390, "game-over")
            .setInteractive()
            .on('pointerdown', () => this.scene.start('game'));
    }
}