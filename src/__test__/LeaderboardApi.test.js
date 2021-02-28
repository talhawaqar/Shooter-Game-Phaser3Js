import 'regenerator-runtime/runtime';
import LeaderboardApi from '../Api/LeaderboardApi';

test('submit score and username', async () => {
  const leaderboard = new LeaderboardApi();
  const response = await leaderboard.submitScore('talha', 100);
  expect(response.result).toEqual("Leaderboard score created correctly.");
});

test('get leaderboard scores', async() => {
  const leaderboard = new LeaderboardApi();
  const response = await leaderboard.getScores();
  expect(typeof response).toBe("object");
});

