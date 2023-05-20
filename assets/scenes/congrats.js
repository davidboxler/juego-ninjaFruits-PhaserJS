export default class Congrats extends Phaser.Scene {
    constructor() {
        super({ key: 'Congrats' })
    }
    winSound;
    create() {
        this.winSound = this.sound.add('win');
        this.winSound.play();
        this.winSound.setVolume(0.5);
        this.add.image(400, 240, "congrats")
            .setInteractive()
            .on('pointerdown', () => this.scene.start('game'));
    }
}