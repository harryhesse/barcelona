import { pepsiAPI } from "../../config/axios.js";
import { compRepository } from "./compsRepository.js";

export const compsService = {
  fetchAndSaveComps: async () => {
    const res = await pepsiAPI.get("/competitions?teams=49&detail=2");
    const comps = res.data.content;

    comps.forEach((comp) => {
      compRepository.save(comp);
    });

    return comps; // ✅ return the array
  },
  getAllComps: () => compRepository.getAll(),
  getCompById: () => compRepository.getById(),
};
