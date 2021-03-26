import 'regenerator-runtime/runtime';
import { submitScore, getScores } from '../Api/LeaderboardApi';

test('submit score and username', async () => {
  const response = await submitScore('talha', 100);
  expect(response.result).toEqual('Leaderboard score created correctly.');
});

test('get leaderboard scores', async () => {
  const response = await getScores();
  expect(typeof response).toBe('object');
});
