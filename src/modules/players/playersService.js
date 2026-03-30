import { transfermarktAPI } from "../../config/axios.js";
import { playersRepository } from "./playersRepository.js";

const TEAM_ID = 131; // Barcelona
const MAX_CONCURRENT = 3; // free plan limit: 3 requests/sec
const BATCH_DELAY_MS = 1000;

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchPlayerDetails(player) {
  const [profileRes, statsRes] = await Promise.all([
    transfermarktAPI.get(`/players/${player.id}/profile`),
    transfermarktAPI.get(`/players/${player.id}/stats`),
  ]);

  return {
    ...player,
    profile: profileRes.data,
    stats: statsRes.data,
  };
}

export const playersService = {
  fetchAndSaveAll: async () => {
    // Step 1: fetch all players for the team
    const res = await transfermarktAPI.get(`/clubs/${TEAM_ID}/players`);
    const players = res.data.players;

    const results = [];

    // Step 2: process in batches respecting rate limit
    for (let i = 0; i < players.length; i += MAX_CONCURRENT) {
      const batch = players.slice(i, i + MAX_CONCURRENT);

      const detailedBatch = await Promise.all(batch.map(fetchPlayerDetails));
      results.push(...detailedBatch);

      if (i + MAX_CONCURRENT < players.length) {
        await sleep(BATCH_DELAY_MS); // throttle to avoid 429
      }
    }

    // Step 3: save to MongoDB
    return playersRepository.saveMany(results);
  },

  // returns all saved players from DB
  getAll: async () => {
    return playersRepository.getAll();
  },
};
