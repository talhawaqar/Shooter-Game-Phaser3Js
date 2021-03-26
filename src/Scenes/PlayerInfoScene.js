import Phaser from 'phaser';

export default class PlayerInfoScene extends Phaser.Scene {
  constructor() {
    super('PlayerInfo');
  }

  create() {
    this.userNameField = document.getElementById('txtName');
    this.userNameField.style.display = 'block';
    this.add.image(400, 200, 'logo');
    this.goBtn = this.add.image(400, 400, 'blueButton1');
    this.add.text(370, 377, 'Go', { fontSize: 48 });
    this.goBtn.setInteractive();
    this.goBtn.on('pointerdown', this.startGame, this);
  }

  startGame() {
    this.sys.game.globals.model.userName = this.userNameField.value;
    this.scene.start('Title');
  }
}