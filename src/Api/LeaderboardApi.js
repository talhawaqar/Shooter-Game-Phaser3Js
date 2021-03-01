import 'regenerator-runtime/runtime';

const fetch = require('node-fetch');

const URL = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/x0F54MZKHqJe2ginwdHQ/scores/';

const submitScore = async (username, score) => {
  const response = await fetch(URL,
    {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: username,
        score: score.toString(),
      }),
    });
  const result = response.json();
  return result;
};

const getScores = async () => {
  try {
    const response = await fetch(URL, { mode: 'cors' });
    const result = response.json();
    return result;
  } catch (err) {
    return err;
  }
};

export {
  submitScore, getScores,
};
