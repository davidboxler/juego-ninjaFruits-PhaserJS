import {
  FRUIT,
  POINTS_PERCENTAGE,
  POINTS_PERCENTAGE_VALUE_START,
} from "../../utils/utils.js";
const { PINE, ORANGE, APPLE, STRAW } = FRUIT;

export default class Game extends Phaser.Scene {
  score;
  timeLeft = 40;
  gameOver;
  constructor() {
    super("game");
  }

  init() {
    this.gameOver = false;
    this.fruitRecolected = {
      [ORANGE]: { count: 0, score: 5 },
      [APPLE]: { count: 0, score: 15 },
      [PINE]: { count: 0, score: 25 },
      [STRAW]: { count: 0, score: -10 },
    };
  }

  create() {
    //add background
    this.add.image(400, 300, "fondoDia").setScale(0.555);

    //add static platforms group
    let platforms = this.physics.add.staticGroup();
    platforms.create(400, 580, "ground").setScale(2).refreshBody();

    let platforms1 = this.physics.add.staticGroup();
    platforms.create(350, 350, "ground2").setScale(.55).refreshBody();

    let platforms2 = this.physics.add.staticGroup();
    platforms.create(200, 200, "ground2").setScale(.55).refreshBody();

    //add fruits group
    this.fruitsGroup = this.physics.add.group();

    //create events to add fruits
    this.time.addEvent({
      delay: 1000,
      callback: this.addFruit, //cada vez que pase el tiempo se ejecuta esta funcion
      callbackScope: this, //callBackScope hace que el this haga referencia a la escena
      loop: true,
    });

    //add sprites player
    this.player = this.physics.add.sprite(100, 450, "ninja");
    this.player.setCollideWorldBounds(true);

    //create cursors
    this.cursors = this.input.keyboard.createCursorKeys();

    //add collider between player and platforms
    //Agregar colisones a la escena.Colision entre dos objetos.
    this.physics.add.collider(this.player, platforms);
    this.physics.add.collider(this.player, platforms1);
    this.physics.add.collider(this.player, platforms2);
    this.physics.add.collider(this.player, this.fruitsGroup);
    this.physics.add.collider(platforms, this.fruitsGroup);
    this.physics.add.collider(platforms1, this.fruitsGroup);
    this.physics.add.collider(platforms2, this.fruitsGroup);

    //add overlap between player and fruits
    this.physics.add.overlap(
      this.player,
      this.fruitsGroup,
      this.collectFruit,
      null,
      this
    );

    this.physics.add.overlap(
      this.fruitsGroup,
      platforms,
      this.reduce,
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
    if (this.score > 100) {
      this.scene.start("Congrats");
    }

    if (this.gameOver) {
      this.scene.start("GameOver");
    }

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
      this.player.setVelocityY(-150);
    }
  }

  addFruit() {
    //get random fruit
    //selecciona aleatoriamente una forma
    const randomFruit = Phaser.Math.RND.pick([STRAW, ORANGE, APPLE, PINE]);

    //get random position x
    const randomX = Phaser.Math.RND.between(0, 800);

    // add fruit to screen
    this.fruitsGroup
      .create(randomX, 0, randomFruit)
      .setCircle(32, 0, 0)
      .setBounce(0.8)
      .setData(POINTS_PERCENTAGE, POINTS_PERCENTAGE_VALUE_START);

    console.log("fruit is added", randomX, randomFruit);
  }

  collectFruit(player, fruit) {
    //remove fruit from screen
    fruit.disableBody(true, true);
    const fruitName = fruit.texture.key;
    const percentage = fruit.getData(POINTS_PERCENTAGE);
    const scoreNow = this.fruitRecolected[fruitName].score * percentage;
    this.score += scoreNow;
    this.scoreText.setText(`Score: ${this.score.toString()}`);
    this.fruitRecolected[fruitName].count++;
  }

  timer() {
    this.timeLeft--;
    this.timeText.setText("Tiempo restante: " + this.timeLeft);
    if (this.timeLeft <= 0) {
      this.gameOver = true;
    }
  }

  reduce(fruit, platform){
    const newPercentage = fruit.getData(POINTS_PERCENTAGE) - 0.25;
    console.log(fruit.texture.key, newPercentage);
    fruit.setData(POINTS_PERCENTAGE, newPercentage);
    if (newPercentage <= 0) {
      fruit.disableBody(true, true);
      return;
    }
    // show text
    const text = this.add.text(fruit.body.position.x+10, fruit.body.position.y, "- 25%", {
      fontSize: "22px",
      fontStyle: "bold",
      fill: "red",
    });
    setTimeout(() => {
      text.destroy();
    }, 200);
  }
}
