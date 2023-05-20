import { FRUIT } from "../../utils/utils.js";
const { PINE, ORANGE, APPLE, STRAW } = FRUIT;

export default class Preload extends Phaser.Scene {
  constructor() {
    super("Preload");
  }

  preload() {
    this.load.image("fondoDia", "./assets/images/fondo_dia.jpg");
    this.load.image("ground", "./assets/images/pasto.png");
    this.load.image("ground2", "./assets/images/tierra.png");
    this.load.image("ninja", "./assets/images/ninja.png");
    this.load.image(ORANGE, "./assets/images/naranja.png");
    this.load.image(APPLE, "./assets/images/manzana.png");
    this.load.image(PINE, "./assets/images/anana.png");
    this.load.image(STRAW, "./assets/images/sandia.png");
    this.load.image("game-over", "./assets/images/game-over.png");
    this.load.image("congrats", "./assets/images/congrats.png");
    this.load.image("start", "./assets/images/start.png");

    this.load.audio("collectBad", "./assets/audio/bad.mp3");
    this.load.audio("sound", "./assets/audio/goats.mp3");
    this.load.audio("collectGood", "./assets/audio/good.wav");
    this.load.audio("jump", "./assets/audio/salto.wav");
    this.load.audio("win", "./assets/audio/wonderful.mp3");
  }

  create() {
    this.scene.start("Menu");
  }
}
