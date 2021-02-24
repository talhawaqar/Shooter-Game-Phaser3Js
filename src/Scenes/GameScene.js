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
};
