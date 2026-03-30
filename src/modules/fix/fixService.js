import { pepsiAPI } from "../../config/axios.js";
import { fixRepository } from "./fixRepository.js";
import { compsService } from "../comps/compsService.js";

const getTodayDate = () => new Date().toISOString().split("T")[0];

export const fixService = {
  fetchAndSaveFix: async () => {
    const today = getTodayDate();

    // ✅ get comps from DB
    const comps = await compsService.getAllComps();

    if (!comps.length) {
      throw new Error("No comps found in DB");
    }

    // ✅ extract + deduplicate compSeason IDs
    const compSeasonIds = [
      ...new Set(comps.map((c) => c.compSeasons?.[0]?.id).filter(Boolean)),
    ].join(",");

    if (!compSeasonIds) {
      throw new Error("No valid compSeason IDs found");
    }

    // ✅ single API call
    const res = await pepsiAPI.get(
      `/fixtures?endDate=${today}&statuses=C&sort=desc&teams=49&pageSize=100&compSeasons=${compSeasonIds}`,
    );

    const fixtures = res.data?.content || [];

    const saved = await fixRepository.save({
      date: today,
      fixtures,
    });

    return saved;
  },

  getFix: () => fixRepository.getAll(),
};
