export default class Model {
  constructor() {
    this.username = 'Guest';
    this.soundon = true;
    this.musicon = true;
    this.bgMusicplaying = false;
  }

  set musicOn(value) {
    this.musicon = value;
  }

  get musicOn() {
    return this.musicon;
  }

  set soundOn(value) {
    this.soundon = value;
  }

  get soundOn() {
    return this.soundon;
  }

  set bgMusicPlaying(value) {
    this.bgMusicplaying = value;
  }

  get bgMusicPlaying() {
    return this.bgMusicplaying;
  }

  set userName(value) {
    if (value !== '') {
      this.username = value;
    }
  }

  get userName() {
    return this.username;
  }
}
