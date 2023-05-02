import { FRUIT } from '../../utils/utils.js';
const { PINE, ORANGE, APPLE, STRAW } = FRUIT;

export default class Game extends Phaser.Scene {
  //export default para poder importar desde otra clase
  score;
  constructor() {
    super("game");
  }

  init() {
    this.fruitRecolected = {
      [ORANGE]: { count: 0, score: 5 },
      [APPLE]: { count: 0, score: 10 },
      [PINE]: { count: 0, score: 15 },
      [STRAW]: { count: 0, score: 20 }
    };
    console.log(this.fruitRecolected);
  }

  preload() {
    // this.load.image("sky", "../assets/images/sky.png");
    this.load.image("fondo", "../assets/images/fondo-3.jpg");
    this.load.image("ground", "../assets/images/piso-1.png");
    // this.load.image("ground", "../assets/images/platform.png");
    this.load.image("ninja", "../assets/images/ninja.png");
    
    // this.load.image(SQUARE, "../assets/images/square.png");
    // this.load.image(TRIANGLE, "../assets/images/triangle.png");
    // this.load.image(DIAMOND, "../assets/images/diamond.png");
    this.load.image(ORANGE, "../assets/images/orange-1.png");
    this.load.image(APPLE, "../assets/images/apple-1.png");
    this.load.image(PINE, "../assets/images/pine-1.png");
    this.load.image(STRAW, "../assets/images/strawberry-1.png");

    this.load.image("win", "../assets/images/win.png");
    this.load.image("bgMenu", "./assets/images/bgMenu.jpg");
  }

  create() {
    //add background
    this.add.image(400, 300, "fondo").setScale(0.555);

    //add static platforms group
    let platforms = this.physics.add.staticGroup();
    platforms.create(400, 568, "ground").setScale(2).refreshBody();

    //add sprites player
    this.player = this.physics.add.sprite(100, 450, "ninja");
    this.player.setCollideWorldBounds(true);

    //add shapes group
    this.shapesGroup = this.physics.add.group();
    /*this.shapesGroup.create(100, 0, 'diamond');
    this.shapesGroup.create(200, 0, 'triangle');
    this.shapesGroup.create(300, 0, 'square');*/
    //this.addShape();

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
    this.physics.add.collider(this.player, platforms); //Agregar colisones a la escena.Colision entre dos objetos.
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
      fill: "#FFF"
    });

    var timeLeft = 40;

    var timeText = this.add.text(10, 10, 'Tiempo restante: ' + timeLeft, { fontSize: '32px', fill: '#fff', fontStyle: 'bold' });

    this.time.addEvent({
      delay: 1000,
      callback: function () {
        timeLeft--;
        timeText.setText('Tiempo restante: ' + timeLeft);
        if (timeLeft <= 0) {
          this.gameOver();
        }
        if (this.score >= 100) {
          this.congratulations();
        }
      },
      callbackScope: this,
      loop: true
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

    console.log("shape is added", randomX, randomShape);
  }

  collectShape(player, shape) {
    //remove shape from screen
    shape.disableBody(true, true);
    const shapeName = shape.texture.key;
    this.fruitRecolected[shapeName].count++;

    this.score += this.fruitRecolected[shapeName].score;
    console.log(this.fruitRecolected[shapeName].score);
    this.scoreText.setText(`Score: ${this.score.toString()}`);//convierte la variable a un string

    console.log(this.shapeRecolected);
  }

  gameOver() {
    // timeText.setText('Fin del juego');
    this.gameOverText = this.add.text(280, 280, "Fin del juego", {
      fontSize: "35px",
      fontStyle: "bold",
      fill: "#FFF"
    });
    this.gameOverText.setText("Fin del juego")
    this.scene.pause();
    // reiniciar el juego después de un retraso de 3 segundos
    // this.time.addEvent({
    //   delay: 3000,
    //   callback: function () {
    //     this.scene.restart(); // reinicia la escena actual
    //   },
    //   callbackScope: this,
    //   loop: false
    // });
  }

  congratulations() {
    this.congratsText = this.add.text(280, 280, "Congratulations", {
      fontSize: "35px",
      fontStyle: "bold",
      fill: "#FFF"
    });
    this.congratsText.setText("Congratulations")
    this.scene.pause();
  }
}
