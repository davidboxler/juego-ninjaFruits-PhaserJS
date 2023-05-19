export default class GameOver extends Phaser.Scene {
    constructor() {
        super({ key: 'game-over' })
    }

    create() {
        this.add.image(400, 390, "defeat")
            .setInteractive()
            .on('pointerdown', () => this.scene.start('Game'));

    }
}