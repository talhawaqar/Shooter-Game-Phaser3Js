import 'phaser';
import Button from '../Objects/Button';

export default class EndScene extends Phaser.Scene {
  constructor () {
    super('End');
  }

  init(data) {
    this.score = data.totalScore;
  }

  create(){
    this.model = this.sys.game.globals.model;
    console.log(this.model.userName);
    this.bgImage = this.add.image(400, 300, 'end-game');
    this.add.text(180, 50, 'Your Score : ' + this.score, { fontSize: 48 });
    this.TitleButton = new Button(this, 250, 510, 'blueButton1', 'blueButton2', 'Menu', 'Title');
    this.LeaderBoardButton = new Button(this, 550, 510, 'blueButton1', 'blueButton2', 'High Score', 'Leaderboard');
  }
}
