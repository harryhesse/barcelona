import { pepsiAPI } from "../../config/axios.js";
import { schedRepository } from "./schedRepository.js";

// Helper to format today as YYYY-MM-DD
const getTodayDate = () => {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
};

export const schedService = {
  fetchAndSaveSched: async () => {
    const today = getTodayDate();

    // Fetch today's upcoming fixtures for team 49
    const res = await pepsiAPI.get(
      `/fixtures?startDate=${today}&statuses=U&sort=desc&teams=49&pageSize=100`,
    );

    const fixtures = res.data.content;

    // Save or overwrite single schedule document
    const saved = await schedRepository.save({ date: today, fixtures });

    return saved;
  },

  getSched: () => schedRepository.getAll(), // returns the schedule(s)
};
