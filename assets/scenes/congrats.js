export default class Congrats extends Phaser.Scene {
    constructor() {
        super({ key: 'congratulations' })
    }

    create() {
        this.add.image(400, 390, "congrats")
            .setInteractive()
            .on('pointerdown', () => this.scene.start('Game'));

    }
}