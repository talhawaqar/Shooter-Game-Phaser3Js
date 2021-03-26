import Model from '../Model';

test('set and get username', () => {
  const model = new Model();
  model.userName = 'Jest';
  expect(model.userName).toEqual('Jest');
});

test('set and get Music on flag', () => {
  const model = new Model();
  model.musicOn = true;
  expect(model.musicOn).toEqual(true);
});

test('set and get Sound on flag', () => {
  const model = new Model();
  model.soundOn = true;
  expect(model.soundOn).toEqual(true);
});

test('set and get bgMusicplaying flag', () => {
  const model = new Model();
  model.bgMusicPlaying = true;
  expect(model.bgMusicPlaying).toEqual(true);
});
