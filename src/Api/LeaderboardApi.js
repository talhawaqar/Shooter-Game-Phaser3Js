import 'regenerator-runtime/runtime';
const fetch = require("node-fetch");

export default class LeaderboardApi {
  constructor(){
    this.URL = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/x0F54MZKHqJe2ginwdHQ/scores/';  
  }

  async submitScore(username, score) {
    const response = await fetch(this.URL,
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
      }
    );
    const result = response.json();
    return result;
  }

  async getScores(){
    try {
      const response = await fetch(this.URL, { mode: 'cors' });
      const result = response.json();
      return result;
    } catch (err) {
      return err;
    }
  }
}
