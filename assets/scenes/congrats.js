export default class Congrats extends Phaser.Scene {
    constructor() {
        super({ key: 'Congrats' })
    }

    create() {
        this.add.image(400, 240, "congrats")
            .setInteractive()
            .on('pointerdown', () => this.scene.start('Game'));
    }
}