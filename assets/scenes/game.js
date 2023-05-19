import { FRUIT } from "../../utils/utils.js";
const { PINE, ORANGE, APPLE, STRAW } = FRUIT;

export default class Game extends Phaser.Scene {
  score;
  timeLeft = 40;
  constructor() {
    super("game");
  }

  init() {
    this.fruitRecolected = {
      [ORANGE]: { count: 0, score: 5 },
      [APPLE]: { count: 0, score: 10 },
      [PINE]: { count: 0, score: 15 },
      [STRAW]: { count: 0, score: 20 },
    };
  }
  
  create() {
    //add background
    this.add.image(400, 300, "fondoDia").setScale(0.555);

    //add static platforms group
    let platforms = this.physics.add.staticGroup();
    platforms.create(400, 580, "ground").setScale(2).refreshBody();

    //add sprites player
    this.player = this.physics.add.sprite(100, 450, "pinguino");
    this.player.setCollideWorldBounds(true);

    //add shapes group
    this.shapesGroup = this.physics.add.group();

    //create events to add shapes
    this.time.addEvent({
      delay: 1000,
      callback: this.addShape, //cada vez que pase el tiempo se ejecuta esta funcion
      callbackScope: this, //callBackScope hace que el this haga referencia a la escena
      loop: true,
    });

    //create cursors
    this.cursors = this.input.keyboard.createCursorKeys();

    //add collider between player and platforms
    //Agregar colisones a la escena.Colision entre dos objetos.
    this.physics.add.collider(this.player, platforms);
    this.physics.add.collider(this.player, this.shapesGroup);
    this.physics.add.collider(platforms, this.shapesGroup);

    //add overlap between player and shapes
    this.physics.add.overlap(
      this.player,
      this.shapesGroup,
      this.collectShape,
      null,
      this
    );

    //add socre on scene
    this.score = 0;
    this.scoreText = this.add.text(10, 45, "Score:" + this.score, {
      fontSize: "32px",
      fontStyle: "bold",
      fill: "#FFF",
    });

    this.timeText = this.add.text(10, 10, "Tiempo restante: " + this.timeLeft, {
      fontSize: "32px",
      fill: "#fff",
      fontStyle: "bold",
    });

    this.time.addEvent({
      delay: 1000,
      callback: this.timer,
      callbackScope: this,
      loop: true,
    });
  }

  update() {
    //update player movement
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-250);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(250);
    } else {
      this.player.setVelocityX(0);
    }
    //update player jump
    if (this.cursors.up.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-180);
    }
  }

  addShape() {
    //get random shape
    const randomShape = Phaser.Math.RND.pick([STRAW, ORANGE, APPLE, PINE]); //selecciona aleatoriamente una forma

    //get random position x
    const randomX = Phaser.Math.RND.between(0, 800);

    // add shape to screen
    this.shapesGroup.create(randomX, 0, randomShape);
  }

  collectShape(player, shape) {
    //remove shape from screen
    shape.disableBody(true, true);
    const shapeName = shape.texture.key;
    this.fruitRecolected[shapeName].count++;

    this.score += this.fruitRecolected[shapeName].score;
    this.scoreText.setText(`Score: ${this.score.toString()}`);
  }

  timer() {
    this.timeLeft--;
    this.timeText.setText("Tiempo restante: " + this.timeLeft);
    if (this.timeLeft <= 0) {
      this.gameOver();
    }
    if (this.score >= 100) {
      this.congratulations();
    }
  }

  gameOver() {
    this.gameOverText = this.add.text(280, 280, "Fin del juego", {
      fontSize: "35px",
      fontStyle: "bold",
      fill: "#FFF",
    });
    this.gameOverText.setText("Fin del juego");
    this.scene.pause();
  }

  congratulations() {
    this.congratsText = this.add.text(280, 280, "Congratulations", {
      fontSize: "35px",
      fontStyle: "bold",
      fill: "#FFF",
    });
    this.congratsText.setText("Congratulations");
    this.scene.pause();
  }
}