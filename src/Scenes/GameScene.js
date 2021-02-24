import 'phaser';

export default class GameScene extends Phaser.Scene {
  constructor () {
    super('Game');
  }

  create () {
    // create background
    this.sky = this.add.tileSprite(400, 300, 800, 600, 'sky');
    // add jet
    this.jet = this.physics.add.image(400, 500, 'jet').setScale(0.12);
    this.jet.setCollideWorldBounds(true);

    // set cursors to control jet
    this.cursors = this.input.keyboard.createCursorKeys();

    //add bombs group
    this.bombs = this.physics.add.group({
      key: 'bomb',
      repeat: 3,
      setXY: {
        x: 20,
        y: 50,
        stepX: Phaser.Math.Between(10, 400-15),
        stepY: Phaser.Math.Between(15, 100)
      }
    });

    this.setObjectsVelocity(this.bombs);

  }

  update() {
    // move background
    this.sky.tilePositionY -= 0.8;

    // check cursor keys and move jet accordingly
    if (this.cursors.left.isDown){
      this.jet.setVelocityX(-150);
    }
    else if (this.cursors.right.isDown){
      this.jet.setVelocityX(150);
    }
    else if (this.cursors.up.isDown) {
      this.jet.setVelocityY(-150);
    }
    else if (this.cursors.down.isDown) {
      this.jet.setVelocityY(150);
    }
    else {
      this.jet.setVelocity(0);
    }
  }
  // give random velocity to the group object 
  setObjectsVelocity(objects){
    let game = this;
    objects.children.iterate(function(objcet){
      game.setObjectVelocity(objcet);
    });
  }

  // give random velocity to singal object
  setObjectVelocity(object) {
    let xVel = Phaser.Math.Between(-100, 100);
    let yVel = Phaser.Math.Between(150, 200);
    object.setVelocity(xVel, yVel);
  }
};
