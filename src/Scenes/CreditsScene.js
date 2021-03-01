import Phaser from 'phaser';

export default class CreditsScene extends Phaser.Scene {
  constructor() {
    super('Credits');
  }

  create() {
    this.creditsText = this.add.text(300, 100, 'Credits', { fontSize: '32px', fill: '#fff' });
    this.credit1Text = this.add.text(180, 160, 'Thanks Code4cause for assets', { fontSize: '25px', fill: '#fff' });
    this.credit2Text = this.add.text(125, 200, 'Thanks Zenva for providing template', { fontSize: '25px', fill: '#fff' });
    this.madeByText = this.add.text(150, 300, 'Created By: Muhammad Talha Waqar', { fontSize: '26px', fill: '#fff' });
  }
}