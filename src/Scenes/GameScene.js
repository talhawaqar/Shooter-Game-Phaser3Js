/* eslint-disable class-methods-use-this */
import Phaser from 'phaser';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
    this.gameOver = false;
    this.score = 0;
  }

  init() {
    this.gameOver = false;
  }

  create() {
    this.model = this.sys.game.globals.model;

    // create background
    this.sky = this.add.tileSprite(400, 300, 800, 600, 'sky');
    // add jet
    this.jet = this.physics.add.image(400, 500, 'jet').setScale(0.12);
    this.jet.setCollideWorldBounds(true);

    // set cursors to control jet
    this.cursors = this.input.keyboard.createCursorKeys();

    // add bombs group
    this.bombs = this.physics.add.group({
      key: 'bomb',
      repeat: 3,
      setXY: {
        x: 20,
        y: 50,
        stepX: Phaser.Math.Between(10, 400 - 15),
        stepY: Phaser.Math.Between(15, 100),
      },
    });

    // add coins
    this.coins = this.physics.add.group();

    for (let i = 0; i < 10; i += 1) {
      const x = Phaser.Math.Between(0, 800 - 15);
      const y = Phaser.Math.Between(0, 300);
      this.coins.create(x, y, 'coin');
    }

    // set velocity for coins
    this.setObjectsVelocity(this.coins);

    // check collision with jet and bomb
    this.physics.add.collider(this.jet, this.bombs, this.endGame, null, this);

    // set the random velocity of each bomb object
    this.setObjectsVelocity(this.bombs);

    // shoot when click
    this.input.on('pointerdown', this.shoot, this);

    // animation plays when bomb blasts
    this.anims.create({
      key: 'explode',
      frames: this.anims.generateFrameNumbers('explosion'),
      frameRate: 20,
      hideOnComplete: true,
    });

    // add gunshot sound
    this.gunshot = this.sound.add('gunshot');

    // add coinhit sound
    this.coinHit = this.sound.add('coinhit');

    // Add end game sound
    this.endSound = this.sound.add('endSound');

    // set the score text
    this.scoreText = this.add.text(15, 15, 'Score : 0', { fontSize: 32, fill: '#ff0000' });

    this.physics.add.collider(this.jet, this.coins, this.collectCoins, null, this);
  }

  update() {
    if (this.gameOver) {
      this.scene.start('End', { totalScore: this.score });
    }

    // move background
    this.sky.tilePositionY -= 0.8;

    // check cursor keys and move jet accordingly
    if (this.cursors.left.isDown) {
      this.jet.setVelocityX(-150);
    } else if (this.cursors.right.isDown) {
      this.jet.setVelocityX(150);
    } else if (this.cursors.up.isDown) {
      this.jet.setVelocityY(-150);
    } else if (this.cursors.down.isDown) {
      this.jet.setVelocityY(150);
    } else {
      this.jet.setVelocity(0);
    }

    this.checkRepositionForObjects(this.bombs);
    this.checkRepositionForObjects(this.coins);
  }

  // collect coins
  collectCoins(jet, coin) {
    if (this.model.soundOn) {
      this.coinHit.play();
    }
    this.score += 5;
    this.scoreText.setText(`Score : ${this.score}`);
    coin.disableBody(true, true);
    const x = Phaser.Math.Between(15, 800 - 15);
    const y = Phaser.Math.Between(0, 300);
    coin.enableBody(true, x, y, true, true);
    this.setObjectVelocity(coin);
  }

  // fire the ammo
  shoot() {
    this.ammo = this.physics.add.image(this.jet.x, this.jet.y, 'ammo').setScale(0.2).setOrigin(0, 0.5);
    this.ammo.setRotation(-Phaser.Math.PI2 / 4);
    this.ammo.setVelocityY(-300);
    this.physics.add.collider(this.ammo, this.bombs, this.destroyBomb, null, this);
  }

  // destroy bomb when ammo hits the bomb
  destroyBomb(ammo, bomb) {
    this.score += 10;
    this.scoreText.setText(`Score : ${this.score}`);
    if (this.model.soundOn) {
      this.gunshot.play();
    }
    bomb.disableBody(true, true);
    ammo.disableBody(true, true);
    this.explosion = this.add.sprite(bomb.x, bomb.y, 'explosion').setScale(4);
    this.explosion.play('explode');
    const x = Phaser.Math.Between(15, 800 - 15);
    const y = Phaser.Math.Between(0, 150);
    bomb.enableBody(true, x, y, true, true);
    this.setObjectVelocity(bomb);
  }

  // give random velocity to the group object
  setObjectsVelocity(objects) {
    const game = this;
    objects.children.iterate((objcet) => {
      game.setObjectVelocity(objcet);
    });
  }

  // give random velocity to singal object
  setObjectVelocity(object) {
    const xVel = Phaser.Math.Between(-100, 100);
    const yVel = Phaser.Math.Between(150, 200);
    object.setVelocity(xVel, yVel);
  }

  // fuunction to end the game
  endGame(jet, bomb) {
    if (this.model.soundOn) {
      this.endSound.play();
    }
    this.physics.pause();
    jet.setTint(0XFF000);
    bomb.setTint(0XFF000);
    this.gameOver = true;
  }

  // check if the objects in a groub object requre
  checkRepositionForObjects(objects) {
    const game = this;
    objects.children.iterate((object) => {
      if (object.y > 600) {
        game.resetPos(object);
      }
    });
  }

  // reset position of the object
  resetPos(object) {
    object.y = 0;
    object.x = Phaser.Math.Between(15, 800 - 15);
  }
}
/* eslint-enable class-methods-use-this */
