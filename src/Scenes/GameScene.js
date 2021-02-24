import 'phaser';

export default class GameScene extends Phaser.Scene {
  constructor () {
    super('Game');
    this.score = 0;
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

    //set the random velocity of each bomb object
    this.setObjectsVelocity(this.bombs);

    // shoot when click
    this.input.on('pointerdown', this.shoot, this);

    // animation plays when bomb blasts
    this.anims.create({
      key: 'explode',
      frames: this.anims.generateFrameNumbers('explosion'),
      frameRate: 20,
      hideOnComplete: true
    });

    // add gunshot sound
    this.gunshot = this.sound.add('gunshot');

    // set the score text
    this.scoreText = this.add.text(15,15, 'Score : 0', {fontSize:32, fill: '#ff0000'});

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

    this.checkRepositionForObjects(this.bombs);
  }

  // fire the ammo
  shoot(){
    this.ammo = this.physics.add.image(this.jet.x, this.jet.y, 'ammo').setScale(0.2).setOrigin(0, 0.5);
    this.ammo.setRotation(-Phaser.Math.PI2/4);
    this.ammo.setVelocityY(-300);
    this.physics.add.collider(this.ammo,this.bombs, this.destroyBomb, null, this);
  }

  // destroy bomb when ammo hits the bomb
  destroyBomb(ammo, bomb) {
    this.score = this.score+10;
    this.scoreText.setText('Score : ' + this.score);
    this.gunshot.play();
    bomb.disableBody(true, true);
    ammo.disableBody(true, true);
    this.explosion = this.add.sprite(bomb.x, bomb.y, 'explosion').setScale(4);
    this.explosion.play('explode');
    let x = Phaser.Math.Between(15, 800-15);
    let y = Phaser.Math.Between(0, 150);
    bomb.enableBody(true, x, y, true, true);
    this.setObjectVelocity(bomb);
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

  // check if the objects in a groub object requre
  checkRepositionForObjects(objects){
    let game = this;
    objects.children.iterate(function(object){
      if (object.y > 600) {
        game.resetPos(object);
      }
    });
  }

  // reset position of the object
  resetPos(object) {
    object.y = 0;
    object.x = Phaser.Math.Between(15, 800-15);
  }
};
