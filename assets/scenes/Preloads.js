import { FRUIT } from "../../utils/utils.js";
const { PINE, ORANGE, APPLE, STRAW } = FRUIT;

export default class Preload extends Phaser.Scene {
  constructor() {
    super("Preload");
  }

  preload() {
    this.load.image("fondoDia", "./assets/images/fondo_dia.jpg");
    this.load.image("ground", "./assets/images/pasto.png");
    this.load.image("pinguino", "./assets/images/pinguino.png");
    this.load.image(ORANGE, "./assets/images/naranja.png");
    this.load.image(APPLE, "./assets/images/manzana.png");
    this.load.image(PINE, "./assets/images/anana.png");
    this.load.image(STRAW, "./assets/images/sandia.png");
    this.load.image("game-over", "./assets/images/game-over.png");
    this.load.image("congrats", "./assets/images/congrats.png");
  }

  create() {
    this.scene.start("game");
  }
}
