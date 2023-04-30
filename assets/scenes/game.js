export default class Game extends Phaser.Scene {
  //export default para poder importar desde otra clase
  constructor() {
    super("game");
  }
  init() {}
  preload() {
    this.load.image("sky", "../assets/images/sky.png");
    this.load.image("ground", "../assets/images/platform.png");
    this.load.image("ninja", "../assets/images/ninja.png");
    this.load.image("keyR", "../assets/images/keyR.png");
    this.load.image("square", "../assets/images/square.png");
    this.load.image("triangle", "../assets/images/triangle.png");
    this.load.image("diamond", "../assets/images/diamond.png");
    this.load.image("win", "../assets/images/win.png");
    this.load.image("bgMenu", "../assets/images/bgMenu.jpg");
  }
  create() {
    //add background
    this.add.image(400, 300, "sky").setScale(0.555);
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
      delay: 1500,
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
      this.player.setVelocityY(-300);
    }
  }
  addShape() {
    //get random shape
    const randomShape = Phaser.Math.RND.pick(["triangle", "diamond", "square"]); //selecciona aleatoriamente una forma

    //get random position x
    const randomX = Phaser.Math.RND.between(0, 800);

    // add shape to screen
    this.shapesGroup.create(randomX, 0, randomShape);

    console.log("shape is added", randomX, randomShape);
  }
}
