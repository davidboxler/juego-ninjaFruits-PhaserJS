export default class Menu extends Phaser.Scene {
  audio;
  constructor() {
    super("Menu");
  }

  create() {
    this.add.image(400, 300, "fondoDia").setScale(0.555);

    let btnJugar = this.physics.add.staticGroup();
    btnJugar
      .create(400, 350, "start")
      .setScale(0.55)
      .refreshBody()
      .setInteractive()
      .on("pointerdown", () => this.scene.start("game"));
  }
}
