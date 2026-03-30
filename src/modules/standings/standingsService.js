import { flashcoreAPI } from "../../config/axios.js"; // or flashcore instance if different
import { standingsRepository } from "./standingsRepository.js";

// Constants
const SEASON = "2025-2026";
const LEAGUE_CODE = "QVmLl54o";
const COUNTRY_CODE = "spain:176";

export const standingsService = {
  fetchAndSave: async () => {
    const url = `/football/${COUNTRY_CODE}/laliga:${LEAGUE_CODE}/${SEASON}/standings`;

    const res = await flashcoreAPI.get(url);

    const data = {
      season: SEASON,
      league: "laliga",
      standings: res.data,
    };

    return standingsRepository.save(data);
  },

  getAll: async () => standingsRepository.getAll(),
};
