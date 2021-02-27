import 'phaser';
import Button from '../Objects/Button';
import LeaderboardName from '../Objects/LeaderboardName';
import LeaderboardApi from '../Api/LeaderboardApi';


export default class LeaderboardScene extends Phaser.Scene {
  constructor () {
    super('Leaderboard');
    this.leaderboard = new LeaderboardApi();
  }

  create(){
    this.add.image(400, 100, 'leaderboard-img');
    this.displayLeaderboard();
    this.TitleButton = new Button(this, 400, 545, 'blueButton1', 'blueButton2', 'Menu', 'Title');
  }

  async displayLeaderboard() {
    let data = await this.leaderboard.getScores();
    data = data.result;
    data = data.sort((a, b) => b.score - a.score);
    let context = this;
    let y = 200;
    for (let i = 0; i< 8; i++){
      new LeaderboardName(context ,400, y, `${i+1}  ${data[i]['user']}   ${data[i]['score']}`);
      y = y+40;
    }
  }
}
