import { footballDataAPI } from "../../config/axios.js";
import { fixturesRepository } from "./fixturesRepository.js";

const TEAM_ID = 81; // Barcelona
const SEASON = 2025; // Hardcoded season

export const fixturesService = {
  fetchAndSaveSeason: async () => {
    // Fetch from API
    const res = await footballDataAPI.get(
      `/teams/${TEAM_ID}/matches?season=${SEASON}`,
    );
    return fixturesRepository.save(res.data);
  },
  getAllFixtures: () => fixturesRepository.getAll(),
};
