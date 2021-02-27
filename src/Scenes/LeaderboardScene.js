import 'phaser';
import Button from '../Objects/Button';

export default class LeaderboardScene extends Phaser.Scene {
  constructor () {
    super('Leaderboard');
  }


  create(){
    this.add.image(400, 100, 'leaderboard-img');
    this.TitleButton = new Button(this, 400, 510, 'blueButton1', 'blueButton2', 'Menu', 'Title');
  }
}
