import Phaser from 'phaser';

export default class PreloaderScene extends Phaser.Scene {
  constructor() {
    super('Preloader');
  }

  init() {
    this.readyCount = 0;
  }

  preload() {
    // add logo image
    this.add.image(400, 200, 'logo');

    // display progress bar
    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(240, 270, 320, 50);

    const { width } = this.cameras.main;
    const { height } = this.cameras.main;
    const loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: 'Loading...',
      style: {
        font: '20px monospace',
        fill: '#ffffff',
      },
    });
    loadingText.setOrigin(0.5, 0.5);

    const percentText = this.make.text({
      x: width / 2,
      y: height / 2 - 5,
      text: '0%',
      style: {
        font: '18px monospace',
        fill: '#ffffff',
      },
    });
    percentText.setOrigin(0.5, 0.5);

    const assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 50,
      text: '',
      style: {
        font: '18px monospace',
        fill: '#ffffff',
      },
    });
    assetText.setOrigin(0.5, 0.5);

    // update progress bar
    this.load.on('progress', (value) => {
      percentText.setText(`${parseInt(value * 100, 10)}%`);
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(250, 280, 300 * value, 30);
    });

    // update file progress text
    this.load.on('fileprogress', (file) => {
      assetText.setText(`Loading asset: ${file.key}`);
    });

    // remove progress bar when complete
    this.load.on('complete', () => {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
      assetText.destroy();
      this.ready();
    });

    this.timedEvent = this.time.delayedCall(3000, this.ready, [], this);

    // load assets needed in our game
    this.load.image('blueButton1', '../../assets/ui/blue_button02.png');
    this.load.image('blueButton2', '../../assets/ui/blue_button03.png');
    this.load.image('white-bg', '../../assets/ui/white-bg.png');
    this.load.image('box', '../../assets/ui/grey_box.png');
    this.load.image('end-game', '../../assets/images/game-end.jpeg');
    this.load.image('checkedBox', '../../assets/ui/blue_boxCheckmark.png');
    this.load.audio('bgMusic', ['../../assets/audio/TownTheme.mp3']);
    this.load.image('sky', '../../assets/images/sky.png');
    this.load.image('jet', '../../assets/images/jet.png');
    this.load.image('leaderboard-img', '../../assets/images/leaderboard.png');
    this.load.image('bomb', '../../assets/images/bomb.png');
    this.load.image('ammo', '../../assets/images/ammo.png');
    this.load.image('coin', '../../assets/images/coin.png');
    this.load.spritesheet('explosion', '../../assets/spritesheets/explosion.png', {
      frameWidth: 16,
      frameHeight: 16,
    });
    this.load.audio('gunshot', '../../assets/audio/gunshot.mp3');
    this.load.audio('coinhit', '../../assets/audio/coinhit.mp3');
    this.load.audio('endSound', '../../assets/audio/end.mp3');
  }

  ready() {
    this.scene.start('PlayerInfo');
    this.readyCount += 1;
    if (this.readyCount === 2) {
      this.scene.start('PlayerInfo');
    }
  }
}
