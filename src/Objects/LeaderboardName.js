import Phaser from 'phaser';

export default class LeaderboardName extends Phaser.GameObjects.Container {
  constructor(scene, x, y, text) {
    super(scene);
    this.scene = scene;
    this.x = x;
    this.y = y;

    this.textArea = this.scene.add.sprite(0, 0, 'white-bg');
    this.text = this.scene.add.text(0, 0, text, { fontSize: '22px', fill: '#0f0' });
    Phaser.Display.Align.In.Center(this.text, this.textArea);

    this.add(this.textArea);
    this.add(this.text);

    this.scene.add.existing(this);
  }
}